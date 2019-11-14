<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
    <div class="page-wrapper">
        <HeaderDesktop/>
        <div class="page-content--bge5 pt-4 ">
            <div class="container pt-4 ">
                <div class="login-wrap">
                    <div class="login-content w-50">
                        <div   class="login-form"> 
                            <form @submit="formSubmit">
                                <div class="form-group">
                                    <label>Nombre del servicio</label>
                                    <input class="au-input au-input--full" type="text" v-model="servicio" placeholder="Servicio">
                                    <label>Precio</label>
                                    <input class="au-input au-input--full" type="int" v-model="precio" placeholder="Precio">
                                    <label>Descripción</label>
                                    <textarea  class="au-input au-input--full" type="text" cols="30" rows="5" v-model="descripcion" placeholder="Descripción"></textarea>
                                </div>
                            </form>
                            <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit">Enviar</button>
                        </div>
        <div class="container p-5 w-50 float-sm-right mh-100 ">
            <table class="table table-bordered">
                <thead class="thead-dark">
                <tr>
                    <th>Servicio</th>
                    <th>Precio</th>
                    <th>Descripcion</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                </tr>
                <tr>
                    <td>July</td>
                    <td>Dooley</td>
                    <td>july@example.com</td>
                </tr>
                </tbody>
            </table>
        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
import HeaderMobile from './HeaderMobile'
import MenuSidebar from './MenuSidebar'
import HeaderDesktop from './HeaderDesktop'

export default {
    name: 'Servicios',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop
    },
    data(){
        return{
            servicio:'',
            precio:'',
            descripcion:''
        };
    },
    methods:{
        formSubmit(e){
            e.preventDefault();
            axios.post('/password/email',{
                servicio: this.servicio,
                precio: this.precio,
                descripcion: this.descripcion
            })
            .then(response => (this.info = response))
            .catch(error => console.log(error))
        }
    }
}

</script>