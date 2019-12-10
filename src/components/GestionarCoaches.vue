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
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Datos del nuevo coach</h4></div>
                                    <div class="card-body card-block">
                                        <form method="post" @submit.prevent="addCoach" class="ml-5 mr-5">
                                            <div class="form-group">
                                                <error-list :errors="errors.nombre"></error-list>
                                                <label class="control-label mb-1">Nombre del coach </label>
                                                <input type="text" name="nombre" id="nombre"
                                                class="form-control" v-model="nombre" pattern="[a-zA-Z\s]+"> 
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label mb-1">Biografía </label>
                                                <textarea type="text" name="biografia"
                                                id="biografia" class="form-control" v-model="biografia" pattern="[a-zA-Z0-9\s]+"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.email"></error-list>
                                                <label class="control-label mb-1">Email </label>
                                                <input type="email" name="email" id="email"
                                                class="form-control" v-model="email">
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label mb-1">Horarios </label>
                                                <small>El horario de servicio es de 5am a 10pm</small>
                                                <br/>
                                                <div class="row justift-center">
                                                    <div class="col">
                                                        <label class="control-label mb-1">Entrada</label>
                                                        <input type="time" min="05:00" max="22:00"
                                                        name="entrada" id="entrada" class="form-control" v-model="entrada" required>
                                                    </div>
                                                    <div class="col">
                                                        <label class="control-label mb-1">Salida</label>
                                                        <input type="time" min="05:00" max="22:00"
                                                        name="salida" id="salida" class="form-control" v-model="salida" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-auto mr-auto">
                                                    <button class="au-btn au-btn--block au-btn--green m-b-20 text-center" v-if="!cargando" type="submit">
                                                    <span>Agregar</span></button>
                                                    <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Agregando...</button>
                                                </div>
                                                <div class="col-auto">  <div class="col-auto">
                                                        <span v-show="agregar" title="Cancelar" @click="agregar = !agregar" @click.prevent="limpiarDatos()" class="btn btn-danger btn-lg content-aling-center">X</span>
                                                    </div></div>
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
                            <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás"></button>
                        </div>
                        <div class="table-data__tool-right">
                            <button class="btn btn-info btn-sm content-aling-center" @click="agregar = !agregar" v-if="agregar === false">
                                +   Nuevo coach
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive table-responsive-data2">
                        <table class="table table-data2">
                            <thead>
                                <tr>
                                    <th >Nombre</th>
                                    <th >Correo</th>
                                    <th >Horarios</th>
                                    <th >Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="tr-shadow" v-for="(item,index) of datos" :key="item.id">
                                    <td>{{item.nombre}}</td>
                                    <td>{{item.email}}</td>
                                    <td>{{item.horarios}}</td>
                                    <td>
                                        <div class="table-data-feature justify-content-around">
                                            <!-- <router-link :to="'/edit-coach/' + item.id">
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                                    <span class="zmdi zmdi-edit"></span>
                                                </button> 
                                            </router-link> -->
                                            
                                            <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteCoach(index,item.id)">
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

export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            nombre: '',
            biografia: '',
            email: '',
            horarios: '',
            datos : [],
            errors: [],
            ide: '',
            agregar: false,
            btnagregar: false,
            cargando: false,
            er: false,
            entrada: '',
            salida: ''
        }
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
            axios.get('/perfil')
            .then((response) => {
                this.ide = response.data.gimnasio.id;
            }).catch(function (error) {
                console.log(error);
            })
        },
        obtenerDatos(){
            axios.get('/coaches')
            .then((response) =>
            {   
                this.datos = response.data
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        addCoach(){
            this.horarios = this.entrada + '-' + this.salida
            axios.post('/coaches',
            {
                nombre: this.nombre,
                biografia: this.biografia,
                email: this.email,
                id_gimnasio: this.ide,
                horarios : this.horarios
            })
            .then( response => {
                let coach = {
                    nombre: this.nombre,
                    biografia: this.biografia,
                    email: this.email,
                    id_gimnasio: this.ide,
                    horarios : this.horarios
                }
                this.datos.unshift(coach)
                this.cargando = false;
                this.errors = [];
                this.agregar = false;
                this.nombre = ''
                this.email = ''
                this.biografia = ''
                this.horarios = ''
                this.entrada = ''
                this.salida = ''
                this.errors = ''

                
                Swal.fire(
                'Correcto',
                'Se ha agregado un nuevo coach exitosamente',
                'success'
                )

                setTimeout(() => {
                    console.log('realoading...')
                }, 3000)

                
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
        },
        deleteCoach(index,id){
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
                axios.delete('/coaches/'+ id)
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
            this.email = ''
            this.biografia = ''
            this.horarios = ''
            this.errors = ''
            this.entrada = ''
            this.salida = ''
        }
    }
    }
;
</script>