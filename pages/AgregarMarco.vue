<template>
  <div class="agregar-marco-container">
    <sidebar-menu />
    <div class="agregar-marco-agregar-marco">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Agregar un Marco</div>
      </div>
      <form @submit.prevent="handleSubmitForm" id="formulario">
        <div class="grupo-sucursal">
          <span class="marco-sucursal"><span>Sucursal</span></span>
          <select
            class="custom-select3"
            v-model="newMarco.id_sucursal"
            required
          >
            <option disabled>Selecione una Sucursal</option>
            <option
              v-for="(sucursal, index) in sucursales"
              :key="index"
              :value="sucursal.id"
            >
              {{ sucursal.nombre }}
            </option>
          </select>
        </div>
        <div class="grupo-marca">
          <span class="titulo-marca">Marca</span>
          <select
            class="custom-select4"
            v-model="newMarco.id_marca_marco"
            required
          >
            <option disabled>Selecione una Marca</option>
            <option
              v-for="(marca, index) in marcas"
              :key="index"
              :value="marca.id"
            >
              {{ marca.nombre }}
            </option>
          </select>
        </div>
        <div class="grupo-modelo">
          <span class="agregar-marco-text02"><span>Modelo</span></span>
          <select
            class="custom-select"
            id="modeloSelecionado"
            v-model="newMarco.id_modelo_marca"
            required
          >
            <option disabled>Selecione un modelo</option>
            <option
              v-for="(modelo, index) in filtrarModelos"
              :key="index"
              :value="modelo.id"
            >
              {{ modelo.codigo }}
            </option>
          </select>
        </div>
        <div class="grupo-color">
          <span class="agregar-marco-text04">Color</span>
          <select
            class="custom-select2"
            id="codigoSelecionado"
            v-model="newMarco.id_codigo_color"
            required
          >
            <option disabled>Seleccione codigo Color</option>
            <option
              v-for="(color, index) in filtrarColores"
              :key="index"
              :value="color.id"
            >
              {{ color.codigo }}, {{ color.nombre_alias }}
            </option>
          </select>
        </div>
        <!--
        <div class="grupo-observaciones">
          <span class="agregar-marco-text06"><span>Observaciones</span></span>
          <div class="agregar-marco-frame5">
            <input
              class="agregar-marco-text08"
              id="aliasColor"
              v-model="observaciones"
              placeholder="Ingrese observaciones"
            />
          </div>
        </div>
        -->
        <nuxt-link to="/InventarioMarco">
          <div class="agregar-marco-cancelar">
            <span class="agregar-marco-text10"><span>Cancelar</span></span>
          </div>
        </nuxt-link>
        <div class="agregar-marco-ingresar">
          <button type="submit" class="agregar-marco-text12">
            <span>Ingresar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authHeader from '../services/auth-header'
export default {
  name: 'AgregarMarco',
  head: {
    title: 'exported project',
  },
  middleware: ['authenticated'],
  data: function () {
    return {
      modeloSeleccionado: '',
      codigoSeleccionado: '',
      aliasColor: '',
      respuesta: '',
      sucursales: [],
      marcas: [],
      modelos: [],
      colores: [],
      newMarco: {
        estado_de_marco: 'En inventario',
        observaciones: [],
        costo: 0,
        id_modelo_marca: '',
        id_marca_marco: '',
        id_codigo_color: '',
        id_sucursal: '',
        id_orden: '',
        cantidad: 1,
        lotes: [0],
      },
    }
  },
  methods: {
    handleSubmitForm() {
      this.$axios
        .post('/marco', this.newMarco, { headers: authHeader() }) //Se realiza post con el objeto newMarco como parametro asimilando el formato json
        .then((res) => {
          this.respuesta = 'Se ha agregado correctamente el Marco'
          window.location.reload()
          alert(this.respuesta)
        })
        .catch((error) => {
          alert(error)
          console.log(error)
        })
    },
    getData: async function () {
      try {
        let response = await this.$axios.get('/sucursal', {
          headers: authHeader(),
        })
        this.sucursales = response.data

        response = await this.$axios.get('/marca_marco', {
          headers: authHeader(),
        })
        this.marcas = response.data
        response = await this.$axios.get('/modelo_marca', {
          headers: authHeader(),
        })
        this.modelos = response.data
        response = await this.$axios.get('/color_marca', {
          headers: authHeader(),
        })
        this.colores = response.data
      } catch (error) {
        console.log('Error al obtener los datos', error)
      }
    },
  },
  created: function () {
    //Inicia las funciones al cargar la pagina
    this.getData()
  },
  computed: {
    filtrarModelos() {
      //Funcion que permite filtar los modelos segun el modelo seleccionado
      return this.modelos.filter(
        (modelo) => modelo.id_marca_marco == this.newMarco.id_marca_marco
      )
    },
    filtrarColores() {
      return this.colores.filter(
        (color) => color.id_marca_marco == this.newMarco.id_marca_marco
      )
    },
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

<style scoped>
.agregar-marco-container {
  min-height: 100vh;
}
.agregar-marco-agregar-marco {
  width: 100%;
  height: 1080px;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  border-radius: 0px 0px 0px 0px;
  background-color: rgba(255, 255, 255, 1);
}

.agregar-marco-text02 {
  color: var(--d1-color-texts);
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.marco-sucursal {
  color: var(--d1-color-texts);
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
/*Estilo Selector */
.custom-select {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  top: 36px;
  color: var(--dl-color-default-defaultstroke);
  width: 360px;
  height: 40px;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  text-align: center;
  font-family: Poppins;
  font-style: Thin;
  font-weight: 400; /* Agregando o sumando a esta variable da mas o menos grosor a la letra - 100 es thin - 400 es normal - 700 bold - 900 heavy*/
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}

.custom-select2 {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  top: 36px;
  color: var(--dl-color-default-defaultstroke);
  width: 360px;
  height: 40px;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  text-align: center;
  font-family: Poppins;
  font-style: Thin;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}

.custom-select3 {
  top: 36px;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  color: var(--dl-color-default-defaultstroke);
  width: 360px;
  height: 40px;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  text-align: center;
  font-family: Poppins;
  font-style: Thin;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}

.custom-select4 {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  top: 36px;
  color: var(--dl-color-default-defaultstroke);
  width: 360px;
  height: 40px;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  text-align: center;
  font-family: Poppins;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}

.custom-select select {
  display: none;
}

.agregar-marco-text04 {
  color: var(--d1-color-texts);
  height: auto;
  width: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}

.agregar-marco-cancelar {
  top: 40%;
  left: 20px;
  width: 218px;
  height: 83px;
  display: flex;
  overflow: hidden;
  position: absolute;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  margin-right: 0;
  border-radius: 15px;
  margin-bottom: 0;
  background-color: var(--d1-color-cancel-button);
}
.agregar-marco-text10 {
  top: 18px;
  left: 35px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  align-self: auto;
  font-style: Regular;
  text-align: center;
  font-family: Poppins;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.agregar-marco-ingresar {
  top: 40%;
  left: 50%;
  width: 218px;
  height: 83px;
  display: flex;
  overflow: hidden;
  position: absolute;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  margin-right: 0;
  border-radius: 15px;
  margin-bottom: 0;
  background-color: var(--dl-color-default-defaultstroke);
}
.agregar-marco-text12 {
  top: 18px;
  left: 43px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  align-self: auto;
  font-style: Regular;
  text-align: center;
  font-family: Poppins;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}


.grupo-modelo {
  top: 250px;
  left: 400px;
  width: auto;
  height: auto;
  position: absolute;
}

.grupo-sucursal {
  top: 120px;
  left: 20px;
  width: auto;
  height: auto;
  position: absolute;
}

.grupo-marca {
  top: 250px;
  left: 20px;
  width: auto;
  height: auto;
  position: absolute;
}

.grupo-color {
  top: 250px;
  left: 780px;
  width: auto;
  height: auto;
  position: absolute;
}

.titulo-marca {
  color: var(--d1-color-texts);
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
</style>
