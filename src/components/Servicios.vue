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
                        Nuevo servicio
                        </button>
                    </div>
                    <div class="login-content-center w-50" v-show="agregar">
                        <div class="login-form">
                            <form method="post" @submit="addService">
                                <error-list :errors="errors.nombre"></error-list>
                                <div class="form-group">
                                    <label>Nombre del servicio: </label>
                                <input type="text" name="servicio" id="servicio" class="au-input au-input" v-model="nombre">
                                </div>
                                <div class="form-group">
                                    <label>Precio del servicio: </label>
                                <input type="number" step="0.01" name="precio" id="precio" class="au-input au-input" v-model="precio">
                                </div>
                                <div class="form-group">
                                    <error-list :errors="errors.descripcion"></error-list>
                                    <label>Descripcion del servicio: </label>
                                    <input type="text" name="descripcion" id="descripcion" class="au-input au-input" v-model="descripcion">
                                </div>
                                <div>
                                    <button class="au-btn au-btn--block au-btn--green m-b-20 w-50" v-if="!cargando" type="submit" @click.prevent="addService">
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
                                <th>Precio</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of datos" :key="item.id">
                                <td>{{item.nombre}}</td>
                                <td>{{item.precio}}</td>
                                <td>{{item.descripcion}}</td>
                                <router-link :to="'/edit-servicio/' + item.id" class="btn btn-info btn-lg">
                                    <span class="glyphicon glyphicon-pencil" title="Editar"></span> 
                                </router-link>
                                &nbsp &nbsp
                                <button class="btn btn-danger btn-lg" type="submit" @click.prevent="deleteServicio(item)">
                                    <span class="glyphicon glyphicon-minus" title="Eliminar"></span>
                                </button>
                            </tr>
                        </tbody>
                    </table>
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
            hecho: false,
            cargando: false,
            er: false
        };
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
            axios.get('/servicios')
            .then((response) =>
            {   

                this.datos = response.data;

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
                this.hecho = true;
                this.agregar = false;
                obtenerDatos();
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
            this.nombre = '';
            this.precio = '';
            this.descripcion = '';
            this.errors = '';
        },
        deleteServicio(item){
            axios.delete('/servicios/'+ item.id)
            .then( response => {
                console.log(response)
                obtenerDatos();
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>