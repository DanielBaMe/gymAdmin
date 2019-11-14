<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="d-flex justify-content-around">
                    <form @submit="editPass" method="post" action="/password/update">
                        <label>Contraseña actual</label>
                        <input class="au-input au-input--full" type="password" v-model="current_password" placeholder="Password actual">
                        <br/>
                        <br/>
                        <label>Contraseña nueva</label>
                        <input class="au-input au-input--full" type="password" v-model="password" placeholder="Nuevo password">
                        <br/>
                        <br/>
                        <label>Confirmar contraseña</label>
                        <input class="au-input au-input--full" type="password" v-model="confirm" placeholder="Confirmar password">
                        <div v-if="hecho" class="alert alert-info w-100">
                            <span>Se ha cambiado correctamente la nueva contraseña</span>
                            </br>
                        </div>
                        <br/>
                        <br/>
                            <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20 w-50" @click.prevent="editPass">Cambiar</button>
                            <button v-else disabled class="au-btn au-btn--block au-btn--green m-b-20 w-50">Actualizando...</button>
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

export default {
    name: 'Edit-info',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop,
        'error-list': ErrorsList
    },
    data(){
        return {
            current_password: '',
            password: '',
            confirm: '',
            errors: [],
            hecho: false,
            cargando: false
        };
    },
    methods:{
        editPass(){
            this.cargando = true;
            axios.post('/password/update', {
                current_password: this.current_password,
                password: this.password,
                password_confirmation: this.confirm
            })
            .then(response => {
                this.cargando = false;
                this.errors = [];
                this.hecho = true;
                this.$router.push('/edit-password');
            })
            .catch( error => {
                this.cargando = false;
                this.errors = (error.response.data)
                console.log(errror)
            })
            this.password = '';
            this.confirm = '';
            this.current_password = '';
        }
    }
};

</script>