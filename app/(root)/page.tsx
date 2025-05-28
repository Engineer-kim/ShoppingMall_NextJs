import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";


const Homepage = () => {
  //console.log("Sample Data:", sampleData);
  return (
    <>
      <ProductList title='신상품요' data={sampleData.products} limit={4}/>
    </>
  )
}

export default Homepage;