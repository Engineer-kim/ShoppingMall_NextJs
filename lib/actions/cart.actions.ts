'use server'

import { CartItem } from "@/types"

export async function addItemToCart(data: CartItem){
  console.log("addItemToCart 데이터는 :", data)
  return {
    success: false,
    message: "해당 상품을 장바구니 담기 실패"
  }
}