module.exports = (request, response, next) => {
    response.status(404).send({ msg: 'Not Found' })
}