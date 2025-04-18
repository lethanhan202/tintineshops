import { createBrowserRouter } from "react-router-dom";
import App from "../App.js"
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import SignUp from "../pages/SignUp.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import AllUser from "../pages/AllUser.jsx";
import AllProduct from "../pages/AllProduct.jsx";
import CategoryProduct from "../pages/CategoryProduct.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import SearchProduct from "../pages/SearchProduct.jsx";
import SuccessPayment from "../pages/SuccessPayment.jsx";
import CancelPayment from "../pages/CancelPayment.jsx";
import OrderPage from "../pages/OrderPage.jsx";
import AllOrder from "../pages/AllOrder.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: 'search',
                element: <SearchProduct />
            },
            {
                path: "success",
                element: <SuccessPayment />
            },
            {
                path: 'cancel',
                element: <CancelPayment />
            },
            {
                path: "order",
                element: <OrderPage />
            },
            {
                path: "admin_panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUser />
                    },
                    {
                        path: "all-products",
                        element: <AllProduct />
                    },
                    {
                        path: "all-order",
                        element: <AllOrder />
                    }
                ]
            },
        ]
    }
])

export default router