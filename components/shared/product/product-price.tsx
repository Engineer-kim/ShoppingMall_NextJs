import { cn } from "@/lib/utils";



const ProductPrice = ({value, className} : { value: number; className?: string }) => 
{
  const stringValue = value.toFixed(2);
  stringValue.split('.');
  //우리나라돈이 아닌 외화는 소수점 단위의 돈이 있음 그러기위해 대응됨 ex) 22.32달러
  const [intergerValue, floatValue] = stringValue.split('.');
  return (
     <p className={cn('text-2xl', className)}>
      <span className="text-xs align-super">$</span>
      {intergerValue}
      <span className="text-xs align-super">.{ floatValue }</span>
     </p> 
  );
}
 
export default ProductPrice;