<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div v-show="agregar">
                    <div v-if="agregando">
                        <div class="col"> <img src="/images/descarga.png" alt=""></div>
                    </div>
                    <div class="row align-items-start" v-if="!agregando">
                        <div class="col"></div>
                        <div class="col"></div>
                            <div class="col-lg-10">
                                <div class="card">
                                    <div class="card-header">
                                        <h4>Datos del miembro</h4></div>
                                        <div class="card-body card-block">
                                            <form method="post" @submit="addMiembros" class="ml-5 mr-5">
                                                <div class="row justify-content-around">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <error-list :errors="errors.nombre"></error-list>
                                                            <div class="input-group">
                                                                <label>Nombre</label>
                                                                <input type="text" name="nombre" id="nombre" pattern="[a-zA-Z\s]+" minlength="4"
                                                                class="form-control" v-model="nombre">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.apellidos"></error-list>
                                                            <div class="input-group">
                                                                <label>Apellidos</label>
                                                                <input type="text" name="apellidos" id="apellidos" pattern="[a-zA-Z\s]+" minlength="4"
                                                                class="form-control" v-model="apellidos">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.telefono"></error-list>
                                                            <div class="input-group">
                                                                <label>Telefóno</label>
                                                                <input type="text" name="telefono" id="telefono" pattern="[0-9]+" minlength="4"
                                                                class="form-control" v-model="telefono">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.email"></error-list>
                                                            <div class="input-group">
                                                                <label>Email</label>
                                                                <input type="text" name="email" id="email" class="form-control" pattern="[a-zA-Z0-9\s]+" minlength="4"
                                                                v-model="email">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                            
                                                            <div class="input-group">
                                                                <label>Condición fisica</label>
                                                                <textarea type="text" name="cond_fisica" id="cond_fisica" pattern="[0-9]+" minlength="4"
                                                                class="form-control" v-model="cond_fisica"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <error-list :errors="errors.fecha_nacimiento"></error-list>
                                                            <div class="input-group">
                                                                <label>Fecha de nacimiento: </label>
                                                                <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control" v-model="fecha_nacimiento">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                              
                                                            <div class="input-group">
                                                                <label>Telefóno de emergencia</label>
                                                                <input type="text" name="tel_emerg" id="tel_emerg" pattern="[0-9]+" minlength="4"
                                                                class="form-control" v-model="tel_emerg">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.sexo"></error-list>
                                                            <div class="input-group">
                                                                <label>Sexo</label>
                                                                <select v-model="sexo" class="form-control h-25">
                                                                    <option v-for="item of seleccion" :key="item.id">
                                                                        {{item}}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                        
                                                            <div class="input-group">
                                                                <label>Estatura</label>
                                                                <input name="estatura" id="estatura" type="number" step="0.01"
                                                                class="form-control" v-model="estatura">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                    
                                                            <div class="input-group">
                                                                <label>Peso</label>
                                                                <input name="peso" id="peso" type="number" step="0.01"
                                                                class="form-control" v-model="peso">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.objetivo"></error-list>
                                                            <div class="input-group">
                                                                <label>Objetivo</label>
                                                                <select v-model="objetivo" class="form-control h-25">
                                                                    <option v-for="item of objetives" :key="item.id">
                                                                        {{item}}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="input-group">
                                                                        <label>Servicios</label>
                                                                        <select @change="selectServicio($event)" class="form-control h-25">
                                                                            <option selected="selected" >Seleccionar servicios</option>
                                                                            <option v-for="item of getServicios" :key='item.id' :value="item.id">{{item.nombre}}  -  ${{item.precio}}</option> 
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="input-group">
                                                                        <label>Planes</label>
                                                                        <select @change="selectPlan($event)" class="form-control h-25">
                                                                            <option selected="selected" >Seleccionar plan</option>
                                                                            <option v-for="item of getPlanes" :key='item.id' :value="item.id">{{item.nombre}}  -  ${{item.precio}}</option> 
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br/>
                                                            <div class="table-responsive table--no-card m-b-30">
                                                                <table class="table table-borderless table-striped table-earning">
                                                                    <thead>
                                                                        <tr>
                                                                            <td >Nombre</td>
                                                                            <td>Precio</td>
                                                                            <td>Quitar</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr class="tr-shadow" v-for="(item,index) of consumo" :key="item.id">
                                                                            <td>{{item.nombre}}</td>
                                                                            <td>{{item.precio}}</td>
                                                                            <td>
                                                                                
                                                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="quitarServicio(index,item.id)">
                                                                                    <span class="zmdi zmdi-delete"></span>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                        <br/>
                                                                        <label for="">Total:</label>
                                                                        <label for="">  ${{this.suma}}</label>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Nombre</td>
                                                                            <td>Descripcion</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="item of rutinas" :key="item.id">
                                                                            <td>{{item.nombre}}</td>
                                                                            <td>{{item.precio}}</td>
                                                                            <td class="text-center">
                                                                                <input type="checkbox" :value="item.id" v-model="postRutinas">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-auto mr-auto">
                                                        <button class="au-btn au-btn--block au-btn--green m-b-20 w-50" v-if="!cargando" type="submit" @click.prevent="addMiembros">
                                                            <span class="glyphicon glyphicon-plus" title="Agregar"></span></button>
                                                        <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                                    </div>
                                                    <div class="col-auto">
                                                        <span v-show="agregar" title="Cancelar" @click="agregar = !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-lg content-aling-center">X</span>
                                                    </div>
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
                    <div class="table-data__tool">
                        <div class="table-data__tool-left">
                            <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                            </button>
                        </div>
                        <div class="table-data__tool-right">
                            <button class="btn btn-info btn-sm content-aling-center" @click="agregar = !agregar" v-if="agregar === false">
                                +   Nuevo miembro
                            </button>
                        </div>
                    </div>
                    <div v-if="!loading" class="table-responsive table-responsive-data2">
                        <table class="table table-data2">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Telefono</th>
                                    <th>Telefono emergencia</th>
                                    <th>Fecha de registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                    <td><span>{{item.nombre}}</span></td>
                                    <td><span>{{item.apellidos}}</span></td>
                                    <td><span>{{item.telefono}}</span></td>
                                    <td><span>{{item.telefono_emergencia}}</span></td>
                                    <td><span>{{item.created_at}}</span></td>
                                    <td>
                                        <div class="table-data-feature justify-content-around">
                                            <router-link :to="'/ver-miembro/' + item.id">
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                                    <span class="glyphicon glyphicon-zoom-in"></span> 
                                                </button>
                                            </router-link>

                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteMiembros(index,item.id)">
                                                <span class="zmdi zmdi-delete"></span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="row align-items-center">
                        <div class="col"></div>
                        <div class="col"> <img src="/images/68042.png" class="h-50 w-50"></div>
                        <div class="col"></div>
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
            datos : [],
            agregar: false,
            cargando: false,
            errors: [],
            nombre: '',
            apellidos: '',
            telefono :'',
            fecha_nacimiento: '',
            email: '',
            cond_fisica: '',
            servicios: '',
            tel_emerg: '',
            sexo: '',
            estatura: '',
            peso: '',
            objetivo : '',
            getServicios: '',
            darServicios: [],
            darPlanes: [],
            getPlanes: [],
            arrayServicios: [],
            arrayPlanes: [],
            consumo: [],
            dinero: '',
            suma : 0,
            rutinas: [],
            postRutinas: [],
            mostrarServicios: [],
            mandarPlan: '',
            loading: false,
            agregando: false,
            seleccion: [
                'Hombre',
                'Mujer'
            ],
            objetives: [
                'Perder peso',
                'Ganar masa muscular',
                'Incrementar fuerza'
            ]
        }
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
        this.obtenerServicios();
        this.obtenerPlanes();
        this.obtenerRutinas();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        obtenerServicios(){
            this.loading= true
            axios.get('/servicios')
            .then(response => {
                this.loading = false
                this.getServicios = response.data
            }).catch(error => {
                this.loading = false
                console.log(error)
            })
        },
        obtenerRutinas(){
            axios.get('/miembros/create')
            .then(response => {
                this.rutinas = response.data.rutinas
            }).catch(error => {
                console.log(error)
            })
        },
        obtenerPlanes(){
            axios.get('/planes-entrenamiento')
            .then(response => {
                this.getPlanes = response.data
            }).catch(error => {
                console.log(error)
            })
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
            this.agregando = true
            axios.post('/miembros', {
                nombre: this.nombre,
                apellidos: this.apellidos,
                telefono: this.telefono,
                fecha_nacimiento : this.fecha_nacimiento,
                email : this.email,
                servicios : this.darServicios,
                condicion_fisica : this.cond_fisica,
                telefono_emergencia : this.tel_emerg,
                rutinas: 'kjnklsjnflsjkdnf',
                id_plan_entrenamiento : this.mandarPlan,
                sexo: this.sexo,
                estatura :this.estatura,
                peso: this.peso,
                objetivo : this.objetivo
            }).then(response => {
                this.agregando = false
                console.log(response)
            Swal.fire(
                'Correcto',
                'Se ha agregado un nuevo miembro exitosamente',
                'success',
                setTimeout(() => {
                    location.reload()
                }, 2000)
            )
                let miembro = {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    telefono: this.telefono,
                    telefono_emergencia : this.tel_emerg,
                    id_plan_entrenamiento : this.plan
                }
                this.datos.unshift(miembro)
            }).catch(error => {
                this.agregando = false
                this.errors = (error.response.data.errors)
                console.log(error)
            })
            this.errors = []
        },
        deleteMiembros(index,id){
            Swal.fire({
            title: '¿Desea eliminar a este miembro?',
            text: "¡Esta acción no se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.value) {
                axios.delete('/miembros/'+ id)
                .then(response => {
                    this.datos.splice(index, 1)
                    Swal.fire(
                    '¡Eliminado!',
                    'El miembro ha sido eliminado.',
                    'success'
                    )
                }).catch(error => {
                    alert('Ha ocurrido un error: ' + error)
                })
            }
            })
        },
        selectServicio(e){
            var id = e.target.value
            var servicio = this.getServicios.find(element => element.id == id)
            var valor = servicio.precio
            this.suma = this.suma + parseFloat(valor)
            if(this.arrayServicios == ''){
                this.arrayServicios.push(servicio)
                this.consumo.push(servicio)
                this.darServicios.push(parseInt(id, 10))
            }else{
                if(this.arrayServicios.find(element => element.id == id) ){
                    Swal.fire({ 
                        title: 'Este servicio ya existe dentro del plan',
                        icon: 'warning',
                    })  
                }else{
                    this.arrayServicios.push(servicio)
                    this.consumo.push(servicio)
                    this.darServicios.push(parseInt(id, 10))
                }
            }
        },
        selectPlan(e){
            var id = e.target.value
            var plan = this.getPlanes.find(element => element.id == id)
            var valor = plan.precio
            this.suma = this.suma + parseFloat(valor)
            if(this.arrayPlanes.find(element => element.id == id) ){
                Swal.fire({ 
                    title: 'Este plan ya existe',
                    icon: 'warning',
                })  
            }else{
                var idplan = parseInt(id) + 10
                plan.id = idplan
                this.arrayPlanes.push(plan)
                this.consumo.push(plan)
                this.mandarPlan = id
                }
        },
        darRutinas(e){
            var id = e.target.value
            var rut = this.rutinas.find(element => element.id == id)
            this.postRutinas.push(id)
        },
        limpiarDatos(){
            this.nombre = ''
            this.apellidos = ''
            this.telefono = ''
            this.fecha_nacimiento = ''
            this.email = '',
            this.arrayServicios= [],
            this.darServicios = [],
            this.suma = 0
        },
        quitarServicio(index,id){
            var serv = this.consumo.find(element => element.id == id)
            console.log(serv)
            var v = serv.precio
            console.log(v)
            this.suma = this.suma - parseFloat(v)
            this.consumo.splice(index, 1)
            // var nombre = this.arrayServicios.find(element => element.nombre == serv.nombre)
            this.arrayServicios.forEach(element=>{
                if(element.nombre == serv.nombre){
                    this.arrayServicios.splice(serv,1)
                }
            })
            this.arrayPlanes.forEach(element => {
                if(element.nombre == serv.nombre){
                    this.arrayPlanes.splice(serv,1)
                }
            })
        }
    }
};
</script>