import { formatPrice } from "../../utils";
import clsx from "clsx";

import styles from "./CartItem.module.scss";
import FormSelect from "../FormSelect";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../../features/cart/cartSlice";

function CartItem({ cartItem }) {
   const { image, title, company, productColor, price, amount, cartID } =
      cartItem;
   const dispatch = useDispatch();
   removeItem;
   function handleDelete() {
      dispatch(removeItem({ cartID }));
   }

   function handleChange(e) {
      dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
   }
   return (
      <article className={clsx(styles.wrapper)}>
         <img src={image} alt={title} className={clsx(styles.image)} />
         <div className={clsx(styles.body)}>
            <h3 className={clsx(styles.title)}>{title}</h3>
            <h4 className={clsx(styles.company)}>{company}</h4>
            <p className={clsx(styles.color)}>
               color:
               <span
                  style={{ backgroundColor: productColor }}
                  className={clsx(styles.badge)}
               ></span>
            </p>
         </div>
         <div className={clsx(styles.amount)}>
            <FormSelect
               label='amount'
               name='select'
               value={amount}
               onChange={handleChange}
               paddingTop='paddingTop'
            />
            <button className={clsx(styles.btn)} onClick={handleDelete}>
               remove
            </button>
         </div>
         <p className={clsx(styles.price)}>{formatPrice(price)}</p>
      </article>
   );
}

export default CartItem;
