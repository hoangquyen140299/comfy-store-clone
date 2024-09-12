import clsx from "clsx";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import styles from "./OrdersList.module.scss";
import { useLoaderData } from "react-router-dom";

function OrdersList() {
   const { orders, meta } = useLoaderData();

   return (
      <div className={clsx(styles.wrapper)}>
         <h4 className={clsx(styles.total)}>
            Total Orders: {meta.pagination.total}
         </h4>
         <div className={clsx(styles.container)}>
            <table className={clsx(styles.table)}>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Address</th>
                     <th>Products</th>
                     <th>Cost</th>
                     <th>Date</th>
                  </tr>
               </thead>
               <tbody>
                  {orders.map((order) => {
                     const id = order.id;
                     const {
                        name,
                        address,
                        numItemsInCart,
                        orderTotal,
                        createdAt,
                     } = order.attributes;
                     const date = dayjs(createdAt).format(
                        "hh:mm a - MMM Do, YYYY"
                     );
                     return (
                        <tr key={id}>
                           <td>{name}</td>
                           <td>{address}</td>
                           <td>{numItemsInCart}</td>
                           <td>{orderTotal}</td>
                           <td>{date}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default OrdersList;
