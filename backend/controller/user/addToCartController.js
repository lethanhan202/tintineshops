const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req, res) => {
    try {

        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser })

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data: saveProduct,
            message: "Product Added Successful",
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartController