import { v4 as uuid } from 'uuid';

export const usuarios = [
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
        _id: 1,
        rol: 'SuperAdmin'
    },
    {
        _id: 2,
        rol: 'Admin'
    },
    {
        _id: 3,
        rol: 'Editor'
    },
    {
        _id: 4,
        rol: 'Consulta'
    }
];