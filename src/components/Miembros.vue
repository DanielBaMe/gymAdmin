<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div v-show="agregar">
                    <div class="row align-items-start">
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
                                                            <error-list :errors="errors.telefono"></error-list>
                                                            <div class="input-group">
                                                                <label>Telefóno de emergencia</label>
                                                                <input type="text" name="tel_emerg" id="tel_emerg" pattern="[0-9]+" minlength="4"
                                                                class="form-control" v-model="tel_emerg">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.telefono"></error-list>
                                                            <div class="input-group">
                                                                <label>Servicios</label>
                                                                <select name="" id="" v-model="darServicios" v-for="item of getServicios" :key='item.id'>
                                                                    <option>{{item.nombre}} - {{item.precio}}</option> 
                                                                </select>
                                                                <!-- <input type="text" name="servicios" id="servicios" pattern="[0-9]+" minlength="4"
                                                                class="form-control" v-model="servicios"> -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <error-list :errors="errors.telefono"></error-list>
                                                            <div class="input-group">
                                                                <label>Condición fisica</label>
                                                                <textarea type="text" name="cond_fisica" id="cond_fisica" pattern="[0-9]+" minlength="4"
                                                                class="form-control" v-model="cond_fisica"></textarea>
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
                    <div class="table-responsive table-responsive-data2">
                        <table class="table table-data2">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Telefono</th>
                                    <th>Telefono emergencia</th>
                                    <th>Cond. Fisica</th>
                                    <th>Servicios</th>
                                    <th>Estatus</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                    <td><span>{{item.nombre}}</span></td>
                                    <td><span>{{item.apellidos}}</span></td>
                                    <td><span>{{item.telefono}}</span></td>
                                    <td><span>{{item.telefono_emergencia}}</span></td>
                                    <td><span>{{item.condicion_fisica}}</span></td>
                                    <td><span>{{item.created_at}}</span></td>
                                    <td><span>{{item.servicios}}</span></td>
                                    <td>
                                        <div class="table-data-feature justify-content-around">
                                            <router-link :to="'/edit-miembro/' + item.id">
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                                    <span class="zmdi zmdi-edit"></span>
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
            getServicios: '',
            darServicios: []
        }
    },
    created(){
        this.verifyToken();
        this.obtenerDatos();
        this.obtenerServicios();
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
            axios.get('/miembros')
            .then((response) =>
            {   
                this.datos = response.data
                console.log(response.data)
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
                let miembro = {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    telefono: this.telefono,
                    fecha_nacimiento : this.fecha_nacimiento,
                    email : this.email
                }
                this.datos.unshift(miembro)
                console.log(response)
                this.cargando = false;
                this.errors = [];
                SweetAlert.fire(
                'Correcto',
                'Se ha agregado un nuevo miembro exitosamente',
                'success'
            )
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
        deleteMiembros(index,id){
            Swal.fire({
            title: '¿Desea eliminar a este coach?',
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
                    'El coach ha sido eliminado.',
                    'success'
                    )
                }).catch(error => {
                    alert('Ha ocurrido un error: ' + error)
                })
            }
            })
        },
        limpiarDatos(){
            this.nombre = ''
            this.apellidos = ''
            this.telefono = ''
            this.fecha_nacimiento = ''
            this.email = ''
        }
    }
};
</script>