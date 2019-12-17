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
import Planes from '../components/Planes.vue'
import VerPlan from '../components/VerPlan.vue'
import EditPlan from '../components/EditPlan.vue'
import SeeMember from '../components/SeeMember.vue'
import Eventos from '../components/Eventos.vue'
import VerEvento from '../components/VerEvento.vue'
import Pagos from '../components/Pagos.vue'
import EditarEvento from '../components/EditarEvento.vue'

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
    },
    {
        path : '/planes',
        name : 'Planes',
        component : Planes,
        meta : {
            title: 'Planes de entrenamiento',
            requiresAuth: true
        }
    },
    {
        path : '/ver-plan/:id',
        name : 'Ver plan',
        component : VerPlan,
        meta : {
            title: 'Ver plan',
            requiresAuth: true
        }
    },
    {
        path : '/edit-plan/:id',
        name : 'Editar plan',
        component : EditPlan,
        meta : {
            title: 'Editar plan',
            requiresAuth: true
        }
    },
    {   path : '/ver-miembro/:id',
        name : 'VerMiembor',
        component : SeeMember,
        meta : {
            title: 'Ver Miembro',
            requiresAuth: true
        }
    },
    {
        path : '/eventos',
        name : 'Eventos',
        component : Eventos,
        meta : {
            title: 'Eventos',
            requiresAuth : true
        }

    },
    {
        path : '/ver-evento/:id',
        name : 'Ver evento',
        component : VerEvento,
        meta : {
            title: 'VerEvento',
            requiresAuth : true
        }

    },
    {
        path : '/pagos',
        name : 'Pagos de miembros',
        component : Pagos,
        meta : {
            title: 'Pagos',
            requiresAuth : true
        }
    },
    {
        path : '/edit-evento/:id',
        name : 'Editar evento',
        component : EditarEvento,
        meta : {
            title: 'EditEvento',
            requiresAuth : true
        }
    }
];

export default routes;