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
                            Nuevo servicio
                            </button>
                            <br/>
                            <br/>
                    </div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
                    <div class="login-content justify-content-around ml-5 mr-5">
                                <div v-show="agregar">
                                    <form method="post" @submit="addService" class="border border-info">
                                        <div class="row">
                                            <div class="col"></div>
                                            <div class="col">
                                                <div>
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <div>
                                                        <div class="form-group text-center">
                                                            <label>Nombre del servicio </label>
                                                            <input type="text" name="servicio" id="servicio" class="form-control" v-model="nombre">
                                                        </div>
                                                        <div class="form-group text-center">
                                                            <error-list :errors="errors.precio"></error-list>
                                                            <label>Precio del servicio </label>
                                                        <input type="number" step="0.01" name="precio" id="precio" class="form-control" v-model="precio">
                                                        </div>
                                                        <div class="form-group text-center">
                                                            <error-list :errors="errors.descripcion"></error-list>
                                                            <label>Descripcion del servicio </label>
                                                            <input type="text" name="descripcion" id="descripcion" class="form-control" v-model="descripcion">
                                                        </div>
                                                        
                                                        
                                                        <div class="row">
                                                            <div class="col"></div>
                                                            <div class="w-50 col h-25">
                                                                <button class="au-btn au-btn--block au-btn--green m-b-20 text-center" v-if="!cargando" type="submit" @click.prevent="addService">
                                                                <span class="glyphicon glyphicon-plus"></span></button>
                                                                <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                                            </div>
                                                            <div class="col"></div>
                                                            
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col"></div>
                                        </div>
                                    </form>
                                </div>
                                <table class="table table-bordered table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Nombre</th>
                                            <th class="text-center">Precio</th>
                                            <th class="text-center">Descripcion</th>
                                            <th class="text-center text-primary">Editar</th>
                                            <th class="text-center text-danger">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item of datos" :key="item.id">
                                            <td>{{item.nombre}}</td>
                                            <td>{{item.precio}}</td>
                                            <td>{{item.descripcion}}</td>
                                            <td>
                                                <router-link :to="'/edit-servicio/' + item.id" class="btn btn-info btn-lg">
                                                    <span class="glyphicon glyphicon-pencil"></span> 
                                                </router-link>
                                            </td>
                                            
                                            <td>
                                                <button class="btn btn-danger btn-lg" type="submit" @click.prevent="deleteServicio(item)">
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
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import SweetAlert from 'sweetalert2'
// import func from '../../vue-temp/vue-editor-bridge';

export default {
    name: 'Servicios',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            nombre:'',
            precio:'',
            descripcion:'',
            datos: [],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            cargando: false,
            er: false
        };
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
        idGym(){
            axios.get('perfil')
            .then((response) => {
                this.ide = response.data.gimnasio.id;
            }).catch(function (error) {
                console.log(error);
            })
        },
        obtenerDatos(){
            axios.get('/servicios')
            .then((response) =>
            {   
                this.datos = response.data;
                console.log(this.datos)
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        addService(){
            axios.post('/servicios',
            {
                nombre: this.nombre,
                precio: this.precio,
                descripcion: this.descripcion,
                id_gimnasio: this.ide
            })
            .then( response => {
                console.log(response)
                this.cargando = false;
                this.errors = [];
                this.agregar = false;
                this.nombre = ''
                this.precio = ''
                this.descripcion = ''
                SweetAlert.fire(
                'Correcto',
                'Se ha agregado un servicio exitosamente',
                'success'
            )
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
                this.cargando = false;
            
            })
            this.errors= []
        },
        deleteServicio(item){
            axios.delete('/servicios/'+ item.id)
            .then( response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>