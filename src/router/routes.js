import Login from '../components/Login.vue'
import Password from '../components/Password.vue'
import Reset from '../components/Reset.vue'
import Error404 from '../components/Error404.vue'
import Servicios from '../components/Servicios.vue'
import EditAdmin from '../components/EditAdmin.vue'
import CambiarContraseña from '../components/CambiarContraseña.vue'

import Home from '../components/Home.vue'

import store from '../store';

const routes = [
    {   
        
        path: '/',
        name: 'Home',
        component: Home,
        meta : {
            title: 'Home',
            requiresAuth: true
        }
    },
    {
        path: '/servicios',
        name: 'Servicios',
        component: Servicios,
        meta: {
            title: 'Servicios',
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta : {
            title: 'Login',
            requiresAuth: false
        }
    },
    {
        path: '/password-request',
        name: 'p-reset',
        component: Password,
        meta : {
            title: 'Password reset',
            requiresAuth: false
        }
    },
        {
        path: '/password-reset/:token',
        name: 'reset-password',
        component: Reset,
        meta : {
            title: 'Password reset',
            requiresAuth: false
        },
        props: true
    },
    {
        path: '*',
        name: 'Error404',
        component: Error404,
        meta : {
            title: 'Error 404',
            requiresAuth: false
        }
    },
    {
        path: '/edit-info',
        name: 'Edit-Admin',
        component: EditAdmin,
        meta : {
            title: 'Edit-info',
            requiresAuth: true
        }
    },
    {
        path: '/edit-password',
        name: 'EditPassword',
        component: CambiarContraseña,
        meta : {
            title: 'Edit-Password',
            requiresAuth: true
        }
    }
];

export default routes;