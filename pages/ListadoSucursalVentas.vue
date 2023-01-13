<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Ventas Sucursales</div>
      </div>

      <div class="boton">
        <nuxt-link to="/GananciasyVentas"
          ><span class="label-boton">Volver</span></nuxt-link
        >
      </div>

      <label class="label-titulo">Sucursales</label>

      <div class="listado">
        <div class="fila" v-for="(sucursal, index) in sucursales" :key="index">
          <span class="columna"> {{ sucursal.nombre }} </span>
          <div class="columna">
            <button class="boton">Ir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authHeader from '../services/auth-header'
export default {
  middleware: ['authenticated'],
  data() {
    return {
      sucursales: [],
    }
  },
  methods: {
    getData: async function () {
      try {
        let response = await this.$axios.get('/sucursal', {
          headers: authHeader(),
        })
        this.sucursales = response.data
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

<style>
.boton {
  left: 20px;
  top: 40px;
  margin: 0px;
  position: relative;
}

.label-titulo {
  left: 20px;
  top: 50px;
  position: relative;
}

.fila {
  left: 20px;
  top: 100px;
  position: relative;
}

.columna {
  width: 200px;
}

.columna .boton {
  width: 100px;
  margin: 0px;
  position: static;
}
</style>