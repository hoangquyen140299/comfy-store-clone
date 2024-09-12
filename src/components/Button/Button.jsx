import clsx from "clsx";
import { Link, useNavigation } from "react-router-dom";

import styles from "./Button.module.scss";
import Spinner from "./../Spinner/Spinner";

function Button({
   children,
   type,
   to,
   onClick,
   className,
   primary,
   accent,
   secondary,
   size,
   btnBlock,
}) {
   const navigation = useNavigation();
   const isSubmitting = navigation.state === "submitting";

   const classes = clsx(
      styles.btn,
      styles[className],
      styles[accent],
      styles[primary],
      styles[secondary],
      styles[size],
      styles[btnBlock]
   );

   if (to) {
      return (
         <Link to={to} className={classes}>
            {children}
         </Link>
      );
   }

   return (
      <button
         disabled={isSubmitting}
         type={type}
         className={classes}
         onClick={onClick}
      >
         {children}
      </button>
   );
}

export default Button;
