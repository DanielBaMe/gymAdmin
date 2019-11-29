<template>
<div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-container">
        <HeaderDesktop/>
        <div class="main-content">
            <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3">
                                <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                                <!-- <span class="text-center">  Atrás</span> -->
                                </button>
                            </div>
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h3>{{servicio.nombre}}</h3></div>
                                        <div class="card-body">
                                            <form @submit.prevent="formSubmit" method="post" class="ml-5 mr-5">
                                                    <div v-if="er" class="alert alert-danger w-100">
                                                        {{ error_message}}
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.nombre"></error-list>
                                                        <label class="control-label mb-1">Nombre</label> 
                                                        <input name='nombre' id='nombre' class="form-control" type="text"
                                                        pattern="[a-zA-Z0-9\s]+" title="Solo números y letras."
                                                        v-model="plan.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                                        <br/>  
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.precio"></error-list>
                                                        <label class="control-label mb-1">Precio</label>  
                                                        <input name='precio' id='precio' class="form-control" type="number" step="0.01"
                                                        v-model="plan.precio"  :disabled="validated"> 
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.descripcion"></error-list>
                                                        <label class="control-label mb-1">Servicios</label>    
                                                        <!-- <textarea v-model="plan.servicios" type="text" name='descripcion'
                                                        id='descripcion' class="form-control"
                                                        rows="5" cols="50" pattern="[a-zA-Z0-9\s]+"  :disabled="validated"></textarea> -->
                                                        <table v-if="validated">
                                                            <thead>
                                                                <tr>
                                                                    <th>Nombre del plan</th>
                                                                    <th>Precio</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item of servicios" :key="item.id">
                                                                    <td>{{item.nombre}}</td>
                                                                    <td>$ {{item.precio}}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div v-else>
                                                            <div v-if="numServicios > 5" class="row align-items-start mr-5 ml-5">
                                                                <div class="col-md-12">
                                                                    <div class="card">
                                                                        <div class="card-header">
                                                                            <h4>Datos del nuevo plan</h4></div>
                                                                            <div class="card-body card-block">
                                                                                    <div class="form-group">
                                                                                        <error-list :errors="errors.email"></error-list>
                                                                                        <label class="control-label mb-1">Servicios</label>
                                                                                        <div class="row justify-content-around">
                                                                                            <div class="col">
                                                                                                <table class="table table-borderless table-data3">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th class="text-center">Nombre</th>
                                                                                                            <th class="text-center">Precio</th>
                                                                                                            <th class="text-center">Agregar</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr class="tr-shadow" v-for="item of serviciosUno" :key="item.id">
                                                                                                            <td class="text-center">
                                                                                                                <span>{{item.nombre}}</span>
                                                                                                            </td>
                                                                                                            <td class="text-center">
                                                                                                                <span class="badge badge-pill badge-info">$ {{item.precio}}</span>
                                                                                                            </td>
                                                                                                            <td class="text-center">
                                                                                                                <input type="checkbox" :value="item.id" v-model="servicios">
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                            <div class="col">
                                                                                                <table class="table table-borderless table-data3">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th class="text-center">Nombre</th>
                                                                                                            <th class="text-center">Precio</th>
                                                                                                            <th class="text-center">Agregar</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr class="tr-shadow" v-for="item of serviciosDos" :key="item.id">
                                                                                                            <td class="text-center">
                                                                                                                <span>{{item.nombre}}</span>
                                                                                                            </td>
                                                                                                            <td class="text-center">
                                                                                                                <span class="badge badge-pill badge-info">$ {{item.precio}}</span>
                                                                                                            </td>
                                                                                                            <td class="text-center">
                                                                                                                <input type="checkbox" :value="item.id" v-model="servicios">
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br/>
                                                                                    </div>
                                                                                        <br/>
                                                                                    <div class="row">
                                                                                        <div class="col-auto mr-auto">
                                                                                            <button class="au-btn au-btn--block au-btn--green m-b-20 text-center" v-if="!cargando" type="submit">
                                                                                            <span>Agregar</span></button>
                                                                                            <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20 w-50">Agregando...</button>
                                                                                        </div>
                                                                                        <div class="col-auto">
                                                                                            <span v-show="agregar" title="Cancelar" @click="agregar = !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-lg content-aling-center">X</span>
                                                                                        </div>
                                                                                    </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                            <div v-else class="row align-items-start">
                                                                <div class="form-group">
                                                                    <error-list :errors="errors.email"></error-list>
                                                                    <label class="control-label mb-1">Servicios</label>
                                                                    <table class="table table-borderless table-data3">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-center">Nombre</th>
                                                                            <th class="text-center">Precio</th>
                                                                            <th class="text-center">Agregar</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr class="tr-shadow" v-for="item of getServicios" :key="item.id">
                                                                            <td class="text-center">
                                                                                <span>{{item.nombre}}</span>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <span class="badge badge-pill badge-info">$ {{item.precio}}</span>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <input type="checkbox" :value="item.id" v-model="servicios">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                    </table>
                                                                    <br/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                    </div>
                                                <br/>
                                                    <span v-if="validated" @click="validated = !validated" class="btn btn-success m-b-20 w-100">Habilitar edición</span>
                                                    <button v-else type="submit" class="btn btn-primary m-b-20 w-100">Editar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            plan:[],
            servicios: [],
            numServicios: '',
            numberServices: '',
            getServicios: ''
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
        obtenerServicios(){
            axios.get('/servicios')
            .then(response => {
                this.getServicios = response.data
                this.numberServices = Object.keys(this.getServicios).length
                this.dividirServicios = this.numServicios / 2

                for (let index = 0; index < this.dividirServicios; index++) {
                    this.serviciosUno[index] = this.getServicios[index]
                }
                let x = 0
                for (let i = this.dividirServicios; i < this.numServicios; i++) {
                    this.serviciosDos[i-dividirServicios] = this.getServicios[i]
                }
                console.log(this.serviciosUno)
                console.log(this.serviciosDos)
            })
        },
        obtenerDatos(){
            this.ide = this.$route.params.id;
            axios.get('/planes-entrenamiento/' + this.ide)
            .then((response) =>
            {  
                this.plan = response.data;
                this.numServicios = plan.servicios;
                for(let i = 0; i < numServicios.length; i++){
                    this.servicios[i] = numServicios[i]
                }         
            }).catch(function (error){
                this.er = true
            })
        },
        formSubmit(){
            axios.put('/plan-entrenamiento/'+ this.ide, this.plan)
            .then(response => {
                console.log(response)
                this.errors= []
                this.loading = false;
                Swal.fire({ 
                    title: 'Se ha editado el servicio exitosamente',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        this.$router.push('/planes');
                    }
                })           
            }).catch(error => {
                console.log(error)
                this.errors = (error.response.data.errors)
                this.loading = false;
            })
            this.errors=[];
            this.loading = false;
            }
    }
}
</script>