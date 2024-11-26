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

//user
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailController)
router.get("/userLogout", userLogout)

//admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//product
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-category", getCategoryProduct)
router.post("/category-product", getAllCategory)
router.post("/product-details", getProductDetails)

module.exports = router