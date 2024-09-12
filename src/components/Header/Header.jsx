import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector((state) => state.userState.user);
   const queryClient = useQueryClient();

   function handleLogout() {
      dispatch(clearCart());
      dispatch(logoutUser());
      navigate("/");
      queryClient.removeQueries();
   }

   return (
      <header className={clsx(styles.wrapper)}>
         <div className={clsx(styles.container)}>
            {user ? (
               <div className={clsx(styles.logout)}>
                  <p className={clsx(styles.user)}>Hello, {user.username}</p>
                  <button className={clsx(styles.btn)} onClick={handleLogout}>
                     Logout
                  </button>
               </div>
            ) : (
               <div className={clsx(styles.list)}>
                  <Link to='/login' className={clsx(styles.link)}>
                     Sign in/ Guest
                  </Link>
                  <Link to='/register' className={clsx(styles.link)}>
                     Create Account
                  </Link>
               </div>
            )}
         </div>
      </header>
   );
}

export default Header;
