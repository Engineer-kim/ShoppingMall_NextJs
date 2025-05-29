import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";


const Homepage = async () => {
  const latestData = await getLatestProducts();

  //console.log("Sample Data:", sampleData);
  return (
    <>
      <ProductList title='신상품요' data={latestData} limit={4}/>
    </>
  )
}

export default Homepage;