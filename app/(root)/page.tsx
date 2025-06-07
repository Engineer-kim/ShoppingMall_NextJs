import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts ,getFeaturedProducts } from "@/lib/actions/product.actions";
import ProductBanner from "@/components/shared/product/product-banner";


const Homepage = async () => {
  const latestProductData = await getLatestProducts();
  const bannerProductData = await getFeaturedProducts();
  return (
    <div>
      { bannerProductData.length > 0  && <ProductBanner data={bannerProductData}/>}
      <ProductList title='신상품요' data={latestProductData} limit={4}/>
    </div>
  )
}

export default Homepage;