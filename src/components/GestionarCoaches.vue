<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div>
                    <div v-if="hecho" class="alert alert-info w-100">
                        <span>Se ha agregado correctamente un nuevo servicio</span>
                        <br/>
                        </div>
                        <br/>
                        <br/>
                    </div>
                    <div>
                        <button class="btn btn-info btn-lg" @click="agregar = !agregar">
                        Nuevo coach
                        </button>
                    </div>
                    <div class="w-50" v-show="agregar">
                        <div class="login-form">
                            <form method="post" @submit="addCoach">
                                <div class="form-group">
                                    <error-list :errors="errors.nombre"></error-list>
                                    <label>Nombre del coach: </label>
                                    <input type="text" name="nombre" id="nombre" class="au-input au-input--full" v-model="nombre">
                                </div>
                                <div class="form-group">
                                    <label>Biografía: </label>
                                    <textarea type="text" name="biografia" id="biografia" class="au-input au-input--full" v-model="biografia"></textarea>
                                </div>
                                <div class="form-group">
                                    <error-list :errors="errors.email"></error-list>
                                    <label>Email: </label>
                                    <input type="text" name="email" id="email" class="au-input au-input" v-model="email">
                                </div>
                                <div class="form-group">
                                    
                                    <label>Password: </label>
                                    <input type="password" name="password" id="password" class="au-input au-input" v-model="password">
                                </div>
                                <div class="form-group">
                                    
                                    <label>Horarios: </label>
                                    <input type="text" name="horarios" id="horarios" class="au-input au-input" v-model="horarios">
                                </div>
                                <div v-if="hecho" class="alert alert-info w-100">
                                <span>Se ha agregado correctamente un nueva servio</span>
                                <b/>
                                </div>
                                <br/>
                                <br/>
                                <div>
                                    <button class="au-btn au-btn--block au-btn--green m-b-20 w-50" v-if="!cargando" type="submit" @click.prevent="addCoach">
                                        <span class="glyphicon glyphicon-plus"></span>Agregar</button>
                                    <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Horarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of datos" :key="item.id">
                                <td>{{item.nombre}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.horarios}}</td>
                                <router-link :to="'/edit-coach/' + item.id" class="btn btn-info btn-lg">
                                    <span class="glyphicon glyphicon-pencil" title="Editar"></span> 
                                </router-link>
                                &nbsp &nbsp
                                <button class="btn btn-danger btn-lg" type="submit" @click.prevent="deleteCoach(item)">
                                    <span class="glyphicon glyphicon-minus" title="Eliminar"></span>
                                </button>
                            </tr>
                        </tbody>
                    </table>
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
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            nombre: '',
            biografia: '',
            email: '',
            password: '',
            horarios: '',
            datos : [],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            hecho: false,
            cargando: false,
            er: false
        }
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        idGym(){
            axios.get('perfil')
            .then((response) => {
                this.ide = response.data.gimnasio.id;
            }).catch(function (error) {
                console.log(error);
            })
        },
        obtenerDatos(){
            axios.get('/coaches')
            .then((response) =>
            {   
                this.datos = response.data
                console.log(response.data)
                console.log(this.datos)
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        addCoach(){
            axios.post('/coaches',
            {
                nombre: this.nombre,
                biografia: this.biografia,
                email: this.email,
                password: this.password,
                horarios: this.horarios,
                id_gimnasio: this.ide
            })
            .then( response => {
                console.log(response)
                this.cargando = false;
                this.errors = [];
                this.hecho = true;
                this.agregar = false;
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
            this.nombre = '';
            this.email = '';
            this.biografia = '';
            this.password = '';
            this.horarios = '';
            this.errors = '';
        },
        deleteCoach(item){
            axios.delete('/coaches/'+ item.id)
            .then( response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
    }
;
</script>