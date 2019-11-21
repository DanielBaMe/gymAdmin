<template>
<div class="page-wrapper">
    <HeaderMobile/>
    <MenuSidebar/>
    <div class="page-content--bge5">}
        <HeaderDesktop/>
        <div class="main-content">
            <div class="login-wrap">
                <div class="login-content">
                    <div class="login-form"> 
                        <form @submit.prevent="formSubmit" method="post">
                            <div class="form-group">
                                <div v-if="er" class="alert alert-danger w-100">
                                    {{ error_message}}
                                    <br/>
                                </div>
                                <h4 class="text-center">Nombre</h4> 
                                <!-- <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                    minlength="4" maxlength="20" v-model="servicio.nombre" placeholder='Editar nombre'
                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20"> -->
                                <br/>  
                                <h4 class="text-center">Precio</h4>  
                                <!-- <input name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                    minlength="4" maxlength="20" v-model="servicio.precio" placeholder='Editar precio'
                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">  -->
                                <br/>
                                <h4 class="text-center">Precio</h4>    
                                <!-- <textarea name='nombre' id='nombre' class="form-control" type="text" pattern="[a-zA-Z0-9\s]+"
                                    minlength="4" maxlength="20" v-model="servicio.descripcion" placeholder='Editar descripcion'
                                    title="Solo letras, Tamaño minimo: 4. Tamaño maximo: 20">  -->
                                <br/>
                            </div>
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
                descripcion: ''
            },
            confirmacion: false,
            errors: [],
            er: false
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
        obtenerDatos(){
            var ide = this.$route.params.id;
            axios.get('/servicios/' + ide)
            .then((response) =>
            {   
                console.log(response.data)
                // this.servicio = response.data
                // console.log(this.servicio)
            }).catch(function (error){
                console.log('Error: ' + error);
                this.er = true
            })
        }
    }
}
</script>