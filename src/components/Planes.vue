<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="col-md-12 m-3">
                    <div class="table-data__tool">
                        <div class="table-data__tool-left">
                            <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                            </button>
                        </div>
                        <div class="table-data__tool-right">
                            <button class="btn btn-info btn-sm content-aling-center" @click="agregar = !agregar" v-if="agregar === false">
                                +   Nuevo servicio
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive table-responsive-data2">
                        <form @submit.prevent="editInfo" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="ml-5 mr-5">
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <label class="control-label mb-1">Nombre del plan</label>                   
                                                    <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                                    minlength="4" maxlength="20" v-model="nombre" placeholder='Editar nombre'
                                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.telefono"></error-list>
                                                    <label class="control-label mb-1">Precio</label>
                                                    <input name='precio' id='precio' class="form-control" type="number" step="0.01"
                                                    v-model="precio"
                                                    title="Solo números">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.email"></error-list>
                                                    <label class="control-label mb-1">Servicios</label>
                                                    <table>
                                                    <thead>
                                                        <tr>
                                                            <th >Nombre</th>
                                                            <th >Precio</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="tr-shadow" v-for="item of getServicios" :key="item.id">
                                                            <td>
                                                                <span>{{item.nombre}}</span>
                                                            </td>
                                                            <td>
                                                                <span class="badge badge-pill badge-dark">$ {{item.precio}}</span>
                                                            </td>
                                                            <td>
                                                                <input type="checkbox" :value="item.id" v-model="servicios">
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                    <br/>
                                                </div>
                                                <br/>
                                                    <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Editar</button>
                                                    <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20">Actualizando...</button>
                                            </form>
                                            <table>
                                                    <thead>
                                                        <tr>
                                                            <th >Nombre</th>
                                                            <th >Precio</th>
                                                            <th>Servicios</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="tr-shadow" v-for="item of datos" :key="item.id">
                                                            <td>
                                                                <span>{{item.nombre}}</span>
                                                            </td>
                                                            <td>
                                                                <span class="badge badge-pill badge-dark">$ {{item.precio}}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{item.servicios}}</span>
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
import SweetAlert from 'sweetalert2'

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
            servicios:[],
            getServicios:[],
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
        this.obtenerServicios();
    },
    filters:{
        delimitar(valor){
            if((valor.split('').length) > 20){
                return valor.slice(0,20)
            }
        }
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
        obtenerServicios(){
            console.log(this.servicios)
            axios.get('/servicios')
            .then(response => {
                this.getServicios = response.data
            }).catch(error => {
                concole.log(error)
            })
        },
        obtenerDatos(){
            axios.get('/planes-entrenamiento')
            .then(response =>
            {   
                this.datos = response.data
                console.log(response.data)
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        editInfo(){
            console.log(this.servicios)
            axios.post('/planes-entrenamiento', {
                nombre: this.nombre,
                precio: this.precio,
                servicios: this.servicios
            }).then(response =>{
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
    
};


</script>