import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import About from "./pages/About";
import Cart from "./pages/Cart";
import HomeLayout from "./pages/HomeLayout";

import Error from "./pages/Error";
import ErrorElement from "./components/ErrorElement";

import Landing, { landingLoader } from "./pages/Landing";
import SingleProduct, { SingleProductLoader } from "./pages/SingleProduct";
import Products, { ProductsLoader } from "./pages/Products";
import Checkout, { checkoutLoader } from "./pages/Checkout";
import Orders, { ordersLoader } from "./pages/Orders";

import Register, { registerAction } from "./pages/Register";
import Login, { loginAction } from "./pages/Login";
import { checkoutAction } from "./components/CheckoutForm";

import { store } from "./store";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 1000 * 60 * 5,
      },
   },
});

const router = createBrowserRouter([
   {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
         {
            index: true,
            element: <Landing />,
            errorElement: <ErrorElement />,
            loader: landingLoader(queryClient),
         },
         { path: "about", element: <About /> },
         {
            path: "products",
            element: <Products />,
            loader: ProductsLoader(queryClient),
         },
         {
            path: "products/:id",
            element: <SingleProduct />,
            loader: SingleProductLoader(queryClient),
         },
         { path: "cart", element: <Cart /> },
         {
            path: "checkout",
            element: <Checkout />,
            loader: checkoutLoader(store),
            action: checkoutAction(store, queryClient),
         },
         {
            path: "orders",
            element: <Orders />,
            loader: ordersLoader(store, queryClient),
         },
      ],
   },
   {
      path: "login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction(store),
   },
   {
      path: "register",
      element: <Register />,
      errorElement: <Error />,
      action: registerAction,
   },
]);

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}
export default App;
