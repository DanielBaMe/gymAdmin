<template>
    <aside class="menu-sidebar d-none d-lg-block ">
        <div class="logo">
            <a href="/">
                <img src="images/icon/logo.png" alt="Cool Admin" />
            </a>
        </div>
        <div class="menu-sidebar__content js-scrollbar1 ">
            <nav class="navbar-sidebar">
                <ul class="list-unstyled navbar__list">
                    <li class="active has-sub">
                        <a class="js-arrow" href="#">
                            <i class="fas fa-tachometer-alt"></i>Perfil</a>
                        <ul class="list-unstyled navbar__sub-list js-sub-list">
                            <li>
                                <router-link to="/edit-info">Editar información del gimnasio</router-link>
                            </li>
                            <li>
                                <a href="index2.html">Actualizar tipo de plan</a>
                            </li>
                            <li>
                                <a href="index3.html">Pagar plan</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/gestionar-coaches">
                        <i class="fas fa-chart-bar"></i>Gestionar coaches</router-link>
                    </li>
                    <li>
                        <router-link to="/miembros">
                        <i class="fas fa-table"></i>Miembros</router-link>
                    </li>
                    <li>
                        <router-link to='/servicios'>
                            <i class="far fa-check-square"></i>Servicios</router-link>
                    </li>
                    <li>
                        <router-link to="/planes">
                            <i class="fas fa-calendar-alt"></i>Planes</router-link>
                    </li>
                    <li>
                        <a href="map.html">
                            <i class="fas fa-map-marker-alt"></i>Pagos</a>
                    </li>
                    <li>
                        <router-link to="/eventos">
                            <i class="fas fa-copy"></i>Eventos</router-link>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logout">
                            <i class="fa fa-sign-out-alt"></i> Salir
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default{

    computed: {
    ...mapState([
        'loggingIn',
        'loginError',
        'token'
    ])
    },
    created(){

    },
    methods:{
        logout(){
            axios.get('/logout')
            .then(response => {
                localStorage.removeItem('token')
                localStorage.removeItem('gimnasio')
                this.$router.push('/login')
            })
            .catch(e => {
                console.log(e);
            })
            
        }
    }
}
</script>