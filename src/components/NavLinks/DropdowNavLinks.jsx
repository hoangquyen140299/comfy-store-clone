import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./DropdownNavLinks.module.scss";

import { useSelector } from "react-redux";
import Menus from "../Menus";
import { FaBarsStaggered } from "react-icons/fa6";
import { links } from "./link";

function DropdownNavLinks() {
   const user = useSelector((state) => state.userState.user);
   return (
      <Menus>
         <Menus.Toggle id='123' icon={<FaBarsStaggered />} />
         <Menus.List id='123'>
            {links.map((link) => {
               const { id, url, text } = link;
               if ((url === "checkout" || url === "orders") && !user)
                  return null;
               return (
                  <Menus.Button key={id}>
                     <NavLink to={url} className={clsx(styles.itemLink)}>
                        {text}
                     </NavLink>
                  </Menus.Button>
               );
            })}
         </Menus.List>
      </Menus>
   );
}

export default DropdownNavLinks;
