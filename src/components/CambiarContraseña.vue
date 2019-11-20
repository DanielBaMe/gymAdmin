<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="d-flex justify-content-around">
                    <form @submit.prevent="editPass" method="post" action="/password/update">
                        <div class="form-group">
                            <div v-if="hecho" class="alert alert-success w-100">
                                <span>Se ha cambiado correctamente la nueva contraseña</span>
                                <br/>
                            </div>
                            <br/>
                            <div v-if="er" class="alert alert-danger w-100">
                                {{ error_message }}
                                <br/>
                            </div>
                                <br/>
                            <label>Contraseña actual</label>
                            <input class="au-input au-input--full" type="password" v-model="current_password" placeholder="Password actual">
                            <br/>
                            <br/>
                            <error-list :errors="errors.password"></error-list>
                            <label>Contraseña nueva</label>
                            <input class="au-input au-input--full" type="password" v-model="password" placeholder="Nuevo password">
                            <br/>
                            <br/>
                            <label>Confirmar contraseña</label>
                            <input class="au-input au-input--full" type="password" v-model="confirm" placeholder="Confirmar password">
                            <br/>
                            <br/>
                            <button v-if="!cargando" type="submit" class="au-btn au-btn--block au-btn--green m-b-20 w-50">Cambiar</button>
                            <button v-else disabled class="au-btn au-btn--block au-btn--info m-b-20 w-50">Actualizando...</button>
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
import ErrorsList from './ErrorsList.vue'
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

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
            cargando: false,
            er: false,
            error_message: ''
        };
    },
    created(){
        this.verifyToken();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
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
                this.password = '';
                this.confirm = '';
                this.current_password = '';
            })
            .catch( error => {
                this.cargando = false;
                if (!error.response.data.errors.current_password) {
                    this.errors = (error.response.data.errors)
                } else{
                    this.er = true
                    this.error_message = error.response.data.errors.current_password
                }
            })
            this.errors = []
            this.er = false
            this.error_message = ''
        }
    }
};

</script>