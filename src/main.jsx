import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./GlobalStyles";
import { store } from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <GlobalStyles>
            <App />
            <ToastContainer position='top-center' />
         </GlobalStyles>
      </Provider>
   </React.StrictMode>
);
