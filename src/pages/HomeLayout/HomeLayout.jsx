import { Outlet, useNavigation } from "react-router-dom";
import clsx from "clsx";

import styles from "./HomeLayout.module.scss";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

function HomeLayout() {
   const navigation = useNavigation();
   const isPageLoading = navigation.state === "loading";

   return (
      <>
         <Header />
         <Navbar />
         {isPageLoading ? (
            <Loading />
         ) : (
            <section className={clsx(styles.wrapper)}>
               <Outlet />
            </section>
         )}
      </>
   );
}

export default HomeLayout;
