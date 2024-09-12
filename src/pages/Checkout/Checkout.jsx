import clsx from "clsx";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import SectionTitle from "../../components/SectionTitle";
import CartTotal from "../../components/CartTotal";
import CheckoutForm from "../../components/CheckoutForm";

import styles from "./Checkout.module.scss";

export const loader = (store) => () => {
   const user = store.getState().userState.user;
   if (!user) {
      toast.warn("you must be logged in to checkout");
      return redirect("/login");
   }
   return null;
};

function Checkout() {
   const { cartItems } = useSelector((state) => state.cartState);

   if (cartItems.length === 0)
      return <SectionTitle text='your cart is empty' />;

   return (
      <>
         <SectionTitle text='Place Your Order' />
         <div className={clsx(styles.container)}>
            <CheckoutForm />
            <CartTotal />
         </div>
      </>
   );
}

export default Checkout;
