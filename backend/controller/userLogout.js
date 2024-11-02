async function userLogout(req, res) {

    try {

        res.clearCookie("token")

        res.json({
            message: "Logout successfully!",
            error: false,
            success: true,
            data: []
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }

}

module.exports = userLogout