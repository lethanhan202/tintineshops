const addToCartModel = require("../../models/cartProduct")

const countAddToCart = async (req, res) => {
    try {

        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data: {
                count: count
            },
            message: "Ok",
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

module.exports = countAddToCart