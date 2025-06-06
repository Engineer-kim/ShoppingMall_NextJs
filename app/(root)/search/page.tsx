// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchPage = async ({ searchParams }: { searchParams: any }) => {
  const {
    query = 'all',
    category = 'all',
    rating = 'all',
    price = 'all',
    sort = 'newest',
    page = '1',
  } = await searchParams; 
  console.log("검색어 (query):", query);
  console.log("카테고리 (category):", category);
  console.log("평점 (rating):", rating);
  console.log("가격 (price):", price);
  console.log("정렬 (sort):", sort);
  console.log("페이지 (page):", page);
  return ( <>SearchPage요</> );
}
 
export default SearchPage;