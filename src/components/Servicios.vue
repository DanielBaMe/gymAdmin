<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="row">
                    <div class="col">
                        <button @click="$router.go(-1)" class="btn btn-primary ml-5 glyphicon glyphicon-arrow-left" title="Atrás">
                        </button>
                    </div>
                    <div class="col"></div>
                    <div class="col">
                        <button class="btn btn-info btn-lg content-aling-center" @click="agregar = !agregar">
                            Nuevo servicio
                            </button>
                    </div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
                    <br/>
                    <br/>
                    <div v-show="agregar">
                        <div class="row align-items-start">
                            <div class="col"></div>
                            <div class="col"></div>
                                <div class="col-lg-6">
                                    <div class="card">
                                        <h4 class="card-header">Datos del nuevo servicio</h4>
                                            <div class="card-body card-block">
                                                <form method="post" @submit="addService" class="ml-5 mr-5">
                                                    <div class="form-group">
                                                        <error-list :errors="errors.nombre"></error-list>
                                                        <div class="input-group">
                                                            <div class="input-group-addon">Nombre</div>
                                                            <input type="text" name="servicio" id="servicio" class="form-control" v-model="nombre">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.precio"></error-list>
                                                        <div class="input-group">
                                                            <div class="input-group-addon">Precio</div>
                                                            <input type="number" step="0.01" name="precio" id="precio" class="form-control" v-model="precio">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.descripcion"></error-list>
                                                        <div class="input-group">
                                                            <div class="input-group-addon">Descripcion</div>
                                                            <input type="text" name="descripcion" id="descripcion" class="form-control" v-model="descripcion">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col"></div>
                                                        <div class="w-50 col h-25">
                                                            <button class="au-btn au-btn--block au-btn--green m-b-20 text-center" v-if="!cargando" type="submit" @click.prevent="addService">
                                                                <span>Agregar</span></button>
                                                            <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                                        </div>
                                                        <div class="col"></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                </div>
                                <div class="col"></div>
                            <div class="col"></div>
                        </div>
                    </div>
                        <div class="col-md-12 m-3">
                            <div class="table-responsive table-responsive-data2">
                                <table class="table table-data2">
                                    <thead>
                                        <tr>
                                            <th >Nombre</th>
                                            <th >Precio</th>
                                            <th >Descripcion</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                            <td>
                                                <span>{{item.nombre}}</span>
                                            </td>
                                            <td>
                                                <span class="badge badge-pill badge-dark">{{item.precio}}</span>
                                            </td>
                                            <td class="desc">
                                                <span>{{item.descripcion}}</span>
                                            </td>
                                            <td>
                                                <div class="table-data-feature justify-content-around">
                                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                                        <router-link :to="'/edit-servicio/' + item.id">
                                                            <span class="zmdi zmdi-edit"></span> 
                                                        </router-link>
                                                    </button>
                                                    
                                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteServicio(index,item.id)">
                                                        <span class="zmdi zmdi-delete"></span>
                                                    </button>
                                                </div>
                                            </td>
                                            <td></td>
                                            <td></td>
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
        idGym(){
            axios.get('/perfil')
            .then((response) => {
                this.ide = response.data.gimnasio.id
            }).catch(function (error) {
                console.log(error);
            })
        },
        obtenerDatos(){
            axios.get('/servicios')
            .then((response) =>
            {   
                this.datos = response.data
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
                let servicio = {
                    nombre: this.nombre,
                    precio: this.precio,
                    descripcion: this.descripcion,
                    id_gimnasio: this.ide
                }
                this.datos.unshift(servicio)
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
        deleteServicio(index,id){
            axios.delete('/servicios/'+ id)
            .then( response => {
                this.datos.splice(index, 1)
                SweetAlert.fire(
                'Correcto',
                'Se ha eliminado un servicio exitosamente',
                'success'
            )
            }).catch(error => {
            })
        }
    }
}

</script>