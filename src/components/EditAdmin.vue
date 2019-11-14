<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="d-flex justify-content-around">
                <form @submit="editInfo" method="post" action="https://smartgym.infornet.mx/api/gimnasio/login">
                    <error-list :errors="errors.nombre"></error-list>
                    <h3>Nombre:     {{datos.nombre}}</h3>                   
                    <input name='nombre' id='nombre' class="au-input au-input" type="text" v-model="nombre" placeholder='Editar nombre'>
                    </br>
                    </br>
                    <error-list :errors="errors.telefono"></error-list>
                    <h3>Telefono:       {{datos.telefono}}</h3>
                    <input name='telefono' id='telefono' class="au-input au-input" type="text" v-model="telefono" placeholder='Editar telefono'>
                    </br>
                    </br>
                    <error-list :errors="errors.email"></error-list>
                    <h3>Correo electronico: {{datos.email}}</h3>
                    <input name='email' id='email' class="au-input au-input" type="text" v-model="correo" placeholder='Editar correo'>
                    <div v-if="confirmacion" class="alert alert-success w-100">
                        <span>Se han editado los datos satisfactoriamente</span>
                        </br>
                    </div>
                    </br>
                    </br>
                    <button class="au-btn au-btn--block au-btn--green m-b-20 w-50" @click.prevent="editInfo">Entrar</button>
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
            datos: [],
            nombre: '',
            telefono: '',
            correo: '',
            confirmacion: false,
            errors: []
        };
    },
    mounted(){
        axios.get('/perfil')
        .then(response => console.log(response.data))
    },
    created(){
        this.obtenerDatos();
    },
    methods:{
        obtenerDatos(){
            axios.get('/perfil')
            .then((response) =>
            {   
                this.datos = response.data.gimnasio
                console.log(response.data)
                console.log(this.datos)
            }).catch(function (error){
                console.log('Error: ' + error);
            })
        },
        editInfo(){
            // let nom = $('#name').val();
            // let tel = $('#telefono').val();
            // let em = $('#email').val();
            // if(this.email === ''){
            //     email: datos.email
            // }
            // if(this.nombre === ''){
            //     nombre: datos.nombre
            // }
            // if(this.telefono === ''){
            //     telefono: datos.telefono
            // }
            axios.post('/perfil',
            {
                nombre: this.nombre,
                telefono: this.telefono,
                email: this.correo
            })
            .then( response => {
                console.log(response)
                this.confirmacion= true
            })
            .catch(error=>{
                this.errors = (error.response.data)
            })
        }
    }
};
</script>