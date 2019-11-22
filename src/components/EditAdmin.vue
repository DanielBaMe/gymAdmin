<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="row justify-content-around">
                    <div class="col-md-4 border border-info rounded">
                        <h2>Editar información</h2>
                        <form @submit.prevent="editInfo" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="justify-content-md-center">
                                <div v-if="confirmacion" class="alert alert-success w-100">
                                    <span>Se han editado los datos satisfactoriamente</span>
                                </div>
                                <div class="form-group">
                                    <br/>
                                    <error-list :errors="errors.nombre"></error-list>
                                    <h4 class="text-center">Nombre del gimnasio</h4>                   
                                    <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                    minlength="4" maxlength="20" v-model="usuario.nombre" placeholder='Editar nombre'
                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                    <br/>
                                </div>
                                <div class="form-group">
                                    <br/>
                                    <error-list :errors="errors.telefono"></error-list>
                                    <h4 class="text-center">Telefono       </h4>
                                    <input name='telefono' id='telefono' class="form-control" type="text"
                                    v-model="usuario.telefono" placeholder='Editar telefono'  pattern="[0-9]+"
                                    title="Solo números">
                                    <br/>
                                </div>
                                <div class="form-group">
                                    <br/>
                                    <error-list :errors="errors.email"></error-list>
                                    <h4 class="text-center">Correo electronico</h4>
                                    <input name='correo' id='correo' class="form-control" type="email"
                                    v-model="usuario.email" placeholder='Editar correo' required>
                                    <br/>
                                </div>
                                <br/>
                                    <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Editar</button>
                                    <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20">Actualizando...</button>
                        </form>
                    </div>
                    <div class="col-md-4 border border-info rounded">
                        <h2>Cambiar contraseña</h2>
                        <form @submit.prevent="editPass" method="post" action="/password/update" class="justify-content-md-center">
                                <div v-if="hecho" class="alert alert-success w-100">
                                    <span>Se ha cambiado correctamente la nueva contraseña</span>
                                </div>
                                <div class="form-group">
                                    <br/>
                                    <div v-if="er" class="alert alert-danger w-100">
                                        {{ error_message }}
                                        <br/>
                                    </div>
                                    <h4>Contraseña actual</h4>
                                    <input class="form-control" type="password" v-model="current_password" placeholder="Password actual">
                                    <br/>
                                </div>
                                <div class="form-group">
                                    <br/>
                                    <error-list :errors="errors.password"></error-list>
                                    <h4>Contraseña nueva</h4>
                                    <input class="form-control" type="password" v-model="password" placeholder="Nuevo password">
                                    <br/>
                                </div>
                                <div class="form-group">
                                    <br/>
                                    <h4>Confirmar cont.</h4>
                                    <input class="form-control" type="password" v-model="confirm" placeholder="Confirmar password">
                                    <br/>
                                </div>
                                <br/>
                                <button v-if="!loading" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Cambiar</button>
                                <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20">Actualizando...</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import HeaderMobile from './HeaderMobile'
import MenuSidebar from './MenuSidebar'
import HeaderDesktop from './HeaderDesktop'
import ErrorsList from './ErrorsList.vue'
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Edit-info',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            usuario: {
                nombre: '',
                telefono: '',
                email: ''
            },
            confirmacion: false,
            errors: [],
            cargando: false,
            current_password: '',
            password: '',
            confirm: '',
            hecho: false,
            er: false,
            error_message: '',
            loading: false
        };
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
    },
    mounted(){
        this.obtenerDatos();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        obtenerDatos(){
            axios.get('/perfil')
            .then((response) =>
            {   
                this.usuario = response.data.gimnasio
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        editInfo(){
            this.cargando = true;
            axios.post('/perfil',this.usuario)
            .then( response => {
                this.cargando = false;
                this.errors = [];
                this.confirmacion= true;
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
            })
            this.cargando = false;
            this.errors = [];
        },
        editPass(){
            this.loading = true;
            axios.post('/password/update', {
                current_password: this.current_password,
                password: this.password,
                password_confirmation: this.confirm
            })
            .then(response => {
                this.loading = false;
                this.errors = [];
                this.hecho = true;
                this.password = '';
                this.confirm = '';
                this.current_password = '';
            })
            .catch( error => {
                this.loading = false;
                if (!error.response.data.errors.current_password) {
                    this.errors = (error.response.data.errors)
                } else{
                    this.er = true
                    this.error_message = error.response.data.errors.current_password
                }
            })
            this.errors = [];
            this.er = false;
            this.error_message = '';
            this.loading = false;
        }
    }
};
</script>