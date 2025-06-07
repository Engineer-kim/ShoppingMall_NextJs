'use server'

import { cookies } from "next/headers"
import { CartItem } from "@/types"
import { convertToPlainObject, formatError, round2 } from "../utils"
import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { cartItemSchema, insertCartSchema } from "../validator"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

// 장바구니에 담긴 상품 값 계산
const calulatePrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((accumulatorVal , item) =>  accumulatorVal  + (Number(item.price) * item.qty) , 0)
  ),

  //밑에 있는 세금이나 배송비는 외국일때 , 한국은 다르게 적용 예정
  //외화 기준 합산금액 100 다 크면 무료 아니면 배송비 100 부과
  shippingPrice = round2(itemsPrice > 100  ? 0 : 10),
  taxPrice  = round2(0.15 * itemsPrice),
  totalPrice = round2(itemsPrice + taxPrice + shippingPrice)
  
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}

export async function addItemToCart(data: CartItem){
  try{
    //쿠키에서 세션카트아이디 값 가져오기
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if(!sessionCartId) throw new Error('Cart SessionId Error')
    
    const session = await auth();
    const userId = session?.user?.id ? ( session.user.id as string ) : undefined

    //카트에 담긴 상품 정보 가져오기
    const cart = await getMyCart()
    

    //카트에 담긴 상품에 대한 Vaildation 체크
    const item  = cartItemSchema.parse(data)

    const product = await prisma.product.findFirst({
      where: { id: item.productId } 
    })

    if(!product) throw new Error("해당 상품에 대한 정보를 찿을수 없습니다")

    if(!cart){
      //카트없으니 생성
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calulatePrice([item])
      })

      //장바구니 테이블에 정보 저장
      await prisma.cart.create({data: newCart})

      //데이터베이스의 변경 사항을 웹 페이지의 캐시에 반영하여 사용자가 항상 최신 정보를 볼 수 있도록
      //==> 제품 수량 증감 표시
      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        message: `${product.name}을(를) 장바구니에 추가했음`
      }
    }else{ //이미 해당상품이 있는 경우 해당 상품 ROW 를 추가하는것이 아닌 수량 증가 시키도록
      const existItem = (cart.items as CartItem[]).find((cartItem)=>(cartItem.productId === item.productId))

      if (existItem) {
        //상품 재고 체크
        if(product.stock < existItem.qty + 1){
          throw new Error('해당 상품의 재고가 부족합니다')
        }
        // 수량 증가
        (cart.items as CartItem[]).find((cartItem)=>(cartItem.productId === item.productId))!.qty = existItem.qty + 1 
      } else {//카트에 해당 상품이 안담겼을때(최초로 해당 상품을 담을때)
        //재고 체크
        if(product.stock < 1) throw new Error('해당 상품의 재고가 부족합니다');
        //상품을 장바구니에 목록에 추가
        cart.items.push(item)
      }
      // 장바구니정보가 있으니 새로운 로우가 아닌 기존 장바구니 물건 목록에 추가(==>물건 목록 업데이트)
      await prisma.cart.update({
        where: {id: cart.id},
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calulatePrice(cart.items as CartItem[])
        }
      })

      revalidatePath(`/product/${product.slug}`)

      return {
        success: true,
        message: `${product.name} ${existItem ? '장바구니 정보 최신화중임,,' : '장바구니에 추가됨'}`
      }
    }
  }catch (error){
    return {
      success: false,
      message: formatError(error)
    }
  }
}


export async function getMyCart() {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if(!sessionCartId) throw new Error('Cart SessionId Error')
    
    const session = await auth();
    const userId = session?.user?.id ? ( session.user.id as string ) : undefined


    //1. 로그인시(유저아이디 존재) 유저아이디로만 장바구니 정보 탐색
    //2. 비로그인시(유저아이디 미존재) 세션카트아이디로만 정보 탐색
    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId}
    })

    if(!cart) return undefined

    return convertToPlainObject({
      ...cart,
      items: cart.items as CartItem[],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
    })

}

//장바구니 상품 목록 제거
export async function removeItemFromCart (productId: string) {
  try {
    //CartSession ID 가져오기
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Session 카트아이디가 없습니다');

    //지우고자하는 상품아이디로 상품 있는지 체크
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error('해당 상품은 존재하지 않습니다');

    //사용자 장바구니 가져오기
    const cart = await getMyCart();
    if (!cart) throw new Error('장바구니 정보가 없습니다');

    //해당 상품이 장바구니 상품목록에 있는지 체크
    const exist = (cart.items as CartItem[]).find((cartItem) => cartItem.productId === productId);
    if (!exist) throw new Error('해당 상품은 장바구니에 없는디요?');


    //장바구니에 담긴 상품 수량이 1일때
    if (exist.qty === 1) {
      //filter 함수는 False면 제거 , True면 남김
      cart.items = (cart.items as CartItem[]).filter((cartItem) => cartItem.productId !== exist.productId);
    } else {//장바구니에 담긴 상품 수량 감소
      (cart.items as CartItem[]).find((cartItem) => cartItem.productId === productId)!.qty = exist.qty - 1;
    }
    //수량 감소 연산 결과 DB 반영
     await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calulatePrice(cart.items as CartItem[]),
      },
    });
    //DB 반영된 결과 화면에 데이터 최신화해서 뿌려주기 위함(캐시 날림)
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name}  ${(cart.items as CartItem[]).find((x) => x.productId === productId) ? '장바구니 목록 업데이트 중' : '장바구니 목록에서 제거 완'}`,
    };
  }catch (error) {
    return { success: false, message: formatError(error) };
  }
};