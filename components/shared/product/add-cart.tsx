'use client'

import { Cart, CartItem } from "@/types"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Plus , Minus } from "lucide-react"
import { addItemToCart , removeItemFromCart } from "@/lib/actions/cart.actions"
import { FormattedErrorResult } from '@/lib/utils'

const AddCart = ({ cart ,item }: { cart?:Cart; item: Omit<CartItem, 'cartId'> }) => {
  const router = useRouter()

  const handleAddToCart = async () => {
  const response = await addItemToCart(item)
 
  // 장바구니 추가 실패 시 toast 띄우기
  if (!response.success) {
    const errorResult  = (await response.message) as FormattedErrorResult;
    toast(
      <div className="bg-red-600 text-white px-4 py-2 rounded">
        {errorResult.errorMessage}
      </div>
    );
    return;
  }


  // 장바구니 추가 성공 시 toast 띄우기
  toast(
      <> {item.name} <br />장바구니 추가됨!</>,
      {
          action: (
            <button className="bg-primary text-white hover:bg-gray-800 px-2 py-1 rounded" onClick={() => router.push('/cart')} aria-label="장바구니로 이동">
              장바구니로 이동
            </button>
          ),
      }
    );
  }

  const handleRemoveFromCart = async () => {
    await removeItemFromCart(item.productId)

    toast(
      <div className="bg-blue-600 text-white px-5 py-3 rounded-full bg-opacity-90">
        {`장바구니에서 ${item.name}을(를) 뺐어요!`}
      </div>
    );
    return;
  }


  //해당 상품이 존재하는지 채크
  const existItem = cart && cart.items.find((cartItem)=>(cartItem.productId === item.productId))

  return existItem 
  ? (
    <div>
      <Button type="button" variant='outline' onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4"/>
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant='outline' onClick={handleAddToCart}>
        <Plus className="h-4 w-4"/>
      </Button>
    </div>
  ) 
  : (
     <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus/>장바구니 추가
    </Button>
  );
}

export default AddCart
