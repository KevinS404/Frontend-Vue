<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Operativo</div>
      </div>

      <button class="boton">
        <span class="texto-boton" @click="volver()">Volver</span>
      </button>
    </div>

    <div class="contenedor-informacion">
      <div class="grupo-nombre">
        <span class="label-titulo">Nombre</span>
        <span class="label-info"> {{ operativo.nombre }} </span>
      </div>

      <div class="grupo-fecha-inicio">
        <span class="label-titulo">Fecha Inicio</span>
        <span class="label-info">
          {{ operativo.fecha_inicio.split('T')[0] }}
        </span>
      </div>

      <div class="grupo-fecha-final">
        <span class="label-titulo">Fecha Final</span>
        <span class="label-info">
          {{ operativo.fecha_final.split('T')[0] }}
        </span>
      </div>

      <div class="grupo-sucursal">
        <span class="label-titulo">Sucursal</span>
        <span v-for="(sucursal, index) in sucursales" :key="index"
          ><span v-if="sucursal.id == operativo.id_sucursal" class="label-info">
            {{ sucursal.nombre }}
          </span></span
        >
      </div>
    </div>
    <div class="grupo-descripcion">
      <span class="label-titulo">Descripcion</span>
      <span class="label-info"> {{ operativo.descripcion }} </span>
    </div>

    <div class="contenedor-listado-ordenes">
      <span class="label-titulo">Lista de Ordenes</span>
      <nuxt-link to="/OrdenOperativo">
        <div class="botonIngresar">
          <span class="texto-botonIngresar">Ingresar Nueva Orden</span>
        </div>
      </nuxt-link>

      <div class="fila">
        <span class="columna">RUT</span>
        <span class="columna">Nombre Paciente</span>
        <span class="columna">Fono</span>
        <span class="columna">Lote</span>
      </div>

      <div class="fila" v-for="(orden, index) in ordenes" :key="index">
        <span class="columna"> {{ orden.rut }} </span>
        <span class="columna"> {{ orden.nombre }} </span>
        <span class="columna"> {{ orden.fono }} </span>
        <span class="columna"> {{ orden.lote }} </span>
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
      operativo: {},
      ordenes: [],
      sucursales: [],
    }
  },
  methods: {
    getData: async function () {
      this.operativo = this.$store.getters['page/getIdOperativo']

      try {
        let response = await this.$axios.get('/sucursal', {
          headers: authHeader(),
        })
        this.sucursales = response.data
        response = await this.$axios.get(
          '/orden/operativo/' + this.operativo.id,
          {
            headers: authHeader(),
          }
        )
        this.ordenes = response.data
      } catch (error) {
        console.log('Error al obtener los datos', error)
      }
    },
    volver() {
      this.$store.commit('page/setOperativo', {})
      this.$router.push('/Operativo')
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
  top: 100px;
  left: 20px;
  width: 220px;
  height: 85px;
  position: absolute;
  color: var(--dl-color-gray-black);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: 15px;
  background-color: var(--dl-color-default-defaultstroke);
}

.botonIngresar {
  width: auto;
  height: 85px;
  position: relative;
  color: var(--dl-color-gray-black);
  display: inline-block;
  margin: 10px;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: 15px;
  background-color: var(--dl-color-default-defaultstroke);
}

.texto-boton {
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

.texto-botonIngresar {
  top: 15px;
  position: relative;
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
  text-decoration: none;
  margin: 10px;
}

.label-info {
  top: 5px;
  text-align: center;
  position: relative;
  display: flex;
  font-size: 24px;
  align-self: auto;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
}

.contenedor-informacion {
  top: 200px;
  left: 20px;
  width: auto;
  height: auto;
  justify-content: left;
  flex-wrap: wrap;
  display: flex;
  position: relative;
}

.grupo-nombre {
  order: -1;
  display: table-cell;
  position: relative;
  float: left;
}

.grupo-fecha-inicio {
  order: -1;
  display: table-cell;
  position: relative;
  float: left;
  margin-left: 50px;
}

.grupo-fecha-final {
  order: -1;
  display: table-cell;
  position: relative;
  float: left;
  margin-left: 50px;
}

.grupo-sucursal {
  order: -1;
  display: table-cell;
  position: relative;
  float: left;
  margin-left: 50px;
}

.grupo-descripcion {
  top: 240px;
  left: 20px;
  width: auto;
  height: auto;
  position: relative;
}

.contenedor-listado-ordenes {
  top: 300px;
  left: 20px;
  width: auto;
  height: auto;
  position: relative;
}
</style>
