import clsx from "clsx";
import { Link, useRouteError } from "react-router-dom";

import styles from "./Error.module.scss";

function Error() {
   const error = useRouteError();
   console.log(error);
   if (error.status === 404)
      return (
         <main className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
               <p className={clsx(styles.status)}>404</p>
               <h1 className={clsx(styles.title)}>Page not found</h1>
               <p className={clsx(styles.description)}>
                  Sorry, we couldn't find the page you're looking for.
               </p>
            </div>
            <button className={clsx("btn")}>
               <Link to='/'>go back home</Link>
            </button>
         </main>
      );

   return (
      <main className={clsx(styles.wrapper)}>
         <h4>There was an error</h4>
      </main>
   );
}

export default Error;
