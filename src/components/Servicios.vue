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
                                        <h4>Datos del nuevo servicio</h4></div>
                                        <div class="card-body card-block">
                                            <form method="post" @submit.prevent="addService" class="ml-5 mr-5">
                                                <div class="form-group">
                                                    <error-list :errors="errors.nombre"></error-list>
                                                    <div class="input-group">
                                                        <div class="input-group-addon">Nombre</div>
                                                        <input type="text" name="servicio" id="servicio"
                                                        class="form-control" v-model="nombre"  pattern="[a-zA-Z0-9\s]+"
                                                        title="Solo números y letras.">
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
                                                        <textarea type="text" max="50" name="descripcion" id="descripcion" 
                                                        class="form-control" v-model="descripcion" rows="5"  pattern="[a-zA-Z0-9\s]+"></textarea>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div class="row">
                                                    <div class="col-auto mr-auto">
                                                        <button class="au-btn au-btn--block au-btn--green m-b-20 text-center" v-if="!cargando" type="submit" @click.prevent="addService">
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
                                +   Nuevo servicio
                            </button>
                        </div>
                    </div>
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
                                        <span class="badge badge-pill badge-dark">$ {{item.precio}}</span>
                                    </td>
                                    <td class="desc">
                                        <span>{{item.descripcion | delimitar}}</span>
                                    </td>
                                    <td>
                                        <div class="table-data-feature justify-content-around">
                                            <router-link :to="'/ver-servicio/' + item.id">
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                                    <span class="glyphicon glyphicon-zoom-in"></span> 
                                                </button>
                                            </router-link>

                                            <router-link :to="'/edit-servicio/' + item.id">
                                                <button class="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                                    <span class="zmdi zmdi-edit"></span>
                                                </button> 
                                            </router-link>
                                            
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
        obtenerDatos(){
            axios.get('/servicios')
            .then((response) =>
            {   
                if(response.data == '')
                    {
                        Swal.fire(
                            'No hay servicios en el sistema',
                            'Agrega algunos!',
                            'info'
                        )
                    }else {
                        this.datos = response.data
                    }
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
                'success',
                setTimeout(() => {
                    location.reload()
                }, 500)
            )
            })
            .catch(error=>{
                this.errors = (error.response.data.errors)
                this.cargando = false;
            })
            this.errors= []
        },
        deleteServicio(index,id){
            Swal.fire({
            title: '¿Desea eliminar este servicio?',
            text: "Este servicio también se eliminará de los planes de entrenamiento en donde esté vinculado.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.value) {
                axios.delete('/servicios/'+ id)
                .then(response => {
                    this.datos.splice(index, 1)
                    Swal.fire(
                    '¡Eliminado!',
                    'El servicio ha sido eliminado.',
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
            this.precio = ''
            this.descripcion = ''
        }
    }
}

</script>