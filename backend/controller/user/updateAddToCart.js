const addToCartModel = require("../../models/cartProduct")


const updateAddToCart = async (req, res) => {
    try {

        const currentUserId = req.userId
        const addToCartId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartId }, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "update",
            success: true,
            error: false,
            data: updateProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddToCart