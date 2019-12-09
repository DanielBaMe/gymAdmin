<template>
    <div class="page-wrapper">
        <HeaderMobile/>
        <MenuSidebar/>
        <div class="page-container">
            <HeaderDesktop/>
            <div class="main-content">
                <div class="">
                    <div class="row mb-5">
                        <div class="col"></div>
                        <div class="col">
                            <h3>Estado del servicio</h3>
                            <br/>
                                <span class="alert alert-success w-100">{{datos.estado}}</span>
                            <br/>
                        </div>
                        <div class="col">
                            <h3>Tipo de plan</h3>
                            <p>{{datos.id_plan}}</p>   
                            <br/>      
                        </div>
                        <div class="col">
                            <h3>Fecha de expiración</h3>
                            <p>{{datos.fecha_expiracion}}</p>
                            <br/>
                        </div>
                        <div class="col"></div>
                        </div>
                </div>
                <div class="">
                    <div class="au-card m-b-30 ml-5 mr-5">
                        <div class="au-card-inner">
                            <h3 class="title-2 m-b-40">Miembros nuevos</h3>
                            <p>Total de miembros por año: {{this.tma}}</p>
                            <p>Total de miembros por mes: {{this.tmm}}</p>
                            <canvas id="grafica"></canvas>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="au-card m-b-30 ml-5 mr-5">
                        <div class="au-card-inner">
                            <h3 class="title-2 m-b-40">Planes mas utilizados en el mes</h3>
                            <p>Nombre: {{this.nombrePlan}}</p>
                            <p>Cantidad de personas en el plan: {{this.total}}</p>
                            <canvas id="planes"></canvas>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="au-card m-b-30 ml-5 mr-5">
                        <div class="au-card-inner">
                            <h3 class="title-2 m-b-40">Servicios mas utilizados</h3>
                            <canvas id="servicios"></canvas>
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
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'Inicio',
    components: {
        HeaderMobile,
        MenuSidebar,
        HeaderDesktop
    },
    data(){
        return {
            datos: [],
            estado: false,
            miembros: [],
            m: [],
            tma: '',
            tmm: '',
            nombrePlan: [],
            pl: [],
            idPlan: '',
            total: [],
            planes: [],
            servicios: [],
            nombreS: [],
            totales: [],
            totalS: [],
            array: []
        };
    },
    created(){
        this.verifyToken();
        this.pagos('grafica', 'servicios', 'planes');
        this.obtenerDatos();
    },
    methods:{
        ...mapActions([
            'getToken'
        ]),
        verifyToken(){
            this.getToken()
        },
        obtenerDatos(){
            axios.get('/perfil')
            .then((response) =>
            {   
                this.datos = response.data.contrato;
                if(this.datos.estado === 'Activo'){
                    this.estado = true
                }
            }).catch(function (error){
                console.log(error);
            })
        },
        pagos(chartId, chartI, cI){
            axios.get('')
            .then(response => {
                //Miembros
                this.miembros = response.data.miembros.data_chart_anio;
                this.tma = response.data.miembros.total_miembros_anio;
                this.tmm = response.data.miembros.total_miembros_mes;

                //Planes
                this.planes = response.data.planes
                this.pl = Object.keys(this.planes).map(i => this.planes[i])
                for (let index = 0; index < this.pl.length; index++) {
                    this.nombrePlan.push(this.planes[index]["nombre"])
                    this.total.push(this.planes[index]["total"])
                    
                }

                //Servicios
                this.servicios = response.data.servicios;
                this.array = Object.keys(this.servicios).map(i => this.servicios[i])
                for (let index = 0; index < this.array.length; index++) {
                    this.nombreS.push(this.array[index].nombre);
                    this.totales.push(this.array[index]["total"]);
                }
                console.log(this.nombreS)
                console.log(this.totales)
                for (let index = 0; index < 12; index++) {
                    this.m.push(this.miembros[index].categorie_value);
                    
                }

                //Llamando a las funciones para graficar
                this.graficaMiembros(chartId, this.m)
                this.graficaServicios(chartI, this.totales, this.nombreS)
                this.graficaPlanes(cI, this.nombrePlan, this.total)
            }).catch(error => {
                console.log(error)
            })
        },
        graficaMiembros(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            ctx.height = 150;
            const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    type: 'line',
                    defaultFontFamily: 'Poppins',
                    datasets: [
                    { // one line graph
                        data: chartData,
                        label: 'Miembros ingresados',
                        backgroundColor: 'rgba(0,103,255,.15)',
                        borderColor: 'rgba(0,103,255,0.5)',
                        borderWidth: 3.5,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(0,103,255,0.5)',
                    },
                    ]
            },
            options: {
                responsive: true,
                    tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#000',
                        bodyFontColor: '#000',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Poppins',
                        bodyFontFamily: 'Poppins',
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        position: 'top',
                        labels: {
                        usePointStyle: true,
                        fontFamily: 'Poppins',
                        },
                    },
                    scales: {
                        xAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            fontFamily: "Poppins"
                        }
                        }],
                        yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Cantidad',
                            fontFamily: "Poppins"
                        },
                        ticks: {
                            fontFamily: "Poppins"
                        }
                        }]
                    },
                    title: {
                        display: false,
                    }
            },
            });
        },
        graficaServicios(chartId, chartData, nombre) {
            const ctx = document.getElementById(chartId);
            ctx.height = 150;
            const myChart = new Chart(ctx, {
            type: 'bar',
            defaultFontFamily: 'Poppins',
            data: {
                labels: nombre,
                datasets: [
                    { // one line graph
                        data: chartData,
                        borderColor: "rgba(0, 123, 255, 0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(0, 123, 255, 0.5)"
                    },
                    ]
            },
            options: {
                responsive: true,
                    tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#000',
                        bodyFontColor: '#000',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Poppins',
                        bodyFontFamily: 'Poppins',
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        position: 'top',
                        labels: {
                        usePointStyle: true,
                        fontFamily: 'Poppins',
                        },
                    },
                    scales: {
                        xAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            fontFamily: "Poppins"
                        }
                        }],
                        yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Cantidad',
                            fontFamily: "Poppins"
                        },
                        ticks: {
                            fontFamily: "Poppins",
                            suggestedMin: 0
                        }
                        }]
                    },
                    title: {
                        display: false,
                    }
            },
            });
        },
        graficaPlanes(chartId, chartData, cantidad) {
            const ctx = document.getElementById(chartId);
            ctx.height = 150;
            const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chartData,
                defaultFontFamily: 'Poppins',
                datasets: [
                { // one line graph
                    data: cantidad,
                    backgroundColor: 
                    [
                    "rgba(0, 123, 255,0.9)",
                    "rgba(0, 123, 255,0.7)",
                    "rgba(0, 123, 255,0.5)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(0, 123, 255,0.9)",
                        "rgba(0, 123, 255,0.7)",
                        "rgba(0, 123, 255,0.5)",
                    ],
                    borderWidth: 3.5,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'rgba(0,103,255,0.5)',
                },
                ]
            },
            options: {
                responsive: true,
                    tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#000',
                        bodyFontColor: '#000',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Poppins',
                        bodyFontFamily: 'Poppins',
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        position: 'top',
                        labels: {
                        usePointStyle: true,
                        fontFamily: 'Poppins',
                        },
                    },
                    scales: {
                        xAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            fontFamily: "Poppins"
                        }
                        }],
                        yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Cantidad',
                            fontFamily: "Poppins"
                        },
                        ticks: {
                            fontFamily: "Poppins"
                        }
                        }]
                    },
                    title: {
                        display: false,
                    }
            },
            });
        }
    }
};
</script>