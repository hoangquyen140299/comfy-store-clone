import Filters from "../../components/Filters";
import ProductsContainer from "../../components/ProductsContainer";
import PaginationContainer from "../../components/PaginationContainer";
import { customFetch } from "../../utils";

const url = "/products";

const allProductsQuery = (queryParams) => {
   const { category, company, order, price, search, shipping, page } =
      queryParams;
   return {
      queryKey: [
         "products",
         search ?? "",
         category ?? "all",
         company ?? "all",
         order ?? "a-z",
         price ?? 100000,
         shipping ?? false,
         page ?? 1,
      ],
      queryFn: () => customFetch(url, { params: queryParams }),
   };
};
export const loader =
   (queryClient) =>
   async ({ request }) => {
      const params = Object.fromEntries([
         ...new URL(request.url).searchParams.entries(),
      ]);

      const response = await queryClient.ensureQueryData(
         allProductsQuery(params)
      );

      const products = response.data.data;
      const meta = response.data.meta;
      return { products, meta, params };
   };

function Products() {
   return (
      <section>
         <Filters />
         <ProductsContainer />
         <PaginationContainer />
      </section>
   );
}

export default Products;
