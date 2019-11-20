<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="d-flex justify-content-around">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of datos" :key="item.id">
                                <td>{{item.nombre}}</td>
                                <td>{{item.apellidos}}</td>
                                <td>{{item.telefono}}</td>
                                <router-link :to="'/edit-miembro/' + item.id" class="btn btn-info btn-lg">
                                    <span class="glyphicon glyphicon-pencil" title="Editar"></span> 
                                </router-link>
                                &nbsp &nbsp
                                <router-link to="#" class="btn btn-danger btn-lg">
                                    <span class="glyphicon glyphicon-minus" title="Eliminar"></span>
                                </router-link>
                            </tr>
                        </tbody>
                    </table>
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
    },
    data(){
        return {
            datos : []
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
            axios.get('/miembros')
            .then((response) =>
            {   
                this.datos = response.data
                if(datos.estado === 'Activo'){
                    this.estado = true
                }
                console.log(response.data)
                console.log(this.datos)
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        }
    }
};
</script>