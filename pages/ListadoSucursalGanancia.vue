<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Ganancias Sucursales</div>
      </div>

      <div class="boton">
        <nuxt-link to="/GananciasyVentas"
          ><span class="label-boton">Volver</span></nuxt-link
        >
      </div>

      <label class="label-titulo">Sucursales</label>

      <div class="listado">
        <div class="fila">
          <span class="columna"> Caldera </span>
          <div class="columna">
            <button class="boton">
              <nuxt-link to="/GananciasGraficaCaldera" class="label-botonV">
                Ir
              </nuxt-link>
            </button>
          </div>
        </div>
        <div class="fila">
          <span class="columna"> Maipú </span>
          <div class="columna">
            <button class="boton">
              <nuxt-link to="/GananciasGraficaMaipu" class="label-botonV">
                Ir
              </nuxt-link>
            </button>
          </div>
        </div>
        <div class="fila">
          <span class="columna"> Marchihue </span>
          <div class="columna">
            <button class="boton">
              <nuxt-link to="/GananciasGraficaMarchihue" class="label-botonV">
                Ir
              </nuxt-link>
            </button>
          </div>
        </div>
        <div class="fila">
          <span class="columna"> Salamanca </span>
          <div class="columna">
            <button class="boton">
              <nuxt-link to="/GananciasGraficaSalamanca" class="label-botonV">
                Ir
              </nuxt-link>
            </button>
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

.label-boton {
  position: absolute;
}

.label-botonV {
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--d1-color-default-label-button);
  height: 100%;
  width: 100%;
  font-size: 32px;
  align-self: auto;
  text-align: center;
  font-family: Poppins;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-bottom: 0;
  text-decoration: none;
}
</style>