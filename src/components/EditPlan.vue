<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div v-show="agregar">
                        <div v-if="numServicios > 5" class="row align-items-start mr-5 ml-5">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Datos plan</h4></div>
                                        <div class="card-body card-block">
                                            <form @submit.prevent="addPlan" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login" class="ml-5 mr-5">
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <label class="control-label mb-1">Nombre</label>                   
                                                    <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                                    minlength="4" maxlength="20" v-model="plan.nombre" placeholder='Nombre'
                                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">
                                                    <br/>
                                                </div>
                                                <div class="form-group">
                                                    <error-list :errors="errors.telefono"></error-list>
                                                    <label class="control-label mb-1">Precio</label>
                                                    <input name='precio' id='precio' class="form-control" type="number" step="0.01" placeholder="$$$"
                                                    v-model="plan.precio"
                                                    title="Solo números">
                                                    <br/>
                                                </div>
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
                                            </form>
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
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList,
        'Swal' : SweetAlert
    },
    data(){
        return{
            getServicios:[],
            datos: [],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            cargando: false,
            er: false,
            nombreServicios: [],
            numServicios: '',
            dividirServicios: '',
            serviciosUno: [],
            serviciosDos: [],
            plan:{
                nombre:'',
                precio:'',
                servicios:[]
            }
        };
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
        this.obtenerServicios();
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
            axios.get('/servicios')
            .then(response => {
                this.getServicios = response.data
                this.numServicios = Object.keys(this.getServicios).length
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

            }).catch(error => {
                console.log(error)
            })
        },
        obtenerDatos(){
            this.ide = this.$route.params.id;
            axios.get('/plan-entrenamiento/' + this.ide)
            .then((response) =>
            {  
                this.plan = response.data;
            }).catch(function (error){
                this.er = true
            })
        }
    }
}
</script>