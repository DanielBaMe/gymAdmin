<template>
<div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-container">}
        <HeaderDesktop/>
        <div class="main-content">
            <button @click="$router.go(-1)" class="btn btn-primary ml-5 glyphicon glyphicon-arrow-left">
                Atras
            </button>
            <div class="login-wrap">
                <div class="login-content">
                    <div class="login-form"> 
                        <form @submit.prevent="formSubmit" method="post">
                            <div class="form-group">
                                <div v-if="hecho" class="alert alert-info w-100">
                                    <span>Se ha actualizado correctamente</span>
                                    <br/>
                                </div>
                                <div v-if="er" class="alert alert-danger w-100">
                                    {{ error_message}}
                                    <br/>
                                </div>
                                <div class="text-center">
                                    <error-list :errors="errors.nombre"></error-list>
                                    <h4>Nombre</h4> 
                                    <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z\s]+"
                                    v-model="servicio.nombre" minlength="4" maxlength="20">
                                    <br/>  
                                </div>
                                <error-list :errors="errors.precio"></error-list>
                                <h4 class="text-center">Precio</h4>  
                                <input name='precio' id='precio' class="form-control" type="text" pattern="[0-9]+"
                                    v-model="servicio.precio"> 
                                <br/>
                                <error-list :errors="errors.descripcion"></error-list>
                                <h4 class="text-center">Descripcion</h4>    
                                <input name='descripcion' id='descripcion' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                    v-model="servicio.descripcion"
                                    > 
                                <br/>
                            </div>
                            <br/>
                                <button v-if="!loading" type="submit" class="au-btn au-btn--block au-btn--green m-b-20">Editar</button>
                                <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20">Actualizando...</button>
                        </form>
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

export default {
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return{
            servicio:{
                nombre: '',
                precio: '',
                descripcion: '',
                id: '',
                id_gimnasio: '',
                updated_at: ''
            },
            errors: [],
            er: false,
            hecho: false,
            er: false,
            error_message: '',
            loading: false,
            ide:''
        }
    },
    beforeUpdate(){
        this.loading = true;
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
        obtenerDatos(){
            this.ide = this.$route.params.id;
            axios.get('/servicios/' + this.ide)
            .then((response) =>
            {  
                this.servicio = response.data;
                console.log(this.servicio)
            }).catch(function (error){
                console.log('Error: ' + error);
                this.er = true
            })
        },
        formSubmit(){
            axios.put('/servicios/'+ this.ide, this.servicio)
            .then(response => {
                console.log(response)
                this.errors= []
                this.loading = false;
                this.hecho = true;
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