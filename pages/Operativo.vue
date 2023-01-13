<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Operativos</div>
      </div>

      <div class="boton">
        <nuxt-link to="/IniciarOperativo">
          <label class="label-boton">Iniciar Operativo</label>
        </nuxt-link>
      </div>

      <div class="contenedor-listado">
        <label class="label-titulo">Lista de Operativos</label>

        <div class="fila">
          <span class="columna">Nombre</span>
          <span class="columna">Fecha inicio</span>
          <span class="columna">Fecha Final</span>
          <span class="columna">Sucursal</span>
          <span class="columna">Acción</span>
        </div>

        <div class="fila" v-for="(operativo, index) in operativos" :key="index">
          <span class="columna"> {{ operativo.nombre }} </span>
          <span class="columna">
            {{ operativo.fecha_inicio.split('T')[0] }}
          </span>
          <span class="columna">
            {{ operativo.fecha_final.split('T')[0] }}
          </span>
          <span v-for="(sucursal, indice) in sucursales" :key="indice">
            <span class="columna" v-if="sucursal.id == operativo.id_sucursal">
              {{ sucursal.nombre }}
            </span>
          </span>
          <div class="columna">
            <button class="boton-ir" @click="irAOperativo(operativo)">
              Ir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarMenu from '../components/sidebar-menu.vue'
import authHeader from '../services/auth-header'
export default {
  components: { sidebarMenu },
  middleware: ['authenticated'],
  data() {
    return {
      operativos: [],
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
        response = await this.$axios.get('/operativo', {
          headers: authHeader(),
        })
        this.operativos = response.data
      } catch (error) {
        console.log('Error al obtener los datos', error)
      }
    },
    irAOperativo(operativo) {
      this.$store.commit('page/setOperativo', operativo)
      this.$router.push('/InfoOperativo')
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
  top: 140px;
  left: 20px;
  position: relative;
}

.label-boton {
  position: absolute;
}

.contenedor-listado {
  top: 270px;
  left: 20px;
  width: auto;
  height: auto;
  position: relative;
}

.listado-label {
  font-size: 40px;
  font-weight: 700;
  color: var(--d1-color-texts);
}

.columna {
  width: 300px;
}

.boton-ir {
  color: var(--dl-color-gray-black);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: 4px;
  background-color: var(--dl-color-default-defaultstroke);
  color: var(--d1-color-default-label-button);
}
</style>
