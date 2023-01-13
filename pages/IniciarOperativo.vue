<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Iniciar Operativo</div>
      </div>

      <form @submit.prevent="handleSubmitForm">
        <div class="contenedor-fecha-inicio">
          <label class="label-contenedor">Fecha Inicio</label>
          <input
            class="input-fecha"
            type="date"
            v-model="newOperativo.fecha_inicio"
            required
          />
        </div>

        <div class="contenedor-fecha-final">
          <label class="label-contenedor">Fecha Final</label>
          <input
            class="input-fecha"
            type="date"
            v-model="newOperativo.fecha_final"
            required
          />
        </div>

        <div class="contenedor-nombre-operativo">
          <label class="label-contenedor">Nombre del Operativo</label>
          <input
            class="input-text"
            type="text"
            v-model="newOperativo.nombre"
            placeholder="Ingrese nombre Operativo"
            maxlength="32"
            required
          />
        </div>
        <div class="contenedor-selector-sucursal">
          <label class="label-contenedor">Sucursal</label>
          <select
            class="input-select"
            v-model="newOperativo.id_sucursal"
            required
          >
            <option disabled>Seleccione una Sucursal</option>
            <option
              v-for="(sucursal, index) in sucursales"
              :key="index"
              :value="sucursal.id"
            >
              {{ sucursal.nombre }}
            </option>
          </select>
        </div>

        <div class="contenedor-descripcion-operativo">
          <label class="label-contenedor">Descripción del Operativo</label>
          <div class="div-rize">
            <input
              class="input-text-resize"
              type="text"
              v-model="newOperativo.descripcion"
              placeholder="Ingrese descripción del Operativo"
            />
          </div>
        </div>

        <div class="contenedor-boton-cancelar">
          <nuxt-link to="/Operativo">
            <label class="label-boton">Cancelar</label>
          </nuxt-link>
        </div>
        <div class="contenedor-boton-ingresar">
          <button type="submit" class="perimetro-boton-ingresar">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import sidebarMenu from '../components/sidebar-menu.vue'
import authHeader from '../services/auth-header'
export default {
  components: { sidebarMenu },
  middleware: ['authenticated'],
  data: function () {
    return {
      sucursales: [],
      newOperativo: {
        fecha_inicio: '',
        fecha_final: '',
        descripcion: '',
        nombre: '',
        id_usuario: this.$store.state.auth.usuario.user.id,
        id_sucursal: '',
      },
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
    handleSubmitForm() {
      this.$axios
        .post('/operativo', this.newOperativo, { headers: authHeader() })
        .then((res) => {
          alert('Se ha iniciado un operativo correctamente')
          this.$router.push('/Operativo')
        })
        .catch((error) => {
          alert(error)
          console.log(error)
        })
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
.contenedor-fecha-inicio {
  top: 120px;
  left: 20px;
  position: absolute;
}

.contenedor-fecha-final {
  top: 120px;
  left: 400px;
  position: absolute;
}

.contenedor-nombre-operativo {
  top: 250px;
  left: 20px;
  position: absolute;
}

.contenedor-selector-sucursal {
  top: 250px;
  left: 400px;
  position: absolute;
}

.contenedor-descripcion-operativo {
  top: 380px;
  left: 20px;
  position: absolute;
}

.contenedor-boton-cancelar {
  top: 600px;
  left: 20px;
  position: absolute;
  width: 350px;
  height: 83px;
  display: flex;
  overflow: hidden;
  float: none;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  margin-right: 0;
  border-radius: 15px;
  margin-bottom: 0;
  background-color: var(--d1-color-cancel-button);
}

.contenedor-boton-ingresar {
  top: 600px;
  right: 20px;
  position: absolute;
  width: 350px;
  height: 83px;
  display: flex;
  overflow: hidden;
  float: none;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  margin-right: 0;
  border-radius: 15px;
  margin-bottom: 0;
  background-color: var(--dl-color-default-defaultstroke);
}

.div-rize {
  top: 10px;
  width: 750px;
  height: auto;
  display: flex;
  position: relative;
  overflow: auto;
  resize: both;
}

.input-select {
  top: 10px;
  width: 360px;
  height: 40px;
  text-align: center;
  position: relative;
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  font-size: 24px;
}

.input-text-resize {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 24px;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  border-color: var(--dl-color-default-defaultstroke);
  font-family: Poppins;
}

.input-text {
  top: 10px;
  width: 360px;
  text-align: center;
  position: relative;
  display: flex;
  font-size: 24px;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  border-color: var(--dl-color-default-defaultstroke);
  font-family: Poppins;
}

.label-contenedor {
  order: -1;
  color: var(--d1-color-texts);
  height: auto;
  position: relative;
  font-size: 24px;
  align-self: auto;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  line-height: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}

.input-fecha {
  top: 10px;
  width: 360px;
  text-align: center;
  position: relative;
  display: flex;
  font-size: 24px;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  border-color: var(--dl-color-default-defaultstroke);
  font-family: Poppins;
}
.perimetro-boton-ingresar {
  left: 50%;
  transform: translateX(-50%);
  color: var(--d1-color-default-label-button);
  height: 100%;
  width: 100%;
  position: absolute;
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
