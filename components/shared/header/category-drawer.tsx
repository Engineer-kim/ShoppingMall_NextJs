import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";


const CategoryDrawer = async () => {

  const categories = await getAllCategories()

  return ( 
    <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant='outline'>
            <MenuIcon/>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>카테고리 선택하셈</DrawerTitle>
            <div className="space-y-1 mt-4">
              {categories.map((eachCategory) => 
                (
                  <Button variant='ghost' className="w-full justify-start" key={eachCategory.category} asChild>
                    <DrawerClose asChild>
                      <Link href={`/search?category=${eachCategory.category}`}>
                        {eachCategory.category}  ({eachCategory._count})
                      </Link>
                    </DrawerClose>
                  </Button>
                )
              )
              }
            </div>
          </DrawerHeader>
        </DrawerContent>
    </Drawer>
  );
}
 
export default CategoryDrawer;