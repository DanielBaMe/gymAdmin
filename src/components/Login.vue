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
                            <form @submit="loginSubmit" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login">
                                <error-list :errors="errors"></error-list>
                                <div class="form-group">
                                    <label>Correo electronico</label>
                                    <input class="au-input au-input--full" type="email" v-model="email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <label>Contraseña</label>
                                    <input class="au-input au-input--full" type="password" v-model="password" placeholder="Password">
                                </div>
                                <div class="login-checkbox">
                                    <label>
                                        <router-link to='/password-request'>¿Olvidaste tu contraseña?</router-link>
                                    </label>
                                </div>
                                <button class="au-btn au-btn--block au-btn--green m-b-20" @click.prevent="loginSubmit">Entrar</button>
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
            errors: []
        }
    },
    computed: {
        ...mapState([
            'loggingIn',
            'loginError',
            'token'
        ])
    },
    created() {
        this.checkAuth();
    },
    methods: {
        ...mapActions([
            'doLogin'
        ]),
        loginSubmit(){
            this.doLogin({
                email: this.email,
                password: this.password
            })
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                this.errors = [];
                router.push('/');
            })
            .catch(error => {
                if (error.response.data.message === 'The given data was invalid.') {

                        this.errors = error.response.data.errors;

                    } else if(error.response.data.message === 'Email duplicado') {
                    }
            })
        },
        checkAuth() {
            let token = localStorage.getItem('token');
            if (token !== null) {
                jwt.verify(token, process.env.MIX_SECRET, (err, decoded) => {
                    if (!err) {
                        this.$router.push('/')
                    }
                });
            }
        }
    }
}

</script>

