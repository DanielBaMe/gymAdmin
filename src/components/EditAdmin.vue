<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="card">
                    <article class="login-form">
                        <h4 class="card-title text-center mb-4 mt-1">Editar información</h4>
                        <hr>
                        <p class="text-success text-center">Edita y guarda tu información de contacto</p>
                        <form @submit.prevent="editInfo" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login">
                            <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Email or login" type="email">
                            </div> <!-- input-group.// -->
                            </div> <!-- form-group// -->
                            <div v-if="confirmacion" class="alert alert-success w-100">
                                <span>Se han editado los datos satisfactoriamente</span>
                                <br/>
                            </div>
                            <br/>
                            <error-list :errors="errors.nombre"></error-list>
                            <h3>Nombre:     {{datos.nombre}}</h3>                   
                            <input name='nombre' id='nombre' class="au-input au-input" type="text" pattern="[a-zA-Z0-9\s]+"
                            minlength="4" maxlength="20" v-model="usuario.nombre" placeholder='Editar nombre'
                            title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                            <br/>
                            <br/>
                            <error-list :errors="errors.telefono"></error-list>
                            <h3>Telefono:       {{datos.telefono}}</h3>
                            <input name='telefono' id='telefono' class="au-input au-input" type="text"
                            v-model="usuario.telefono" placeholder='Editar telefono'  pattern="[0-9]+"
                            title="Solo números">
                            <br/>
                            <br/>
                            <error-list :errors="errors.email"></error-list>
                            <h3>Correo electronico: {{datos.email}}</h3>
                            <input name='correo' id='correo' class="au-input au-input" type="email"
                            v-model="usuario.email" placeholder='Editar correo' required>
                            <br/>
                            <br/>
                            <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20 w-50">Editar</button>
                            <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20 w-50">Actualizando...</button>
                    </form>
                    </article>
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
            datos: [],
            usuario: {
                nombre: '',
                telefono: '',
                email: ''
            },
            confirmacion: false,
            errors: [],
            cargando: false
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
            this.confirmacion= false
            this.cargando = true
            axios.post('/perfil',this.usuario)
            .then( response => {
                this.cargando = false;
                this.confirmacion= true
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
            })
            this.cargando = false;
            this.errors = [];
        }
    }
};
</script>