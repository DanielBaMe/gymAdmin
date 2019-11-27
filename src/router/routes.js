import Login from '../components/Login.vue'
import Password from '../components/Password.vue'
import Reset from '../components/Reset.vue'
import Error404 from '../components/Error404.vue'
import Servicios from '../components/Servicios.vue'
import EditAdmin from '../components/EditAdmin.vue'
import GestionarCoaches from '../components/GestionarCoaches.vue'
import Miembros from '../components/Miembros.vue'
import EditMiembro from '../components/EditMiembro.vue'
import EditServicio from '../components/EditServicio.vue'
import VerServicio from '../components/VerServicio.vue'
import EditCoach from '../components/EditCoach.vue'

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
        path: '/gestionar-coaches',
        name:  'GestionarCoaches',
        component: GestionarCoaches,
        meta : {
            title: 'Manage-Coach',
            requiresAuth: true
        }
    },
    {
        path: '/miembros',
        name: 'Miembros',
        component: Miembros,
        meta : {
            title: 'Miembros',
            requiresAuth: true
        }
    },
    {
        path : '/edit-miembro/:id',
        name: 'EditMiembro',
        component: EditMiembro,
        meta : {
            title: 'Edit Miembro',
            requiresAuth: true
        }
    },
    { 
        path : '/edit-servicio/:id',
        name : 'EditServicio',
        component: EditServicio,
        meta : {
            title: 'Edit Servicio',
            requiresAuth : true
        }
    },
    {   path : '/ver-servicio/:id',
        name : 'VerServicio',
        component : VerServicio,
        meta : {
            title: 'Ver Servicio',
            requiresAuth: true
        }
    },
    {   
        path : '/edit-coach/:id',
        name : 'EditarCoah',
        component : EditCoach,
        meta : {
        title: 'Editar coach',
        requiresAuth: true
    }
}
];

export default routes;