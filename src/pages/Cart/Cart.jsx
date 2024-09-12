import { useSelector } from "react-redux";
import clsx from "clsx";

import styles from "./Cart.module.scss";
import SectionTitle from "../../components/SectionTitle";
import CartItemsList from "../../components/CartItemsList";
import CartTotal from "../../components/CartTotal";
import Button from "../../components/Button";

function Cart() {
   const user = useSelector((state) => state.userState.user);
   const numItemInCart = useSelector((state) => state.cartState.numItemInCart);

   if (numItemInCart === 0) return <SectionTitle text='Your cart is empty' />;

   return (
      <div>
         <SectionTitle text='Shopping cart' />
         <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.cartList)}>
               <CartItemsList />
            </div>
            <div className={clsx(styles.cartTotal)}>
               <CartTotal />
               <div className={clsx(styles.btnBox)}>
                  {user ? (
                     <Button to='/checkout' primary='primary'>
                        Proceed to checkout
                     </Button>
                  ) : (
                     <Button to='/login' primary='primary'>
                        please login
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Cart;
