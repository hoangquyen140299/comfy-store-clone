import Hero from "../Hero";

import { customFetch } from "../../utils";
import FeaturedProducts from "../../components/FeaturedProducts";

const url = "/products?featured=true";

const featuredProductsQuery = {
   queryKey: ["featuredProducts"],
   queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
   const response = await queryClient.ensureQueryData(featuredProductsQuery);
   return { products: response.data.data };
};

function Landing() {
   return (
      <>
         <Hero />
         <FeaturedProducts />
      </>
   );
}

export default Landing;
