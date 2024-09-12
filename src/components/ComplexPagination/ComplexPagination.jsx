import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import styles from "./ComplexPagination.module.scss";

const RANGE = 2;
function ComplexPagination() {
   const { meta } = useLoaderData();
   const { pageCount, page } = meta.pagination;
   const { search, pathname } = useLocation();
   const navigate = useNavigate();

   const handlePageChange = (pageNumber) => {
      const searchParams = new URLSearchParams(search);
      searchParams.set("page", pageNumber);
      navigate(`${pathname}?${searchParams.toString()}`);
   };

   function renderPagination() {
      let dotAfter = false;
      let dotBefore = false;

      const renderDotBefore = (pageNumber) => {
         if (!dotBefore) {
            dotBefore = true;
            return (
               <span
                  key={`dot-before-${pageNumber}`}
                  className={clsx(styles.btn, styles.btnMd)}
               >
                  ...
               </span>
            );
         }
         return null;
      };

      const renderDotAfter = (pageNumber) => {
         if (!dotAfter) {
            dotAfter = true;
            return (
               <span
                  key={`dot-after-${pageNumber}`}
                  className={clsx(styles.btn, styles.btnMd)}
               >
                  ...
               </span>
            );
         }
         return null;
      };

      return Array.from({ length: pageCount }, (_, index) => {
         const pageNumber = index + 1;
         // if the current page is within the first few pages render dots after
         if (
            page <= RANGE * 2 + 1 &&
            pageNumber > page + RANGE &&
            pageNumber < pageCount - RANGE + 1
         ) {
            return renderDotAfter(pageNumber);
            // if the current page is somewhere in the middle render dots before and after the current page
         } else if (page > RANGE && page < pageCount - RANGE) {
            if (pageNumber < page - RANGE && pageNumber > RANGE) {
               return renderDotBefore(pageNumber);
            } else if (
               pageNumber > page + RANGE &&
               pageNumber < pageCount - RANGE + 1
            ) {
               return renderDotAfter(pageNumber);
            }
            // if the current page is towards the end, render dots before the current page
            // if the page number is out of range
         } else if (
            page >= pageCount - RANGE &&
            pageNumber > RANGE &&
            pageNumber < page - RANGE
         ) {
            return renderDotBefore(pageNumber);
         }
         // render a button for each page number that falls within the range
         return (
            <button
               key={pageNumber}
               onClick={() => handlePageChange(pageNumber)}
               className={clsx(styles.btn, styles.btnMd, {
                  [styles.active]: pageNumber === page,
               })}
            >
               {pageNumber}
            </button>
         );
      });
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
               Prev
            </button>
            {renderPagination()}
            <button
               className={clsx(styles.btn, styles.btnMd, styles.btnNext)}
               onClick={() => {
                  let nextPage = page + 1;
                  if (nextPage > pageCount) nextPage = 1;
                  handlePageChange(nextPage);
               }}
            >
               Next
            </button>
         </div>
      </div>
   );
}

export default ComplexPagination;

// function ComplexPagination() {
//    const { meta } = useLoaderData();
//    const { pageCount, page } = meta.pagination;
//    const { search, pathname } = useLocation();
//    const navigate = useNavigate();
//    const handlePageChange = (pageNumber) => {
//       const searchParams = new URLSearchParams(search);
//       searchParams.set("page", pageNumber);
//       navigate(`${pathname}?${searchParams.toString()}`);
//    };

//    const addPageButton = ({ pageNumber, activeClass }) => {
//       return (
//          <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={clsx(styles.btn, styles.btnMd, [
//                activeClass && styles.active,
//             ])}
//          >
//             {pageNumber}
//          </button>
//       );
//    };

//    const renderPageButtons = () => {
//       const pageButtons = [];

//       // first button
//       pageButtons.push(
//          addPageButton({ pageNumber: 1, activeClass: page === 1 })
//       );

//       // dots
//       if (page > 3) {
//          pageButtons.push(
//             <button className={clsx(styles.btn, styles.btnMd)} key='dots-1'>
//                ...
//             </button>
//          );
//       }

//       // one before current page
//       if (page !== 1 && page !== 2) {
//          pageButtons.push(
//             addPageButton({ pageNumber: page - 1, activeClass: false })
//          );
//       }

//       //active/current page
//       if (page !== 1 && page !== pageCount) {
//          pageButtons.push(
//             addPageButton({ pageNumber: page, activeClass: true })
//          );
//       }

//       // one after current page
//       if (page !== pageCount && page !== pageCount - 1) {
//          pageButtons.push(
//             addPageButton({
//                pageNumber: page + 1,
//                activeClass: false,
//             })
//          );
//       }

//       // dots
//       if (page < pageCount - 2) {
//          pageButtons.push(
//             <button className={clsx(styles.btn, styles.btnMd)} key='dots+1'>
//                ...
//             </button>
//          );
//       }

//       // last button
//       pageButtons.push(
//          addPageButton({
//             pageNumber: pageCount,
//             activeClass: page === pageCount,
//          })
//       );

//       return pageButtons;
//    };

//    if (pageCount < 2) return null;

//    return (
//       <div className={clsx(styles.wrapper)}>
//          <div className={clsx(styles.container)}>
//             <button
//                className={clsx(styles.btn, styles.btnMd, styles.btnPrev)}
//                onClick={() => {
//                   let prevPage = page - 1;
//                   if (prevPage < 1) prevPage = pageCount;
//                   handlePageChange(prevPage);
//                }}
//             >
//                Prev
//             </button>
//             {renderPageButtons()}
//             <button
//                className={clsx(styles.btn, styles.btnMd, styles.btnNext)}
//                onClick={() => {
//                   let nextPage = page + 1;
//                   if (nextPage > pageCount) nextPage = 1;
//                   handlePageChange(nextPage);
//                }}
//             >
//                Next
//             </button>
//          </div>
//       </div>
//    );
// }

// export default ComplexPagination;
