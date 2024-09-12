import {
   Form,
   Link,
   redirect,
   useNavigate,
   useNavigation,
} from "react-router-dom";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import FormInput from "../../components/FormInput";
import styles from "./Login.module.scss";
import Button from "../../components/Button";
import { customFetch } from "../../utils";
import { loginUser } from "../../features/user/userSlice";

export function action(store) {
   return async function ({ request }) {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      try {
         const response = await customFetch.post("/auth/local", data);
         store.dispatch(loginUser(response.data));
         toast.success("logged in successfully");
         return redirect("/");
      } catch (error) {
         const errorMessage = error?.response?.data?.error?.message;
         toast.error(errorMessage);
         return null;
      }
   };
}

function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   async function loginAsGuestUser() {
      try {
         const response = await customFetch.post("/auth/local", {
            identifier: "james@gmail.com",
            password: "secret",
         });
         console.log(response);
         dispatch(loginUser(response.data));
         toast.success("welcome guest user");
         return navigate("/");
      } catch (error) {
         console.log(error);
         toast.error("guest user login error.please try later.");
         return null;
      }
   }
   return (
      <section className={clsx(styles.wrapper)}>
         <Form method='POST' className={clsx(styles.form)}>
            <h4>Login</h4>
            <FormInput
               type='email'
               label='email'
               name='identifier'
               defaultValue='test@test.com'
            />
            <FormInput
               type='password'
               label='password'
               name='password'
               defaultValue='secret'
            />
            <div className={clsx(styles.buttonBox)}>
               <Button type='submit' primary='primary'>
                  Login
               </Button>
               <Button
                  type='button'
                  secondary='secondary'
                  onClick={loginAsGuestUser}
               >
                  Guest user
               </Button>
            </div>
            <p>
               Not a member yet?
               <Link to='/register' className={clsx(styles.link)}>
                  Register
               </Link>
            </p>
         </Form>
      </section>
   );
}

export default Login;
