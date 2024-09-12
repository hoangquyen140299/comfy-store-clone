import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import clsx from "clsx";

import styles from "./Navbar.module.scss";
import DropdownNavLinks from "../NavLinks/DropdowNavLinks";
import NavLinks from "../NavLinks/NavLinks";

function Navbar() {
   const numItemInCart = useSelector((state) => state.cartState.numItemInCart);
   return (
      <nav>
         <div className={clsx(styles.wrapper)}>
            {/* Logo */}
            <div className={clsx(styles.logo)}>
               <NavLink to='/' className={clsx(styles.navSpan)}>
                  C
               </NavLink>
            </div>

            {/* Dropdown */}
            <DropdownNavLinks />

            {/* NavLink */}
            <div className={clsx(styles.navLinks)}>
               <ul className={clsx(styles.list)}>
                  <NavLinks />
               </ul>
            </div>

            {/* NAV END */}
            <div>
               <NavLink to='/cart'>
                  <div className={clsx(styles.cart)}>
                     <BsCart3 />
                     <span className={clsx(styles.badge)}>
                        {Number(numItemInCart)}
                     </span>
                  </div>
               </NavLink>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
