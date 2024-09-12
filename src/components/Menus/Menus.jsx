import clsx from "clsx";
import { createContext, useContext, useState } from "react";

import styles from "./Menu.module.scss";
import { createPortal } from "react-dom";
import useOutSideClick from "../../hooks/useOutSideClick";

const MenusContext = createContext();

function Menus({ children }) {
   const [openId, setOpenId] = useState("");
   const [position, setPosition] = useState(null);

   const open = setOpenId;
   const close = () => setOpenId("");

   return (
      <MenusContext.Provider
         value={{
            openId,
            close,
            open,
            position,
            setPosition,
         }}
      >
         <div className={clsx(styles.wrapper)}>{children}</div>
      </MenusContext.Provider>
   );
}

function Toggle({ id, icon }) {
   const { openId, close, open, setPosition } = useContext(MenusContext);

   function handleClick(e) {
      e.stopPropagation();

      const rect = e.target.closest("button").getBoundingClientRect();
      setPosition({
         x: window.innerWidth - rect.width - rect.x - 170,
         y: rect.y + rect.height + 22,
      });

      openId === "" || openId !== id ? open(id) : close();
   }

   return (
      <button className={clsx(styles.toggle)} onClick={handleClick}>
         {icon}
      </button>
   );
}

function List({ children, id }) {
   const { openId, close, position } = useContext(MenusContext);
   const ref = useOutSideClick(close, false);

   if (openId !== id) return null;

   return createPortal(
      <ul
         className={clsx(styles.list, styles.menu)}
         ref={ref}
         style={{ right: `${position.x}px`, top: `${position.y}px` }}
      >
         {children}
      </ul>,
      document.body
   );
}

function Button({ children, icon, onClick }) {
   const { close } = useContext(MenusContext);

   function handleClick() {
      onClick?.();
      close();
   }
   return (
      <li>
         <button className={clsx(styles.dropdown)} onClick={handleClick}>
            {icon}
            {children}
            {/* <span>{children}</span> */}
         </button>
      </li>
   );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
