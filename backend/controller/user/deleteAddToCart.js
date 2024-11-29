const addToCartModel = require("../../models/cartProduct")

const deleteAddToCart = async (req, res) => {
    try {
        const currentUserId = req.userId
        const addToCartId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartId })

        res.json({
            message: "Product Deleted Success!!",
            data: deleteProduct,
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCart