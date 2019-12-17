<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
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
    created(){
        this.verifyToken();
    },
    mounted(){
        this.obtenerDatos();
        this.obtenerServicios();
        this.obtenerPlanes();
        this.obtenerRutinas();
    },
    method:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        }
    }
}
</script>
