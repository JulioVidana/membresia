const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

//IMPORTAR RUTAS
const iglesiasRoutes = require('./routes/iglesias')
const usuariosRoutes = require('./routes/usuarios')
const catalogosPersonas = require('./routes/catalogosPersonas')
const personas = require('./routes/personas')
const avatarsPersonas = require('./routes/avatarPersonas')

//conexión base de datos MONGODB LOCAL
mongoose.connect('mongodb://localhost:27017/membresia', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

//capturar Body
var corsOptions = {
    origin: '*', // Reemplazar con dominio donde estará el frontend
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//route middelware
app.use('/api/iglesias', iglesiasRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/catalogos', catalogosPersonas)
app.use('/api/personas', personas)
app.use('/api/avatars', avatarsPersonas)
app.get('/', (req, res) => {
    res.send('Membresia API')
})
app.use(notFound)
app.use(handleErrors)

//Iniciar Server
const PORT = process.env.PORT || 3001
app.listen(PORT), () => {
    console.log(`corriendo en puerto: ${PORT}`)
}