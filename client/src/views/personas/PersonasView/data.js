import { v4 as uuid } from 'uuid';

export default [
    {
        _id: uuid(),
        address: {
            country: 'USA',
            colonia: 'Olivares',
            ciudad: 'Hermosillo',
            calle: '2849 Fulton Street',
            cp: 81314
        },
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        nombre: 'Eleazar Tankova Gutierrez',
        phone: '304-428-3097',
        eCivil: 'Casado',
        genero: 'Hombre',
        edad: '36',
        nacimiento: '1984-03-15',
        oficio: 'Administrador',
        education: 'Superior',
        familia: {
            _id: 1,
            familia: 'Tankova Gonzales',
            integrantes: [
                {
                    _id: 1,
                    nombre: 'María Gonzalez Perez',
                    avatarUrl: '/static/images/avatars/avatar_6.png'
                },
                {
                    _id: 2,
                    nombre: 'Eleazar Tankova Gutierrez',
                    avatarUrl: '/static/images/avatars/avatar_3.png'
                }
            ]
        }
    },
    {
        _id: uuid(),
        address: {
            country: 'USA',
            colonia: 'Modelo',
            ciudad: 'Iowa',
            calle: '1865  Pleasant Hill Road',
            cp: 11887
        },
        avatarUrl: '/static/images/avatars/avatar_4.png',
        createdAt: 1555016400000,
        email: 'cao.yu@devias.io',
        nombre: 'Bruce Parquer',
        phone: '712-351-5711',
        eCivil: 'Viudo',
        genero: 'Hombre',
        edad: '76',
        nacimiento: '1944-05-11',
        oficio: 'Carpintero',
        education: 'Media superior',
        familia: {}
    },
    {
        _id: uuid(),
        address: {
            country: 'USA',
            colonia: 'San Benito',
            ciudad: 'Atlanta',
            calle: '4894  Lakeland Park Drive',
            cp: 83443
        },
        avatarUrl: '/static/images/avatars/avatar_2.png',
        createdAt: 1555016400000,
        email: 'alexa.richardson@devias.io',
        nombre: 'Alexa Richardson',
        phone: '770-635-2682',
        eCivil: 'Soltero',
        genero: 'Mujer',
        edad: '29',
        nacimiento: '1991-08-12',
        oficio: 'Hogar',
        education: 'Superior',
        familia: {}
    },
    {
        _id: uuid(),
        address: {
            country: 'USA',
            colonia: 'Ohio',
            ciudad: 'Dover',
            calle: '4158  Hedge Street',
            cp: 81314
        },
        avatarUrl: '/static/images/avatars/avatar_5.png',
        createdAt: 1554930000000,
        email: 'anje.keizer@devias.io',
        nombre: 'Luis García Valenzuela',
        phone: '908-691-3242',
        eCivil: 'Soltero',
        genero: 'Hombre',
        edad: '18',
        nacimiento: '2002-03-05',
        oficio: 'Vendedor de productos',
        education: 'Media superior',
        familia: {}
    },
    {
        _id: uuid(),
        address: {
            country: 'USA',
            colonia: 'Privadas del Bosque',
            ciudad: 'Dallas',
            calle: 'Circuito del Roble 125',
            cp: 83117
        },
        avatarUrl: '/static/images/avatars/avatar_6.png',
        createdAt: 1554757200000,
        email: 'clarke.gillebert@devias.io',
        nombre: 'María Gonzalez Perez',
        phone: '972-333-4106',
        eCivil: 'Casado',
        genero: 'Mujer',
        edad: '32',
        nacimiento: '1988-10-23',
        oficio: 'Marketing',
        education: 'Superior',
        familia: {
            _id: 1,
            familia: 'Tankova Gonzales',
            integrantes: [
                {
                    _id: 1,
                    nombre: 'María Gonzalez Perez',
                    avatarUrl: '/static/images/avatars/avatar_6.png'
                },
                {
                    _id: 2,
                    nombre: 'Eleazar Tankova Gutierrez',
                    avatarUrl: '/static/images/avatars/avatar_3.png'
                }
            ]
        }
    },
    {
        _id: uuid(),
        address: {
            country: 'USA',
            colonia: 'Centro',
            ciudad: 'Dallas',
            calle: 'Reforma 255',
            cp: 83314
        },
        avatarUrl: '',
        createdAt: 1554757200000,
        email: 'clarke.gillebert@devias.io',
        nombre: 'Julio Cesar Vidaña Garcia',
        phone: '972-333-4106',
        eCivil: 'Casado',
        genero: 'Hombre',
        edad: '33',
        nacimiento: '1987-05-10',
        oficio: 'Programador Web',
        education: 'Superior',
        familia: {}
    }
];
