const mongoose = require('mongoose')

const { MONGO_CONNECTION_STRING, MONGO_DB_LOCAL } = process.env

const connectionString = MONGO_CONNECTION_STRING

// conexión a mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('Base de datos conectada'))
    .catch(err => {
        console.error('error db:', err)
    })