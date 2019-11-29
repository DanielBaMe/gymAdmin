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
                            <form @submit.prevent="loginSubmit" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login">
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
import { mapState, mapActions } from 'vuex';
import ErrorsList from './ErrorsList.vue'

export default {
    components: {
        'error-list': ErrorsList
    },
    data(){
        return{
            email: '',
            password: '',
            errors: [],
            er: false,
            eo: false,
            error_message: ''
        }
    },
    computed: {
        ...mapState([
            'token'
        ])
    },
    created() {
        this.checkAuth();
        let gimnasio = localStorage.getItem('gimnasio')
        let json = JSON.parse(gimnasio)
        console.table(json)
    },
    methods: {
        loginSubmit(){
            axios.post('/login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.access_token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                this.updateAccessToken = response.data.access_token;
                //Crypted info
                let gimnasio = JSON.stringify(response.data.usuario);
                var infoGym = CryptoJs.AES.encrypt(gimnasio, 'hola mundo')
                localStorage.setItem('gimnasio', infoGym) 

                this.$router.push('/');
            })
            .catch(error => {
                console.log(error.response)
                if (!error.response.data.errors) {
                    this.er = true
                    this.error_message = error.response.data.message
                    
                } else{
                    this.errors = (error.response.data.errors)
                }
                console.log(error.response)
            })
            this.er = false
            this.errors = []
            this.error_message= ''
        },
        checkAuth() {
            let token = localStorage.getItem('token');
            if (token !== null) {
                jwt.verify(token, process.env.MIX_SECRET, (err, decoded) => {
                    if (!err) {
                        this.$router.push('/')
                    } else {
                        vm.$forceUpdate();
                        console.log(err.response)
                    }
                });
            }
        }
    }
}

</script>

