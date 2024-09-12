import clsx from "clsx";
import { Link, useLoaderData } from "react-router-dom";

import styles from "./ProductsGrid.module.scss";
import { formatPrice } from "../../utils";

function ProductsGrid() {
   const { products } = useLoaderData();

   return (
      <div className={clsx(styles.wrapper)}>
         {products.map((product) => {
            const {
               attributes: { title, image, price },
            } = product;
            return (
               <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className={clsx(styles.cardItem)}
               >
                  <div className={styles.card}>
                     <img src={image} alt={title} />
                     <div className={clsx(styles.cardBody)}>
                        <h2>{title}</h2>
                        <span>{formatPrice(price)}</span>
                     </div>
                  </div>
               </Link>
            );
         })}
      </div>
   );
}

export default ProductsGrid;
