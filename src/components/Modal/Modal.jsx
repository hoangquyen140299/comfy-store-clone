import clsx from "clsx";

import styles from "./Modal.module.scss";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useOutSideClick from "../../hooks/useOutSideClick";

const ModalContext = createContext();

function Modal({ children }) {
   const [openName, setOpenName] = useState("");
   const close = () => setOpenName("");
   const open = setOpenName;
   return (
      <ModalContext.Provider value={{ openName, close, open }}>
         {children}
      </ModalContext.Provider>
   );
}

function Open({ children, opensWindowName }) {
   const { open } = useContext(ModalContext);
   return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
   const { openName, close } = useContext(ModalContext);
   const ref = useOutSideClick(close);
   if (name !== openName) return null;

   return createPortal(
      <div className={clsx(styles.overlay)}>
         <div ref={ref} className={clsx(styles.modal)}>
            {cloneElement(children, { onCloseModal: close })}
         </div>
      </div>,
      document.body
   );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
