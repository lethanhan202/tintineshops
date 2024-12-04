let orderModel = require("../../models/orderModel")

const orderController = async (req, res) => {
    try {

        const currentUser = req.userId

        const orderList = await orderModel.find({ userId: currentUser }).sort({ createdAt: -1 })

        res.json({
            message: "ok",
            data: orderList,
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

module.exports = orderController