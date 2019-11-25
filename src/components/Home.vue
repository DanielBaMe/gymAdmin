<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content d-flex justify-content-around">
                <div>
                    <h3>Estado del servicio</h3>
                    <br/>
                        <span class="alert alert-success w-100">{{datos.estado}}</span>
                    <br/>
                </div>
                <div>
                    <h3>Tipo de plan</h3>
                    <p>{{datos.id_plan}}</p>   
                    <br/>      
                </div>
                <div>
                    <h3>Fecha de expiración</h3>
                    <p>{{datos.fecha_expiracion}}</p>
                    <br/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import HeaderMobile from './HeaderMobile'
import MenuSidebar from './MenuSidebar'
import HeaderDesktop from './HeaderDesktop'
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'Inicio',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop
    },
    data(){
        return {
            datos: [],
            estado: false
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
            axios.get('/perfil')
            .then((response) =>
            {   
                this.datos = response.data.contrato;
                if(this.datos.estado === 'Activo'){
                    this.estado = true
                }
            }).catch(function (error){
                console.log(error);
            })
        }
    }
};
</script>