<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="row">
                    <div class="col">
                        <button @click="$router.go(-1)" class="btn btn-primary ml-5 glyphicon glyphicon-arrow-left">
                        Atras
                        </button>
                    </div>
                    <div class="col"></div>
                    <div class="col">
                        <button class="btn btn-info btn-lg content-aling-center" @click="agregar = !agregar">
                            Nuevo miembro
                            </button>
                            <br/>
                            <br/>
                    </div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
                <div class="login-content justify-content-around">
                    <div v-if="hecho" class="alert alert-info w-100">
                        <span>Se ha agregado correctamente un nuevo servicio</span>
                        <br/>
                    </div>
                        <br/>
                        <br/>
                    <div v-show="agregar">
                            <form method="post" @submit="addMiembros" class="border border-info">
                                <div class="row justify-content-around">
                                    <div class="col-lg-4">
                                        <br/>
                                        <div class="form-group">
                                            <error-list :errors="errors.nombre"></error-list>
                                            <label>Nombre del miembro: </label>
                                            <input type="text" name="nombre" id="nombre" pattern="[a-zA-Z\s]+" minlength="4"
                                            class="form-control" v-model="nombre">
                                        </div>
                                        <div class="form-group">
                                            <error-list :errors="errors.apellidos"></error-list>
                                            <label>Apellidos: </label>
                                            <input type="text" name="apellidos" id="apellidos" pattern="[a-zA-Z\s]+" minlength="4"
                                            class="form-control" v-model="apellidos">
                                        </div>
                                        <div class="form-group">
                                            <error-list :errors="errors.telefono"></error-list>
                                            <label>Telefono: </label>
                                            <input type="text" name="telefono" id="telefono" pattern="[0-9]+" minlength="4"
                                            class="form-control" v-model="telefono">
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <br/>
                                        <div class="form-group">
                                            <error-list :errors="errors.email"></error-list>
                                            <label>Email: </label>
                                            <input type="text" name="email" id="email" class="form-control" pattern="[a-zA-Z0-9\s]+" minlength="4"
                                            v-model="email">
                                        </div>
                                        <div class="form-group">
                                            <error-list :errors="errors.fecha_nacimiento"></error-list>
                                            <label>Fecha de nacimiento: </label>
                                            <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control" v-model="fecha_nacimiento">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col"></div>
                                    <div class="col"></div>
                                    <div class="col">
                                        <button class="au-btn au-btn--block au-btn--green m-b-20 w-50" v-if="!cargando" type="submit" @click.prevent="addMiembros">
                                            <span class="glyphicon glyphicon-plus" title="Agregar"></span></button>
                                        <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                    </div>
                                    <div class="col"></div>
                                    <div class="col"></div>
                                </div>
                            </form>
                    </div>
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th class="text-center">Nombre</th>
                                <th class="text-center">Apellidos</th>
                                <th class="text-center">Telefono</th>
                                <th class="text-center">Telefono emergencia</th>
                                <th class="text-center">Cond. Fisica</th>
                                <th class="text-center">Servicios</th>
                                <th class="text-center text-primary">Editar</th>
                                <th class="text-center text-danger">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of datos" :key="item.id">
                                <td>{{item.nombre}}</td>
                                <td>{{item.apellidos}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.telefono_emergencia}}</td>
                                <td>{{item.condicion_fisica}}</td>
                                <td>{{item.servicios}}</td>
                                <td>
                                    <router-link :to="'/edit-miembro/' + item.id" class="btn btn-info btn-lg">
                                        <span class="glyphicon glyphicon-pencil"></span> 
                                    </router-link>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-lg" type="submit" @click.prevent="deleteMiembros(item)">
                                        <span class="glyphicon glyphicon-minus"></span>
                                    </button>
                                </td>
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
            datos : [],
            agregar: false,
            cargando: false,
            errors: [],
            hecho: false,
            nombre: '',
            apellidos: '',
            telefono :'',
            fecha_nacimiento: '',
            email: ''
        }
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
    },
    updated(){
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
            axios.get('/miembros')
            .then((response) =>
            {   
                this.datos = response.data
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        addMiembros(){
            axios.post('/miembros', {
                nombre: this.nombre,
                apellidos: this.apellidos,
                telefono: this.telefono,
                fecha_nacimiento : this.fecha_nacimiento,
                email : this.email
            }).then(response => {
                console.log(response)
                this.cargando = false;
                this.errors = [];
                this.hecho = true;
                this.agregar = false;
                this.nombre = ''
                this.apellidos = ''
                this.telefono = ''
                this.fecha_nacimiento = ''
                this.email = ''
            }).catch(error => {
                this.errors = (error.response.data.errors)
                console.log(error)
            })
            this.errors = []
        },
        deleteMiembros(item){
            axios.delete('/miembros/'+ item.id)
            .then( response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
};
</script>