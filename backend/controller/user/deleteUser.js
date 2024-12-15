const userModel = require("../../models/userModel")

const deleteUserController = async (req, res) => {

    try {

        const currentUser = req?.body?._id
        const deleteUser = await userModel.findByIdAndDelete({ _id: currentUser })

        res.status(200).json({
            message: "User Deleted Success!!",
            data: deleteUser,
            error: false,
            success: true
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


module.exports = deleteUserController