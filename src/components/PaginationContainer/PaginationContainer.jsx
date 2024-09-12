import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

import styles from "./PaginationContainer.module.scss";

function PaginationContainer() {
   const { meta } = useLoaderData();
   const { pageCount, page } = meta.pagination;
   const { search, pathname } = useLocation();
   const navigate = useNavigate();
   const pages = Array.from({ length: pageCount }, (_, index) => {
      return index + 1;
   });

   function handlePageChange(pageNumber) {
      const searchParams = new URLSearchParams(search);
      searchParams.set("page", pageNumber);
      navigate(`${pathname}?${searchParams.toString()}`);
   }

   if (pageCount < 2) return null;

   return (
      <div className={clsx(styles.wrapper)}>
         <div className={clsx(styles.container)}>
            <button
               className={clsx(styles.btn, styles.btnMd, styles.btnPrev)}
               onClick={() => {
                  let prevPage = page - 1;
                  if (prevPage < 1) prevPage = pageCount;
                  handlePageChange(prevPage);
               }}
            >
               prev
            </button>
            {pages.map((pageNumber) => {
               return (
                  <button
                     key={pageNumber}
                     className={clsx(styles.btn, styles.btnMd, {
                        [styles.active]: pageNumber === page,
                     })}
                     onClick={() => handlePageChange(pageNumber)}
                  >
                     {pageNumber}
                  </button>
               );
            })}
            <button
               className={clsx(styles.btn, styles.btnMd, styles.btnNext)}
               onClick={() => {
                  let nextPage = page + 1;
                  if (nextPage > pageCount) nextPage = 1;
                  handlePageChange(nextPage);
               }}
            >
               next
            </button>
         </div>
      </div>
   );
}

export default PaginationContainer;
