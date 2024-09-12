import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import clsx from "clsx";

import styles from "./SingleProduct.module.scss";
import { customFetch, formatPrice } from "../../utils";
import ButtonColor from "../../components/ButtonColor";
import Button from "../../components/Button";
import { addItem } from "../../features/cart/cartSlice";
import FormSelect from "../../components/FormSelect";

const singleProductQuery = (id) => {
   return {
      queryKey: ["singleProduct", id],
      queryFn: () => customFetch(`/products/${id}`),
   };
};

export const loader =
   (queryClient) =>
   async ({ params }) => {
      const response = await queryClient.ensureQueryData(
         singleProductQuery(params.id)
      );
      return { product: response.data.data };
   };

function SingleProduct() {
   const { product } = useLoaderData();
   const { title, company, price, image, description, colors } =
      product.attributes;
   const dollarsAmount = formatPrice(price);
   const [amount, setAmount] = useState(1);
   const [productColor, setProductColor] = useState(colors[0]);
   const dispatch = useDispatch();
   const cartProduct = {
      cartID: product.id + productColor,
      productID: product.id,
      title,
      image,
      price,
      amount,
      productColor,
      company,
   };

   function addToCart() {
      dispatch(addItem({ product: cartProduct }));
   }

   return (
      <section>
         <div className={clsx(styles.breadcrumbs)}>
            <ul>
               <li>
                  <Link to='/'>Home</Link>
               </li>
               <li>
                  <Link to='/products'>Products</Link>
               </li>
            </ul>
         </div>
         {/* PRODUCT */}
         <div className={clsx(styles.product)}>
            {/* IMAGE */}
            <img className={clsx(styles.image)} src={image} alt={title} />
            {/* PRODUCT INFO */}
            <div className={clsx(styles.productInfo)}>
               <h1 className={clsx(styles.title)}>{title}</h1>
               <h4 className={clsx(styles.company)}>{company}</h4>
               <p className={clsx(styles.price)}>{dollarsAmount}</p>
               <p className={clsx(styles.desc)}>{description}</p>
               {/* COLOR */}
               <div className={clsx(styles.colorBox)}>
                  <h4>colors</h4>
                  <div className={clsx(styles.colorBtn)}>
                     {colors.map((color) => (
                        <ButtonColor
                           key={color}
                           type='button'
                           color={color}
                           productColor={productColor}
                           setProductColor={setProductColor}
                        />
                     ))}
                  </div>
               </div>
               {/* AMOUNT */}
               <FormSelect
                  name='amount'
                  label='amount'
                  value={amount}
                  number={20}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className='amountSelect'
               />
               {/* CART BUTTON */}
               <div className={clsx(styles.buttonBox)}>
                  <Button onClick={addToCart} secondary='secondary'>
                     Add to bag
                  </Button>
               </div>
            </div>
         </div>
      </section>
   );
}

export default SingleProduct;
