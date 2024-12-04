const userModel = require('../../models/userModel')
const orderModel = require("../../models/orderModel")

const allOrderController = async (req, res) => {
    const currentUserId = req.userId

    const user = await userModel.findById(currentUserId)

    if (user.role !== "ADMIN") {
        return res.status(400).json({
            message: "Permission denied!",
            error: true,
            success: false
        })
    }

    const allOrder = await orderModel.find().sort({ createdAt: -1 })

    return res.json({
        message: "all order",
        data: allOrder,
        success: true,
        error: false
    })
}

module.exports = allOrderController