import clsx from "clsx";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import styles from "./ProductsContainer.module.scss";

import ProductsList from "../ProductsList";
import ProductsGrid from "../ProductsGrid";

function ProductsContainer() {
   const { meta } = useLoaderData();
   const totalProducts = meta.pagination.total;
   const [isGrid, setIsGrid] = useState(true);
   return (
      <>
         <div className={clsx(styles.wrapper)}>
            <h4>
               {totalProducts} product{totalProducts > 1 && "s"}
            </h4>
            <div className={clsx(styles.box)}>
               <button
                  className={clsx(styles.btn, {
                     [styles.layout]: isGrid,
                  })}
                  onClick={() => setIsGrid(true)}
               >
                  <BsFillGridFill />
               </button>
               <button
                  className={clsx(styles.btn, { [styles.layout]: !isGrid })}
                  onClick={() => setIsGrid(false)}
               >
                  <BsList />
               </button>
            </div>
         </div>
         <div>
            {totalProducts === 0 ? (
               <h5 className={clsx(styles.title)}>
                  Sorry, no products matched your search...
               </h5>
            ) : isGrid ? (
               <ProductsGrid />
            ) : (
               <ProductsList />
            )}
         </div>
      </>
   );
}

export default ProductsContainer;
