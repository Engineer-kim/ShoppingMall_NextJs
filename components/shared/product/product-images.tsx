'use client';
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: {images: string[] }) => {
  console.log("ProductImages images(확인용):", images);
  const [current, setCurrent] = useState(0); //현재 이미지 인덱스 상태
  if (!images || images.length === 0) {
    return <div>표시할 이미지가 없습니다.</div>;
  }

  return  <div className="space-y-4">
      <Image
        src={images[current]}
        alt="상품 이미지입니다"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"/>
        <div className="flex">
          {images.map((image, index) => (
          <div key={image} className={cn('border mr-2 cursor-pointer hover:border-orange-600', current === index && 'border-orange-500')}
            onClick={() => setCurrent(index)}>
            <Image src={image} alt={'image'} width={100} height={100} />
          </div>
          ))}
        </div>
  </div>
}
 
export default ProductImages;