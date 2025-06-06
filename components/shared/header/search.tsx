import { getAllCategories } from "@/lib/actions/product.actions";
import { Select ,SelectTrigger ,SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const Search = async () => {

  const categories = await getAllCategories()
  

  return ( <form action= "/search" method="GET">
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Select name="category">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder='All'/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={'All'} value={'all'}>
            All
          </SelectItem>
          {categories.map((item) => (
              <SelectItem key={item.category} value={item.category}>
                  {item.category}
              </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input name="query" type="text" placeholder="검색어 입력하셈" className="md:w-[100px] lg:w-[300px]"/>
      <Button>
        <SearchIcon></SearchIcon>
      </Button>
    </div>
  </form> );
}
 
export default Search;