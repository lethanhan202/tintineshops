const userModel = require("../models/userModel")

async function allUsers(req, res) {
    try {
        console.log('userid', req.userId)

        const allUsers = await userModel.find()

        res.json({
            message: "All User",
            data: allUsers,
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

module.exports = allUsers