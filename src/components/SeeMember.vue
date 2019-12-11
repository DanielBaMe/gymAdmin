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
                            </button>
                        </div>
                        <div v-if="!loading" class="card">
                            <div class="card-header">
                                <h3>{{miembro.nombre}}</h3>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="formSubmit" method="post" class="ml-5 mr-5">
                                    <div class="row justify-content-around">
                                        <div class="col-md-6">
                                            <div v-if="er" class="alert alert-danger w-100">
                                                {{ error_message}}
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.nombre"></error-list>
                                                <label class="control-label mb-1">Nombre</label> 
                                                <input name='nombre' id='nombre' class="form-control" type="text"
                                                pattern="[a-zA-Z\s]+" title="Solo letras."
                                                v-model="miembro.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                                <br/>  
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.precio"></error-list>
                                                <label class="control-label mb-1">Apellidos</label>  
                                                <input name='precio' id='precio' class="form-control" type="text" step="0.01"
                                                v-model="miembro.apellidos"  :disabled="validated"> 
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.precio"></error-list>
                                                <label class="control-label mb-1">Telefono</label>  
                                                <input name='precio' id='precio' class="form-control" type="number" step="0.01"
                                                v-model="miembro.telefono"  :disabled="validated"> 
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.precio"></error-list>
                                                <label class="control-label mb-1">Tel. emergencia</label>  
                                                <input name='precio' id='precio' class="form-control" type="number" step="0.01"
                                                v-model="miembro.telefono_emergencia"  :disabled="validated"> 
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.precio"></error-list>
                                                <label class="control-label mb-1">Email</label>  
                                                <input name='email' id='email' class="form-control" type="text"
                                                v-model="miembro.email"  :disabled="validated"> 
                                                <br/>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Condicion fisica</label>    
                                                <textarea type="text" name="condicion_fisica" id="condicion_fisica" pattern="[0-9]+" minlength="4"
                                                class="form-control" v-model="miembro.condicion_fisica" :disabled="validated"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Plan de entrenamiento</label> 
                                                <input name='id_plan_entrenamiento' id='id_plan_entrenamiento' class="form-control" type="text"
                                                v-model="this.nombrePlan"  :disabled="validated">    
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Servicios dentro del plan</label>    
                                                <ul v-if="!pe">
                                                    <li v-for="item of serviciosPlan" :key="item.id">
                                                        {{item.nombre}}
                                                    </li>
                                                </ul>
                                                <ul v-else>
                                                    <li :value="this.serviciosPlan">
                                                        {{this.serviciosPlan}}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Plan de alimentación</label>  
                                                <input name='id_plan_alimentacion' id='id_plan_alimentacion' class="form-control" type="text"
                                                v-model="pa"  :disabled="validated"> 
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Rutinas</label>    
                                                <ul v-if="!rtns">
                                                    <li v-for="item of rutinas" :key="item.id">
                                                        {{item.nombre}}
                                                    </li>
                                                </ul>
                                                <ul v-else>
                                                    <li>
                                                        ninguno
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Servicios</label>    
                                                <ul>
                                                    <li v-for="item of servicios" :key="item.id">
                                                        {{item.nombre}}         {{item.precio}}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Fecha de nacimiento</label>    
                                                <input name='fecha_nacimiento' id='fecha_nacimiento' class="form-control" type="date"
                                                v-model="miembro.fecha_nacimiento"  :disabled="validated"> 
                                            
                                            </div>
                                        </div>
                                    <br/>
                                        <!-- <span v-if="validated" @click="validated = !validated" class="btn btn-success m-b-20 w-100">Habilitar edición</span>
                                        <button v-else type="submit" class="btn btn-primary m-b-20 w-100">Editar</button> -->
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div v-else >
                            <i class="fas fa-spinner fa-spin" style="width:20; height:20;"></i>
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
        'error-list': ErrorsList
    },
    data(){
        return{
            miembro: [],
            er: '',
            validated: true,
            error_message: '',
            errors: [],
            serviciosPlan: [],
            nombrePlan: '',
            servicios: [],
            rutinas : [],
            loading: false,
            pe: false,
            rtns: false,
            pa: '',
            rutins: ''
        }
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
        obtenerDatos(){
            //this.loading = true
            this.ide = this.$route.params.id;
            axios.get('/miembros/' + this.ide)
            .then((response) =>
            {  
                this.miembro = response.data;
                this.servicios = response.data.servicios
                 console.log(this.miembro)
                this.rutinas = this.miembro.rutinas
                for (let index = 0; index < this.rutinas.length; index++) {
                    if(this.rutinas[index] == null){
                        this.rutins = 'ninguno'
                        this.rtns = true
                        break;
                    }
                    
                }
                if(this.miembro.plan_entrenamiento == null){
                    this.pe = true
                    this.nombrePlan = 'ninguno'
                    this.serviciosPlan = 'ninguno'
                } else {
                    this.pe = false
                    this.serviciosPlan = this.miembro.plan_entrenamiento["servicios"]
                    this.nombrePlan = this.miembro.plan_entrenamiento["nombre"]
                }

                if(this.miembro.plan_alimentacion == null){
                    this.pa = 'ninguno'
                } else {
                    this.pa = this.miembro.plan_alimentacion
                }
                //this.loading = false
                //console.log(this.miembro)
            }).catch(error => {
                //this.loading = false
                console.log('Error:'+  error)
                //this.er = true;
            })
        }
    }

}
</script>