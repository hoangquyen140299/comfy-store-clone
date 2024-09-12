import { useSelector } from "react-redux";
import CartItem from "../CartItem";

function CartItemsList() {
   const cartItems = useSelector((state) => state.cartState.cartItems);

   return (
      <>
         {cartItems.map((item) => (
            <CartItem key={item.cartID} cartItem={item} />
         ))}
      </>
   );
}

export default CartItemsList;
