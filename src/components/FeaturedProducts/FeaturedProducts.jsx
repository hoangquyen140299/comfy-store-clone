import clsx from "clsx";

import styles from "./FeaturedProducts.module.scss";
import SectionTitle from "../SectionTitle";
import ProductsGrid from "../ProductsGrid";

function FeaturedProducts() {
   return (
      <div className={clsx(styles.wrapper)}>
         <SectionTitle text='Featured Products' />
         <ProductsGrid />
      </div>
   );
}

export default FeaturedProducts;
