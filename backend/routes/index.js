const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp.js')
const userSignInController = require('../controller/user/userSignIn.js')
const userDetailController = require('../controller/user/userDetail.js')
const authToken = require('../middleware/authToken.js')
const userLogout = require('../controller/user/userLogout.js')
const allUsers = require('../controller/user/allUsers.js')
const updateUser = require('../controller/user/updateUser.js')
const uploadProductController = require('../controller/product/uploadProduct.js')
const getProductController = require('../controller/product/getProduct.js')
const updateProductController = require('../controller/product/updateProduct.js')
const getCategoryProduct = require('../controller/product/getCategory.js')
const getAllCategory = require('../controller/product/getAllCategory.js')
const getProductDetails = require('../controller/product/getProductDetails.js')
const addToCartController = require('../controller/user/addToCartController.js')
const countAddToCart = require('../controller/user/countAddToCart.js')
const addToCartView = require('../controller/user/addToCartView.js')
const updateAddToCart = require('../controller/user/updateAddToCart.js')
const deleteAddToCart = require('../controller/user/deleteAddToCart.js')
const searchProduct = require('../controller/product/searchProduct.js')
const filterProductController = require('../controller/product/filterProduct.js')
const paymentController = require('../controller/order/paymentController.js')
const webhooks = require('../controller/order/webhook.js')
const orderController = require('../controller/order/orderController.js')
const allOrderController = require('../controller/order/allOrderController.js')
const deleteProductController = require('../controller/user/deleteProduct.js')
const deleteUserController = require('../controller/user/deleteUser.js')



//user
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailController)
router.get("/userLogout", userLogout)

//admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)
router.post("/delete-product", authToken, deleteProductController)
router.post("/delete-user", authToken, deleteUserController)

//product
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-category", getCategoryProduct)
router.post("/category-product", getAllCategory)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)


//user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCart", authToken, countAddToCart)
router.get("/view-cart-product", authToken, addToCartView)
router.post("/update-cart", authToken, updateAddToCart)
router.post("/delete-cart", authToken, deleteAddToCart)

//payment & order
router.post("/checkout", authToken, paymentController)
router.post("/webhook", webhooks)                       // /api/webhook
router.get("/order-list", authToken, orderController)
router.get("/all-order", authToken, allOrderController)

module.exports = router