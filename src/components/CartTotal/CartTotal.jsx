import clsx from "clsx";

import styles from "./CartTotal.module.scss";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils";

function CartTotal() {
   const { cartTotal, orderTotal, shipping, tax } = useSelector(
      (state) => state.cartState
   );

   return (
      <div className={clsx(styles.cart)}>
         <div className={clsx(styles.cartBody)}>
            <p className={clsx(styles.cartContent)}>
               <span>Subtotal</span>
               <span>{formatPrice(cartTotal)}</span>
            </p>
            <p className={clsx(styles.cartContent)}>
               <span>Shipping</span>
               <span>{formatPrice(shipping)}</span>
            </p>
            <p className={clsx(styles.cartContent)}>
               <span>Tax</span>
               <span>{formatPrice(tax)}</span>
            </p>
            <p className={clsx(styles.cartContent)}>
               <span>Order Total</span>
               <span>{formatPrice(orderTotal)}</span>
            </p>
         </div>
      </div>
   );
}

export default CartTotal;
