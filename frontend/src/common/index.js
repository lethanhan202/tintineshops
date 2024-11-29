const backendDomain = "http://localhost:8000"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    currentUser: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'post'
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    getCategoryProduct: {
        url: `${backendDomain}/api/get-category`,
        method: "get"
    },
    categoryProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    countAddToCart: {
        url: `${backendDomain}/api/countAddToCart`,
        method: "get"
    },
    addToCartView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    updateCart: {
        url: `${backendDomain}/api/update-cart`,
        method: "post"
    },
    deleteCart: {
        url: `${backendDomain}/api/delete-cart`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    }
}

export default SummaryApi