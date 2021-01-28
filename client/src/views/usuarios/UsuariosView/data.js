import { v4 as uuid } from 'uuid';

export default [
    {
        _id: uuid(),
        nombre: "Julio Vidana",
        email: "juliov@gmail.com",
        rol: 1,
        empresa: "VidMaster",
        password: uuid()
    },
    {
        _id: uuid(),
        nombre: "Cesar Garcia",
        email: "cesar@gmail.com",
        rol: 2,
        empresa: "Facebook",
        password: uuid()
    },
    {
        _id: uuid(),
        nombre: "Maria Perez",
        email: "maria.perez@gmail.com",
        rol: 3,
        empresa: "Google",
        password: uuid()
    }
]