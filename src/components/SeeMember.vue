<template>
<div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-container">
        <HeaderDesktop/>
        <div class="main-content">
            <div class="col-lg-3">
                <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                </button>
            </div>
            <br/>
            <div v-if="!loading" class="row w-100">
                <div class="col"></div>
                <div class="col-lg-10">
                    <div class="card">
                        <div class="card-header">
                            <h3>{{miembro.nombre}}</h3>
                        </div>
                        <div class="card-body">
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
                                        <input name='apellidos' id='apellidos' class="form-control" type="text" step="0.01"
                                        v-model="miembro.apellidos"  :disabled="validated"> 
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.precio"></error-list>
                                        <label class="control-label mb-1">Telefono</label>  
                                        <input name='telefono' id='telefono' class="form-control" type="number" step="0.01"
                                        v-model="miembro.telefono"  :disabled="validated"> 
                                        <br/>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.precio"></error-list>
                                        <label class="control-label mb-1">Tel. emergencia</label>  
                                        <input name='telefono_emergencia' id='telefono_emergencia' class="form-control" type="text"
                                        v-model="this.telefono"  :disabled="validated"> 
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
                                        class="form-control" v-model="this.condicion" :disabled="validated"></textarea>
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
                                        <span v-else>
                                            <br/>NA
                                        </span>
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
                                        <span v-else>
                                            <br/>NA
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Servicios</label>    
                                        <ul v-if="!servs">
                                            <li v-for="item of servicios" :key="item.id">
                                                {{item.nombre}}         {{item.precio}}
                                            </li>
                                        </ul>
                                        <span v-else>
                                            <br/>NA
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <error-list :errors="errors.descripcion"></error-list>
                                        <label class="control-label mb-1">Fecha de nacimiento</label>    
                                        <input name='fecha_nacimiento' id='fecha_nacimiento' class="form-control" type="date"
                                        v-model="miembro.fecha_nacimiento"  :disabled="validated"> 
                                    </div>
                                </div>
                            <br/>
                            </div>
                            <div class="form-group">
                                <label class="control-label mb-1">Pagos hechos</label>    
                                <table class="table table-data2">
                                    <thead>
                                        <tr>
                                            <th>Fecha inicio</th>
                                            <th>Fecha final</th>
                                            <th>Meses</th>
                                            <th>Monto</th>
                                            <th>Servicios</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item of pagos" :key="item.id">
                                            <td>{{item.fecha_inicio | delimitar}}</td>
                                            <td>{{item.fecha_fin | delimitar}}</td>
                                            <td>{{item.meses}}</td>
                                            <td>{{item.monto}}</td>
                                            <td> {{item.servicios}}
                                                <!-- <ul>
                                                    <li v-for="item of pagos.servicios" :key="item.id">
                                                        {{item}}
                                                    </li>
                                                </ul> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
                <div class="col"></div>
            </div>
            <div v-else >
                <i class="fas fa-spinner fa-spin" style="width:20; height:20;"></i>
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
            telefono: '',
            servs: false,
            condicion : '',
            cf: '',
            pagos : []
        }
    },
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerPagos();
    },
    filters:{
        delimitar(valor){
            if((valor.split('').length) > 11){
                return valor.slice(0,11)
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
        obtenerDatos(){
            this.loading = true
            this.ide = this.$route.params.id;
            axios.get('/miembros/' + this.ide)
            .then((response) =>
            {  
                this.loading = false
                this.miembro = response.data;
                this.servicios = response.data.ultimo_pago['servicios'];
                this.cf = this.miembro.condicion_fisica;
                if(this.miembro.telefono_emergencia == null){
                    this.telefono = 'NA'
                }else {
                    this.telefono = this.miembro.telefono_emergencia;
                }

                this.rutinas = this.miembro.rutinas;
                if(this.rutinas[0] == null){
                    this.rtns = true;
                }

                if(this.cf == null){
                    this.condicion = 'NA'
                } else {
                    this.condicion = this.cf
                }

                if(this.servicios[0] == null){
                    this.servs = true;
                }

                if(this.miembro.ultimo_pago['plan_entrenamiento'] == null){
                    this.pe = true
                    this.nombrePlan = 'NA'
                    this.serviciosPlan = 'NA'
                } else {
                    var svp = this.miembro.ultimo_pago['plan_entrenamiento']
                    this.pe = false
                    this.serviciosPlan = svp.servicios
                    this.nombrePlan = svp.nombre
                }

                if(this.miembro.id_plan_alimentacion == null){
                    this.pa = 'NA'
                } else {
                    this.pa = this.miembro.id_plan_alimentacion
                }
            }).catch(error => {
                this.loading = false
                console.log('Error:'+  error)
            })
        },
        obtenerPagos(){
            axios.get('/miembros/' + this.ide + '/pagos')
            .then(response => {
                this.pagos = response.data
                console.log(this.pagos)
            })
        }
    }

}
</script>