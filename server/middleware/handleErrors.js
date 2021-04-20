const ERROR_HANDLERS = {
    CastError: res =>
        res.status(400).send({ msg: 'id used is malformed' }),

    ValidationError: (res, { message }) =>
        res.status(409).send({ msg: message }),

    JsonWebTokenError: (res) =>
        res.status(401).json({ msg: 'token missing or invalid' }),

    TokenExpirerError: res =>
        res.status(401).json({ msg: 'token expired' }),

    defaultError: (res, error) => {
        console.error(error.name)
        res.status(500).end()
    }
}

module.exports = (error, request, response, next) => {
    const handler =
        ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

    handler(response, error)
}