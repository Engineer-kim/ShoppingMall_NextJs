/**제품 상세페이지*/
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import  ProductPrice  from "@/components/shared/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProudctImages from "@/components/shared/product/product-images";

const ProductDetailsPage = async (props: {params: Promise<{ slug: string }>; }) => {
  const params = await props.params;
  console.log("params:", params);
  console.log("props:", props);
  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          {/* 이미지 영역 */}
          <div className='col-span-2'><ProudctImages images={product.images}></ProudctImages></div>

          {/* 제품상세 정보 보여주는 영역 */}
         <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-6'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} 제품 리뷰
              </p>

               <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                  <ProductPrice value={Number(product.price)} className='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2'/>
              </div>
            </div>
            <div className='mt-10'>
              <p>제품 상세:</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* 장바구니 버튼 있는 영역 */}
          <div>
            <Card>
              <CardContent className='p-4'>
                <div className='mb-2 flex justify-between'>
                  <div>가격</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className='mb-2 flex justify-between'>
                  <div>제품 재고</div>
                  {product.stock > 0 ? ( <Badge variant='outline'>재고 있음요</Badge>) : ( <Badge variant='destructive'>재고 없음요</Badge>)}
                </div>
                {product.stock > 0 && (
                  <div className=' flex-center'>
                    <Button className='w-full'>장바구니 추가요</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;