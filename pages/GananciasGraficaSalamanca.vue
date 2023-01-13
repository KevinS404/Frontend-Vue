<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Grafico Ganancias</div>
      </div>
      <div class="chart-div">
        <line-chart
          :chartData="listaGanancias"
          :options="chartOptions"
          :chartColors="listaGananciaChartColors"
          :key="listaGanancias.length"
          label="Ganancias"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from '../components/LineChart.vue'
import sidebarMenu from '../components/sidebar-menu.vue'

export default {
  name: 'IndexPage',
  middleware: ['authenticated'],
  components: {
    LineChart,
    sidebarMenu,
  },
  data: function () {
    return {
      listaGanancias: [],
      listaGananciaChartColors: {
        borderColor: '#077187',
        pointBorderColor: '#0E1428',
        pointBackgroundColor: '#AFD6AC',
        backgroundColor: '#74A57F',
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  methods: {
    getData: async function () {
      try {
        const { data } = await axios.get(
          'https://run.mocky.io/v3/36b116e3-36cd-4718-9c61-72ef6f272e54'
        )

        data.forEach((d) => {
          const totalResta = d.total - d.gasto
          const fecha = d.fecha
          this.listaGanancias.push({ date: fecha, total: totalResta })
        })
      } catch (error) {
        console.log('Error al obtener los datos', error)
      }
    },
  },
  created: function () {
    this.getData()
  },
  computed: {
    tokenExpired: async function () {
      let promise = await this.$axios.post(
        '/api/auth/tokenExpired',
        this.$store.state.auth.usuario.user
      )

      let promiseResolve = Promise.resolve(promise)

      return promiseResolve
    },
  },
  mounted() {
    this.tokenExpired.then((valor) => {
      if (valor.data) {
        this.$store.dispatch('auth/logout').then(
          () => {
            this.$router.push('/Login')
          },
          (error) => {
            alert(error)
          }
        )
      }
    })
  },
}
</script>

<style></style>
