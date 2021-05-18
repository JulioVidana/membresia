require('dotenv').config()
require('./utils/db.config')//conexión MongoDB

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/requireAuth')

//IMPORTAR RUTAS
const iglesiasRoutes = require('./routes/iglesias')
const usuariosRoutes = require('./routes/usuarios')
const catalogosGlobal = require('./routes/catalogosGlobal')
const personas = require('./routes/personas')
const avatarsPersonas = require('./routes/avatarPersonas')
const familias = require('./routes/familias')
const notasRoutes = require('./routes/notas')
const rptPersonas = require('./routes/reportPersonas')
const loginRoutes = require('./routes/login')
const tiposMiembros = require('./routes/tiposMiembros')
const grupoEdades = require('./routes/grupoEdades')
const ministerios = require('./routes/ministerios')


//capturar Body
var corsOptions = {
    origin: process.env.FRONTEND_APP_URL, // Reemplazar con dominio donde estará el frontend '*'
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//route middelware
app.get('/', (req, res) => res.send('Iglesiapp API'))
app.use('/api/login', loginRoutes)
app.use(requireAuth)//protegiendo rutas
app.use('/api/iglesias', iglesiasRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/catalogosglobal', catalogosGlobal)
app.use('/api/personas', personas)
app.use('/api/avatars', avatarsPersonas)
app.use('/api/familias', familias)
app.use('/api/notas', notasRoutes)
app.use('/api/rptpersonas', rptPersonas)
app.use('/api/tiposmiembros', tiposMiembros)
app.use('/api/grupoedades', grupoEdades)
app.use('/api/tiposministerios', ministerios)
app.use(notFound)
app.use(handleErrors)

//Iniciar Server
const PORT = process.env.PORT || 3001
app.listen(PORT), () => {
    console.log(`corriendo en puerto: ${PORT}`)
}