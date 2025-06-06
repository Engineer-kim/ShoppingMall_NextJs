'use client'

import { CartItem } from "@/types"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { addItemToCart } from "@/lib/actions/cart.actions"

const AddCart = ({ item }: { item: Omit<CartItem, 'cartId'> }) => {
  const router = useRouter()

  const handleAddToCart = async () => {
  const response = await addItemToCart(item)


  // 장바구니 추가 실패 시 toast 띄우기
  if (!response.success) {
    toast(
      <div className="bg-red-600 text-white px-4 py-2 rounded">
        {response.message}
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

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      장바구니 추가
    </Button>
  )
}

export default AddCart
