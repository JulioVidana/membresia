module.exports = (req, res, next) => {
    const { rol } = req.user

    if (rol !== 'admin' && rol !== 'superadmin') {
        return res
            .status(401)
            .json({ msg: 'No tiene permiso' })

    }
    next()

}