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
                    <div class="row">
                        <div class="col">
                            <button @click="$router.go(-1)" class="btn btn-primary ml-5 glyphicon glyphicon-arrow-left">
                                Atras
                            </button>
                        </div>
                        <div class="col"></div>
                        <div class="col">
                            <button class="btn btn-info btn-lg content-aling-center" @click="agregar = !agregar">
                                Nuevo coach
                                </button>
                                <br/>
                                <br/>
                        </div>
                        <div class="col"></div>
                        <div class="col"></div>
                    </div>
                    <div class="login-content justify-content-around ml-5 mr-5">
                        <div v-show="agregar">
                            <form method="post" @submit.prevent="addCoach" class="border border-info">
                                <div class="row justify-content-around">
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <error-list :errors="errors.nombre"></error-list>
                                            <label>Nombre del coach </label>
                                            <input type="text" name="nombre" id="nombre" class="form-control" v-model="nombre">
                                        </div>
                                        <div class="form-group">
                                            <label>Biografía </label>
                                            <textarea type="text" name="biografia" id="biografia" class="form-control" v-model="biografia"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="form-group">
                                            <error-list :errors="errors.email"></error-list>
                                            <label>Email </label>
                                            <input type="email" name="email" id="email" class="form-control" v-model="email">
                                        </div>
                                        <div class="form-group">
                                            
                                            <label>Password </label>
                                            <input type="password" name="password" id="password" class="form-control" v-model="password">
                                        </div>
                                        <div class="form-group">
                                            
                                            <label>Horarios </label>
                                            <input type="time" name="horarios" id="horarios" class="form-control" v-model="horarios">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col"></div>
                                    <div class="col">
                                        <button class="au-btn au-btn--block au-btn--green m-b-20 w-50" v-if="!cargando" type="submit">
                                        <span class="glyphicon glyphicon-plus"></span></button>
                                        <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </form>
                        </div>
                        <table class="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th class="text-center">Nombre</th>
                                <th class="text-center">Correo</th>
                                <th class="text-center">Horarios</th>
                                <th class="text-center text-primary">Editar</th>
                                <th class="text-center text-danger">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of datos" :key="item.id">
                                <td>{{item.nombre}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.horarios}}</td>
                                <td>
                                    <router-link :to="'/edit-coach/' + item.id" class="btn btn-info btn-lg">
                                        <span class="glyphicon glyphicon-pencil" title="Editar"></span> 
                                    </router-link>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-lg" type="submit" @click.prevent="deleteCoach(item)">
                                        <span class="glyphicon glyphicon-minus" title="Eliminar"></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            axios.get('/perfil')
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
                id_gimnasio: this.ide,
            })
            .then( response => {
                console.log(response)
                this.cargando = false;
                this.errors = [];
                this.hecho = true;
                this.agregar = false;
                this.nombre = ''
                this.email = ''
                this.biografia = ''
                this.password = ''
                this.horarios = ''
                this.errors = ''
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
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