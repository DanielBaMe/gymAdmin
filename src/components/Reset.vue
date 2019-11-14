<template>
<div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <router-link to="/"> <img src="/assets/logo.png" alt="CoolAdmin"></router-link>
                        </div>
                            <div class="login-form"> 
                                <form @submit="formSubmit">
                                    <div class="form-group">
                                        <label>Dirección de correo electronico</label>
                                        <input class="au-input au-input--full" type="email" v-model="email" placeholder="Email">
                                        <br/>
                                        <br/>
                                        <label>Contraseña nueva</label>
                                        <input class="au-input au-input--full" type="password" v-model="password" placeholder="Password">
                                        <br/>
                                        <br/>
                                        <error-list :errors="errors.password"></error-list>
                                        <label>Confirmar contraseña</label>
                                        <input class="au-input au-input--full" type="password" v-model="confirm" placeholder="Confirm password">
                                    </div>
                                </form>
                                <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit" @click.prevent="formSubmit">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import ErrorsList from './ErrorsList.vue'
export default {

    name: 'Password',
    props: ['token'],
    components: {
        'error-list': ErrorsList
    },
    data(){
        return{
            email: '',
            password: '',
            confirm: '',
            errors: [],
            er: false
        };
    },
    methods: {
        formSubmit(){
            axios.post('/password/reset',{
                token: this.token,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirm
            })
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                this.$router.push('/login');
            })
            .catch(error => {
                this.errors = (error.response.data)
                this.er = true
            })
    }
}
}
</script>