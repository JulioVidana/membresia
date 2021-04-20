import { v4 as uuid } from 'uuid';

export const usuariosPrueba = [
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

export const roles = [
    {
        _id: 'superadmin',
        rol: 'Super Administrador'
    },
    {
        _id: 'admin',
        rol: 'Admin'
    },
    {
        _id: 'editor',
        rol: 'Editor'
    },
    {
        _id: 'consulta',
        rol: 'Consulta'
    }
]