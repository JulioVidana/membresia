module.exports = (req, res, next) => {

    const { rol } = req.user
    if (rol !== 'superadmin') {
        return res
            .status(401)
            .json({ msg: 'No tiene permisos' })
    }

    next()

}