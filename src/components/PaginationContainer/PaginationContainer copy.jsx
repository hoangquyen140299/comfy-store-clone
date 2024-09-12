import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

import styles from "./PaginationContainer.module.scss";

function PaginationContainer() {
   const { meta } = useLoaderData();
   const { pageCount, page } = meta.pagination;
   const { search, pathname } = useLocation();
   const navigate = useNavigate();

   function handlePageChange(pageNumber) {
      const searchParams = new URLSearchParams(search);
      searchParams.set("page", pageNumber);
      navigate(`${pathname}?${searchParams.toString()}`);
   }

   function addPageButton({ pageNumber, activeClass }) {
      return (
         <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={clsx(styles.btn, styles.btnMd, {
               [styles.active]: activeClass,
            })}
         >
            {pageNumber}
         </button>
      );
   }

   function renderPageButton() {
      const pageButtons = [];

      // first button
      pageButtons.push(
         addPageButton({ pageNumber: 1, activeClass: page === 1 })
      );

      // dots
      if (page > 2) {
         pageButtons.push(
            <button key='dots-1' className={clsx(styles.btn, styles.btnMd)}>
               ...
            </button>
         );
      }

      // active/current page
      if (page !== 1 && page !== pageCount) {
         pageButtons.push(
            addPageButton({ pageNumber: page, activeClass: true })
         );
      }
      // dots
      if (page < pageCount - 1) {
         pageButtons.push(
            <button key='dots-2' className={clsx(styles.btn, styles.btnMd)}>
               ...
            </button>
         );
      }

      // last button
      pageButtons.push(
         addPageButton({
            pageNumber: pageCount,
            activeClass: page === pageCount,
         })
      );
      return pageButtons;
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
            {renderPageButton()}
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
