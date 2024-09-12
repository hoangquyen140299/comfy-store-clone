import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./Hero.module.scss";
import hero2 from "../../assets/hero2.webp";
import Button from "../../components/Button";

function Hero() {
   return (
      <div className={clsx(styles.wrapper)}>
         <div>
            <h1 className={clsx(styles.title)}>
               We're changing the way people shop
            </h1>
            <p className={clsx(styles.description)}>
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
               repellat explicabo enim soluta temporibus asperiores aut
               obcaecati perferendis porro nobis.
            </p>
            <div className={clsx(styles.box)}>
               <Button to='/products' primary='primary'>
                  Our Products
               </Button>
            </div>
         </div>

         <div className={clsx(styles.imgBox)}>
            <img src={hero2} alt='Hero image' />
         </div>
      </div>
   );
}

export default Hero;
