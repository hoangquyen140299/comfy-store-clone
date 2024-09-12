import clsx from "clsx";
import { toast } from "react-toastify";
import { Form, Link, redirect } from "react-router-dom";

import styles from "./Register.module.scss";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { customFetch } from "../../utils";

export async function action({ request }) {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);

   try {
      const response = await customFetch.post("/auth/local/register", data);
      toast.success("account created successfully");
      return redirect("/login");
   } catch (error) {
      const errorMessage =
         error?.response?.data?.error?.message ||
         "please double check your credentials";
      toast.error(errorMessage);
      return null;
   }
}

function Register() {
   return (
      <section className={clsx(styles.wrapper)}>
         <Form method='POST' className={clsx(styles.form)}>
            <h4>Register</h4>
            <FormInput type='text' label='username' name='username' />
            <FormInput type='email' label='email' name='email' />
            <FormInput type='password' label='password' name='password' />
            <div className={clsx(styles.buttonBox)}>
               <Button type='submit' primary='primary' text='Register'>
                  Register
               </Button>
            </div>
            <p>
               Already a member?
               <Link to='/login' className={clsx(styles.link)}>
                  Login
               </Link>
            </p>
         </Form>
      </section>
   );
}

export default Register;
