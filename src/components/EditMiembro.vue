<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="d-flex justify-content-around">
                    <form method="post">
                        <h3>Nombre: &nbsp &nbsp {{datos.nombre}}</h3> 
                        <br/>  
                        <h3>Apellidos: &nbsp &nbsp {{datos.apellidos}}</h3>   
                        <br/>
                        <h3>Telefono: &nbsp &nbsp {{datos.telefono}}</h3>   
                        <br/>
                        <h3>Email: &nbsp &nbsp {{datos.email}}</h3>   
                        <br/>
                        <h3>Condición fisica: &nbsp &nbsp {{datos.condicion_fisica}}</h3>   
                        <br/>
                        <h3>Plan de alimentación: &nbsp &nbsp {{datos.id_plan_alimentacion}}</h3>   
                        <br/>
                        <h3>Plan de entrenamiento: &nbsp &nbsp {{datos.id_plan_entrenamiento}}</h3>   
                        <br/>
                        <h3>Rutina: &nbsp &nbsp {{datos.id_rutina}}</h3>   
                        <br/>
                        <h3>Telefono de emergencia: &nbsp &nbsp {{datos.telefono_emergencia}}</h3>   
                        <br/>
                    </form>
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
            datos: [],
            nombre: '',
            telefono: '',
            correo: '',
            confirmacion: false,
            errors: []
        };
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
            axios.get('/miembros/' + ide)
            .then((response) =>
            {   
                this.datos = response.data
                console.log(response.data)
                console.log(this.datos)
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        }
    }
};
</script>