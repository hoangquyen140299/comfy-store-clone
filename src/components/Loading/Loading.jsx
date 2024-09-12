import clsx from "clsx";

import styles from "./Loading.module.scss";

function Loading() {
   return (
      <div className={clsx(styles.wrapper)}>
         <span className={clsx(styles.loading)} />
      </div>
   );
}

export default Loading;
