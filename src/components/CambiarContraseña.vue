<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="d-flex justify-content-around">
                    <form @submit="editPass" method="post" action="https://smartgym.infornet.mx/api/gimnasio/password/update">
                    <div class="form-group">
                            <label>Dirección de correo electronico</label>
                            <input class="au-input au-input--full" type="email" v-model="email" placeholder="Email">
                            <label>Contraseña nueva</label>
                            <input class="au-input au-input--full" type="password" v-model="password" placeholder="Password">
                            <label>Confirmar contraseña</label>
                            <input class="au-input au-input--full" type="password" v-model="confirm" placeholder="Confirm password">
                        </div>
                        <div v-if="er" class="alert alert-danger w-100">
                            <span>{{mensaje}}</span>
                            </br>
                        </div>
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
import axios from 'axios';

export default {
    name: 'Edit-info',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop
    },
    data(){
        return {
            password: '',
            confirm: '',
            mensaje: [],
            er: false
        };
    },
    methods(){

    }
};

</script>