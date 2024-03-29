import {
    BarChart as BarChartIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon,
    Home,
    List as ListIcon,
    FileText as FileIcon,
    Sliders as SlidersIcon,
    Settings as SettingsIcon,
} from 'react-feather'


export const navItems = [
    {
        _id: 1,
        grupo: 'ADMINISTRACIÓN',
        icon: SettingsIcon,
        items: [
            {
                href: '/app/usuarios',
                icon: UserPlusIcon,
                title: 'Usuarios'
            },
            {
                href: '/app/iglesias',
                icon: Home,
                title: 'Iglesias',
            }
        ],
        allowedRoles: ['superadmin']
    },
    {
        _id: 2,
        grupo: 'PERSONAS',
        icon: UsersIcon,
        items: [
            {
                href: '/app/personas',
                icon: UsersIcon,
                title: 'Lista de Personas',
            },
            {
                href: '/app/notasglobal',
                icon: FileIcon,
                title: 'Notas de Personas'
            }
        ],
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']

    },
    {
        _id: 3,
        grupo: 'AJUSTES',
        icon: SlidersIcon,
        items: [
            {
                href: '/app/catalogos',
                icon: ListIcon,
                title: 'Catálogos',
            }
        ],
        allowedRoles: ['superadmin', 'admin', 'editor']

    }

]


export const botonesItems = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/usuarios',
        icon: UserPlusIcon,
        title: 'Usuarios',
        allowedRoles: ['superadmin']
    },
    {
        href: '/app/iglesias',
        icon: Home,
        title: 'Iglesias',
        allowedRoles: ['superadmin']
    },
    {
        href: '/app/personas',
        icon: UsersIcon,
        title: 'Personas',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/notasglobal',
        icon: FileIcon,
        title: 'Notas de Personas',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    },
    {
        href: '/app/catalogos',
        icon: ListIcon,
        title: 'Catálogos',
        allowedRoles: ['superadmin', 'admin', 'editor']
    }
]