import { Form, redirect } from "react-router-dom";
import clsx from "clsx";

import styles from "./CheckoutForm.module.scss";
import { customFetch, formatPrice } from "../../utils";
import { toast } from "react-toastify";
import { clearCart } from "../../features/cart/cartSlice";
import Button from "../Button";
import FormInput from "../FormInput";

export const action =
   (store, queryClient) =>
   async ({ request }) => {
      const formData = await request.formData();
      const { name, address } = Object.fromEntries(formData);
      const user = store.getState().userState.user;
      const { cartItems, orderTotal, numItemInCart } =
         store.getState().cartState;

      const info = {
         name,
         address,
         chargeTotal: orderTotal,
         orderTotal: formatPrice(orderTotal),
         cartItems,
         numItemsInCart: numItemInCart,
      };
      try {
         const response = await customFetch.post(
            "/orders",
            { data: info },
            {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            }
         );
         // remove query
         queryClient.removeQueries(["orders"]);
         store.dispatch(clearCart());
         toast.success("order placed successfully");
         return redirect("/orders");
      } catch (error) {
         const errorMessage =
            error?.response?.data?.error?.message ||
            "there was an error placing yur order";

         toast.error(errorMessage);
         if (error?.response?.status === 401 || 403) return redirect("/login");
         return null;
      }
   };

function CheckoutForm() {
   return (
      <Form method='POST' className={clsx(styles.form)}>
         <h4>Shipping information</h4>
         <FormInput label='first name' name='name' type='text' />
         <FormInput label='address' name='address' type='text' />

         <div className={clsx(styles.btn)}>
            <Button type='submit' primary='primary' btnBlock='btnBlock'>
               place your order
            </Button>
         </div>
      </Form>
   );
}

export default CheckoutForm;
