<template>
<div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <router-link to="/"> <img src="/images/smartgym-logo.png" alt="CoolAdmin"></router-link>
                        </div>
                        <div v-if="loginError !== null" class="row">
                            <span class="alert alert-danger col-md-12">{{ loginError }}</span>
                        </div>
                        <div class="login-form">
                            <form @submit="loginSubmit" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login">
                                
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

export default {

    data(){
        return{
            email: '',
            password: ''
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

