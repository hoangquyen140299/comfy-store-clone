import { Link, useLoaderData } from "react-router-dom";
import clsx from "clsx";

import styles from "./ProductsList.module.scss";
import { formatPrice } from "../../utils";

function ProductsList() {
   const { products } = useLoaderData();
   return (
      <div className={clsx(styles.wrapper)}>
         {products.map((product) => {
            const {
               attributes: { title, image, price, company },
            } = product;
            return (
               <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className={clsx(styles.cardItem)}
               >
                  <div className={clsx(styles.card)}>
                     <img src={image} alt={title} />
                     <div className={clsx(styles.cardBody)}>
                        <h2>{title}</h2>
                        <h4>{company}</h4>
                     </div>
                     <p className={clsx(styles.price)}>{formatPrice(price)}</p>
                  </div>
               </Link>
            );
         })}
      </div>
   );
}

export default ProductsList;
