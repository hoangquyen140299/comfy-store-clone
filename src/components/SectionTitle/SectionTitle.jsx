import clsx from "clsx";

import styles from "./SectionTitle.module.scss";

function SectionTitle({ text }) {
   return (
      <div className={clsx(styles.wrapper)}>
         <h2 className={clsx(styles.title)}>{text}</h2>
      </div>
   );
}

export default SectionTitle;
