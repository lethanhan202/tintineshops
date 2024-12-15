const productModel = require("../../models/productModel")

const deleteProductController = async (req, res) => {
    try {
        const currentUser = req.userId
        const productId = req.body._id

        const deleteProduct = await productModel.deleteOne({ _id: productId })

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

module.exports = deleteProductController