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
                            <br/>
                            <br/>
                            <br/>
                            <div>
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3>Editar imagen del evento/promoción</h3></div>
                                        <div class="card-body">
                                            <form @submit.prevent="editImagen" method="post" class="ml-5 mr-5">
                                                <error-list :errors="errors.imagen"></error-list>
                                                <label class="control-label mb-1">Imagen</label>  
                                                <img :src="'https://smartgym.infornet.mx/assets/images/promociones_eventos/'+ evento.imagen" alt="" v-show="verImagen">
                                                <br/>
                                                <input type="file" name="file" id="file" ref="file"
                                                class="form-control" @change="getImage($event)" accept="image/*" v-show="!verImagen">
                                                <img :src=this.mostrarImagen alt="" v-if="!verImagen">
                                                <br/>
                                                <span v-if="verImagen" @click="verImagen = !verImagen" class="btn btn-success m-b-20 w-100">Editar información</span>
                                                <button v-else type="submit" class="btn btn-primary m-b-20 w-100">Editar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!loading" class="col-lg-6">
                                    <div class="card">
                                    <div class="card-header">
                                        <h3>Editar las información de {{evento.nombre}}</h3></div>
                                        <div class="card-body">
                                            <form @submit.prevent="editEvento" method="post" class="ml-5 mr-5">
                                                    <div v-if="er" class="alert alert-danger w-100">
                                                        {{ error_message}}
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.nombre"></error-list>
                                                        <label class="control-label mb-1">Nombre</label> 
                                                        <input name='nombre' id='nombre' class="form-control" type="text"
                                                        pattern="[a-zA-Z0-9\s]+" title="Solo números y letras."
                                                        v-model="evento.nombre" minlength="4" maxlength="20"  :disabled="validated">
                                                        <br/>  
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.descripcion"></error-list>
                                                        <label class="control-label mb-1">Descripción</label>  
                                                        <textarea name='descripcion' id='descripcion' class="form-control" type="text"
                                                        v-model="evento.descripcion"  :disabled="validated"> </textarea>
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <error-list :errors="errors.tipo"></error-list>
                                                        <label class="control-label mb-1">Tipo</label>  
                                                        <input name='tipo' id='tipo' class="form-control" type="text"
                                                        v-model="evento.tipo"  :disabled="validated"> 
                                                        <br/>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label mb-1">Fechas</label>
                                                        <br/>
                                                        <div class="row justift-center">
                                                            <div class="col">
                                                                <error-list :errors="errors.fecha_inicio"></error-list>
                                                                <label class="control-label mb-1">Inicio</label>
                                                                <input type="date" name="inicio" id="inicio"
                                                                class="form-control" v-model="evento.fecha_inicio" :disabled="validated">
                                                            </div>
                                                            <div class="col">
                                                                <error-list :errors="errors.fecha_fin"></error-list>
                                                                <label class="control-label mb-1">Fin</label>
                                                                <input type="date" name="fin" id="fin"
                                                                class="form-control" v-model="evento.fecha_fin" :disabled="validated">
                                                            </div>
                                                        </div>
                                                    </div>
                                                <br/>
                                                    <span v-if="validated" @click="validated = !validated" class="btn btn-success m-b-20 w-100">Editar información</span>
                                                    <button v-else type="submit" class="btn btn-primary m-b-20 w-100">Editar</button>
                                                    <br/>
                                                    <router-link to="/edit-evento-imagen">
                                                        <button>Editar imagen</button>
                                                    </router-link>
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
            evento : [],
            validated : true,
            loading: false,
            er:false,
            errors: [],
            mostrarImagen: '',
            verImagen: true
        }
    },
    created(){
        this.verifyToken();
        this.getDatos();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        getDatos(){
            this.loading= true
            this.ide = this.$route.params.id;
            axios.get('/promociones-eventos/'+ this.ide)
            .then(response => {
                this.loading = false;
                this.evento = response.data
                console.log(this.evento)
            }).catch(error => {
                this.loading = false;
                console.log(error)
            })
        },
        editEvento(){
            console.log(this.evento)
            axios.put('/promociones-eventos/'+ this.ide, this.evento)
            .then(response => {
            Swal.fire({
                title: 'Se ha editado el evento/promoción exitosamente',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                        this.$router.push('/eventos');
                    }
                })
            }).catch(error => {
                console.log(error)
                this.errors = (error.response.data.errors)
                this.loading = false;
            })
            this.errors=[];
            this.loading = false;
        },
        editImagen(){
            this.evento.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
        },
        getImage(event){
            this.evento.imagen = event.target.files[0];
            this.mostrarImagen = URL.createObjectURL(event.target.files[0])
            this.verImagen = false
        }
    }
}
</script>