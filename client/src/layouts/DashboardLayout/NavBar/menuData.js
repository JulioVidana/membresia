import {
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon,
    Home,
    List as ListIcon,
    FileText as FileIcon
} from 'react-feather'


export const navItems = [
    {
        _id: 1,
        grupo: 'ADMINISTRACIÓN',
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
        grupo: 'PLANTILLA',
        items: [
            {
                href: '/app/customers',
                icon: ListIcon,
                title: 'Customers'
            },
            {
                href: '/app/products',
                icon: ShoppingBagIcon,
                title: 'Products'
            },
            {
                href: '/app/settings',
                icon: SettingsIcon,
                title: 'Settings'
            },
            {
                href: '/login',
                icon: LockIcon,
                title: 'Login'
            }
        ],
        allowedRoles: ['superadmin']
    }

]


export const items2 = [
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
        href: '/app/customers',
        icon: ListIcon,
        title: 'Customers',
        allowedRoles: ['superadmin']
    },
    {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Products',
        allowedRoles: ['superadmin']
    },
    {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings',
        allowedRoles: ['superadmin']
    },
    {
        href: '/login',
        icon: LockIcon,
        title: 'Login',
        allowedRoles: ['superadmin', 'admin', 'editor', 'consulta']
    }
]