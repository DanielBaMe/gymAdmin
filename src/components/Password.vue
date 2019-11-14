<template>
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div   class="login-form"> 
                            <form @submit="formSubmit">
                                <div class="form-group">
                                    <label>Le enviaremos una liga para poder restablecer su contraseña</label>
                                    <div v-if="estado" class="alert alert-success w-100">
                                        <span>Se ha enviado el correo</span>
                                        </br>
                                    </div>
                                    <div v-if="error"  class="alert alert-danger w-100">
                                        <span>El correo ingresado no esta registrado en el sistema</span>
                                        </br>
                                    </div>
                                    <input class="au-input au-input--full" type="email" v-model="email" v-on:keyup.enter="submit" placeholder="Correo electronico">
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
export default {

    name: 'Password',
    props: {
        msg: String
    },
    data(){
        return{
            email: '',
            estado: false,
            error: false
        };
    },
    methods: {
        formSubmit(e){
            e.preventDefault();
            axios.post('/password/email',{
                email: this.email
            })
            .then(response => (
                this.estado= true,
                this.error = false
                ))
            .catch(error => (
                console.log(error),
                this.error= true,
                this.estado = false
                ))
            this.email = '';
        }
    }
}

</script>
