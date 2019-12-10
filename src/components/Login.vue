<template>
<div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <router-link to="/"> <img src="/images/smartgym-logo.png" alt="CoolAdmin"></router-link>
                        </div>
                        <div class="login-form">
                            <div v-if="er" class="alert alert-danger w-100">
                                {{ error_message }}
                                <br/>
                            </div>
                            <form @submit.prevent="loginSubmit" method="post">
                                <div class="form-group">
                                    <error-list :errors="errors.email"></error-list>
                                    <label>Correo electronico</label>
                                    <input class="au-input au-input--full" type="email" v-model="email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <error-list :errors="errors.password"></error-list>
                                    <label>Contraseña</label>
                                    <input class="au-input au-input--full" type="password" v-model="password" placeholder="Password">
                                </div>
                                <div class="login-checkbox">
                                    <label>
                                        <router-link to='/password-request'>¿Olvidaste tu contraseña?</router-link>
                                    </label>
                                </div>
                                <button type="submit" class="au-btn au-btn--block au-btn--green m-b-20" >Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ErrorsList from './ErrorsList.vue'
import store from '../store'

export default {
    components: {
        'error-list': ErrorsList
    },
    state:{
        token: null
    },
    data(){
        return{
            email: '',
            password: '',
            errors: [],
            er: false,
            eo: false,
            error_message: '',
            user: [],
            datos: [],
            gimnasio: [],
            t: ''
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        loginSubmit(){
            axios.post('/login', {
                email: this.email,
                password: this.password
            }).then((response) => {
                this.datos = response.data
                this.gimnasio = JSON.stringify(response.data.usuario);
                localStorage.setItem('token', this.datos.access_token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                //Crypted info
                var infoGym = CryptoJs.AES.encrypt(this.gimnasio, 'hola mundo')
                localStorage.setItem('gimnasio', infoGym) 
                this.$router.push('/')
            }).catch((error) => {
                console.log(response)
                console.log(error)
                if (!error.response.data.errors) {
                    this.er = true
                    this.error_message = error.response.data.message
                    
                } else {
                    this.errors = (error.response.data.errors)
                }
            })
            this.er = false
            this.errors = []
            this.error_message= ''
        },
        checkAuth() {
            let tken = localStorage.getItem('token');
            if (tken !== null) {
                jwt.verify(tken, process.env.MIX_SECRET, (err, decoded) => {
                    if (!err) {
                        this.$router.push('/')
                    } else {
                        vm.forceUpdate()
                        console.log(err.response)
                    }
                });
            }
        }
    }
}

</script>

