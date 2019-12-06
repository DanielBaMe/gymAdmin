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
                                        <h4>Datos del evento o promoción</h4>
                                    </div>
                                    <div class="card-body card-block">
                                        <form method="post" @submit.prevent="addEvent" class="ml-5 mr-5" encType="multipart/form-data">
                                            <div class="form-group">
                                                <error-list :errors="errors.nombre"></error-list>
                                                <label class="control-label mb-1">Nombre</label>
                                                <input type="text" name="nombre" id="nombre"
                                                class="form-control" v-model="nombre" pattern="[a-zA-Z\s]+"> 
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.descripcion"></error-list>
                                                <label class="control-label mb-1">Descripcion</label>
                                                <textarea type="text" name="descripcion"
                                                id="descripcion" class="form-control" v-model="descripcion" pattern="[a-zA-Z0-9\s]+"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.imagen"></error-list>
                                                <label class="control-label mb-1">Imagen</label>
                                                <input type="file" name="file" id="file" ref="file"
                                                class="form-control" @change="getImage($event)" accept="image/*">
                                                <img :src=this.mostrarImagen alt="">
                                            </div>
                                            <div class="form-group">
                                                <error-list :errors="errors.tipo"></error-list>
                                                <label class="control-label mb-1">Tipo</label>
                                                <select v-model="tipo" class="form-control h-25">
                                                    <option v-for="item of seleccion" :key="item.id">
                                                        {{item}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label mb-1">Fechas</label>
                                                <br/>
                                                <div class="row justift-center">
                                                    <div class="col">
                                                        <error-list :errors="errors.fecha_inicio"></error-list>
                                                        <label class="control-label mb-1">Inicio</label>
                                                        <input type="date" name="inicio" id="inicio" class="form-control" v-model="inicio">
                                                    </div>
                                                    <div class="col">
                                                        <error-list :errors="errors.fecha_fin"></error-list>
                                                        <label class="control-label mb-1">Fin</label>
                                                        <input type="date" name="fin" id="fin" class="form-control" v-model="fin">
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
                            <button @click="$router.go(-1)" class="btn btn-primary btn-sm glyphicon glyphicon-arrow-left" title="Atrás">
                            </button>
                        </div>
                        <div class="table-data__tool-right">
                            <button class="btn btn-info btn-sm content-aling-center" @click="agregar = !agregar" v-if="agregar === false">
                                +   Nuevo evento
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-around" v-if="!loading">
                    <div class="card w-25" v-for="(item,index) of eventos" :key="item.id">
                        <div >
                            <img :src="'https://smartgym.infornet.mx/assets/images/promociones_eventos/'+ item.imagen">
                            <div class="card-body">
                                <h2 class="card-title">{{item.nombre}}</h2>
                                <p class="card-text">Tipo: {{item.tipo}}</p>
                                <p class="card-text">Descripcion: {{item.descripcion | delimitar}}</p>
                                <p class="card-text">Fecha de inicio: {{item.fecha_inicio}}</p>
                                <p class="card-text">Fecha de finalización: {{item.fecha_fin}}</p>
                            </div>
                            <div class="table-data-feature justify-content-around">
                                <router-link :to="'/ver-evento/' + item.id">
                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Ver más">
                                        <span class="glyphicon glyphicon-zoom-in"></span> 
                                    </button>
                                </router-link>

                                <router-link :to="'/edit-evento/' + item.id">
                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Editar plan">
                                        <span class="zmdi zmdi-edit"></span> 
                                    </button>
                                </router-link>

                                <button class="item" data-toggle="tooltip" data-placement="top" title="Eliminar" type="submit" @click.prevent="deleteEvento(index,item.id)">
                                    <span class="zmdi zmdi-delete"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="row align-items-center">
                    <div class="col"></div>
                    <div class="col"> <img src="/images/68042.png" alt=""></div>
                    <div class="col"></div>
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


export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            nombre: '',
            imagen: '',
            descripcion: '',
            tipo: '',
            inicio: '',
            fin: '',
            errors : [],
            cargando : false,
            agregar: false,
            seleccion: [
                'Evento',
                'Promoción'
            ],
            agregar : false,
            eventos: [],
            mostrarImagen: '',
            loading:false
        };
    },
    created(){
        this.verifyToken();
        this.getDatos();
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
        getDatos(){
            this.loading = true
            axios.get('/promociones-eventos')
                .then(response => {
                    this.loading = false
                    if(response.data == '')
                    {
                        Swal.fire(
                            'No hay eventos/promociones en el sistema',
                            'Agrega algunos!',
                            'info'
                        )
                    }
                    this.eventos = response.data
                    console.log(this.eventos)
                }).catch(error => {
                    this.loading = false
                    console.log(error)
                })
        },
        addEvent(event){
            
            let formData = new FormData();

            formData.append('nombre',this.nombre)
            formData.append('descripcion',this.descripcion)
            formData.append('imagen',this.imagen)
            formData.append('tipo',this.tipo)
            formData.append('fecha_inicio',this.inicio)
            formData.append('fecha_fin',this.fin)

            axios.post('/promociones-eventos', formData)
            .then(response => {
            Swal.fire(
                'Correcto',
                'Se ha agregado un nuevo evento o promoción',
                'success',
                setTimeout(() => {
                    location.reload()
                }, 500)
            )
                console.log(response.data)
            }).catch(error => {
                console.log(error)
                this.errors = (error.response.data.errors)
            })
            this.errors = [];
        },
        getImage(event){
            this.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
        },
        limpiarDatos(){
            this.nombre= ''
            this.descripcion= ''
            this.imagen= ''
            this.tipo= ''
            this.inicio= ''
            this.fin = ''
        },
        deleteEvento(index,id){
            Swal.fire({
                title: '¿Desea eliminar este evento/promoción?',
                text: "¡Esta acción no se podrá revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
                }).then((result) => {
                if (result.value) {
                    axios.delete('/promociones-eventos/'+ id)
                    .then(response => {
                        this.eventos.splice(index, 1)
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
        }
    }
}
</script>