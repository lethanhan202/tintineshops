import { createBrowserRouter } from "react-router-dom";
import App from "../App.js"
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import SignUp from "../pages/SignUp.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import AllUser from "../pages/AllUser.jsx";
import AllProduct from "../pages/AllProduct.jsx";

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
                    }
                ]
            },
        ]
    }
])

export default router