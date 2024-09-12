import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./NavLinks.module.scss";
import { useSelector } from "react-redux";
import { links } from "./link";

function NavLinks({ toggle }) {
   const user = useSelector((state) => state.userState.user);
   return (
      <>
         {links.map((link) => {
            const { id, url, text } = link;
            if ((url === "checkout" || url === "orders") && !user) return null;
            return (
               <li key={id} className={clsx(styles.item)}>
                  <NavLink to={url} className={clsx(styles.itemLink)}>
                     {text}
                  </NavLink>
               </li>
            );
         })}
      </>
   );
}

export default NavLinks;
