<template>
  <div class="inventario-marco-container">
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Inventario Marcos</div>
      </div>
      <nuxt-link to="/Inventario">
        <div class="inventario-marco-visualizar">
          <span class="inventario-marco-text02"><span>Volver</span></span>
        </div>
      </nuxt-link>
      <nuxt-link to="/AgregarMarco">
        <div class="inventario-marco-ingresar-marco">
          <span class="inventario-marco-text04">
            <span>Ingresar Nuevo Marco</span>
          </span>
        </div>
      </nuxt-link>
      <div class="inventario-marco-text06">
        <span class="label-listado">Listado</span>

        <v-btn
          color="primary"
          dark
          class="boton-descarga"
          @click="descargarExcel()"
        >
          Descargar inventario</v-btn
        >

        <div class="grupo-selector-sucursal">
          <span>Sucursal</span>
          <select class="custom-select" v-model="id_sucursal">
            <option disabled>Selecione una Sucursal</option>
            <option>Todas</option>
            <option
              v-for="(sucursal, index) in listadoSucursales"
              :key="index"
              :value="sucursal.id"
            >
              {{ sucursal.nombre }}
            </option>
          </select>
        </div>
      </div>

      <div class="Contenedor">
        <div v-if="id_sucursal == 'Todas'">
          <div class="fila">
            <span class="columna">Cantidad</span>
            <span class="columna">Marca</span>
            <span class="columna">Modelo</span>
            <span class="columna">Color</span>
            <span class="columna">Sucursal</span>
            <span class="columna">Lotes</span>
          </div>
          <div
            class="fila"
            v-for="(marco, index) in listadoMarcosFiltrado"
            :key="index"
          >
            <span class="columna"> {{ marco.cantidad }} </span>
            <span class="columna"> {{ marco.marca.nombre }} </span>
            <span class="columna"> {{ marco.modelo.codigo }} </span>
            <span class="columna">
              {{ marco.color.codigo }} {{ marco.color.nombre_alias }}
            </span>
            <span class="columna"> {{ marco.sucursal.nombre }} </span>
            <span class="columna"> {{ marco.lotes.toString() }} </span>
          </div>
        </div>

        <div v-else>
          <div class="fila">
            <span class="columna">Cantidad</span>
            <span class="columna">Marca</span>
            <span class="columna">Modelo</span>
            <span class="columna">Color</span>
            <span class="columna">Lotes</span>
          </div>
          <div
            class="fila"
            v-for="(marco, index) in filtrarPorSucursal"
            :key="index"
          >
            <span class="columna"> {{ marco.cantidad }} </span>
            <span class="columna"> {{ marco.marca.nombre }} </span>
            <span class="columna"> {{ marco.modelo.codigo }} </span>
            <span class="columna">
              {{ marco.color.codigo }} {{ marco.color.nombre_alias }}
            </span>
            <span class="columna"> {{ marco.lotes.toString() }} </span>
          </div>
        </div>
        <div v-if="verificarCantidad()">
              <v-alert class="alerta" :value="alert" dense type="info" dismissible
              >Se ha detectado una baja cantidad de stock</v-alert>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import authHeader from '../services/auth-header'
import exportXlsFile from 'export-from-json'
export default {
  name: 'InventarioMarco',
  head: {
    title: 'exported project',
  },
  middleware: ['authenticated'],

  data: function () {
    return {
      id_sucursal: 'Todas',
      listadoMarcos: [],
      listadoSucursales: [],
      listadoMarcas: [],
      listadoModelos: [],
      listadoColores: [],
      listadoMarcosFiltrado: [],
      listadoMarcosExcel: [],
      limite: null
    }
  },
  methods: {
    getData: async function () {
      this.limite = this.$store.getters['limite/getValor']
      try {
        let response = await this.$axios.get('/marco', {
          headers: authHeader(),
        })
        this.listadoMarcos = response.data
        response = await this.$axios.get('/sucursal', {
          headers: authHeader(),
        })
        this.listadoSucursales = response.data
        response = await this.$axios.get('/marca_marco', {
          headers: authHeader(),
        })
        this.listadoMarcas = response.data
        response = await this.$axios.get('/modelo_marca', {
          headers: authHeader(),
        })
        this.listadoModelos = response.data
        response = await this.$axios.get('/color_marca', {
          headers: authHeader(),
        })
        this.listadoColores = response.data

        for (let i in this.listadoMarcos) {
          let marco = {
            cantidad: 0,
            marca: {},
            modelo: {},
            color: {},
            sucursal: {},
            lotes: [],
          }

          marco.cantidad = this.listadoMarcos.at(i).cantidad

          marco.marca = this.listadoMarcas
            .filter(
              (marca) => marca.id == this.listadoMarcos.at(i).id_marca_marco
            )
            .at(0)

          marco.modelo = this.listadoModelos
            .filter(
              (modelo) => modelo.id == this.listadoMarcos.at(i).id_modelo_marca
            )
            .at(0)

          marco.color = this.listadoColores
            .filter(
              (color) => color.id == this.listadoMarcos.at(i).id_codigo_color
            )
            .at(0)

          marco.sucursal = this.listadoSucursales
            .filter(
              (sucursal) => sucursal.id == this.listadoMarcos.at(i).id_sucursal
            )
            .at(0)

          marco.lotes = this.listadoMarcos.at(i).lotes

          this.listadoMarcosFiltrado.push(marco)
        }
      } catch (error) {
        console.log('Error al obtener los datos', error)
      }
    },
    verificarCantidad() {
      for(let i in this.listadoMarcosFiltrado){
        if (this.listadoMarcosFiltrado.at(i).cantidad < this.limite) {
          return true
       }
      }
      
    },
    descargarExcel() {
      for (let i in this.listadoMarcos) {
        let marco = {
          cantidad: '',
          marca: '',
          modelo: '',
          color: '',
          lotes: '',
          sucursal: '',
        }

        marco.cantidad = this.listadoMarcos.at(i).cantidad
        marco.lotes = this.listadoMarcos.at(i).lotes
        marco.marca = this.listadoMarcas
          .filter(
            (marca) => marca.id == this.listadoMarcos.at(i).id_marca_marco
          )
          .at(0).nombre

        marco.modelo = this.listadoModelos
          .filter(
            (modelo) => modelo.id == this.listadoMarcos.at(i).id_modelo_marca
          )
          .at(0).codigo

        marco.color = this.listadoColores
          .filter(
            (color) => color.id == this.listadoMarcos.at(i).id_codigo_color
          )
          .at(0).codigo

        marco.sucursal = this.listadoSucursales
          .filter(
            (sucursal) => sucursal.id == this.listadoMarcos.at(i).id_sucursal
          )
          .at(0).nombre

        this.listadoMarcosExcel.push(marco)
      }
      const data = this.listadoMarcosExcel
      const fileName = 'Marcos'
      const exportType = exportXlsFile.types.xls
      exportXlsFile({ data, fileName, exportType })
    },
  },
  created: function () {
    this.getData()
  },

  computed: {
    filtrarPorSucursal() {
      if (this.id_sucursal == 'Todas' || this.id_sucursal == '') {
        return this.listadoMarcosFiltrado
      }
      return this.listadoMarcosFiltrado.filter(
        (marco) => marco.sucursal.id == this.id_sucursal
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
.inventario-marco-container {
  min-height: 100vh;
}

.inventario-marco-visualizar {
  top: 170px;
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
  background-color: var(--dl-color-default-defaultstroke);
}
.inventario-marco-text02 {
  top: 18px;
  left: 59px;
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
.inventario-marco-ingresar-marco {
  top: 170px;
  left: 320px;
  width: 402px;
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
.inventario-marco-text04 {
  top: 18px;
  left: 25px;
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
.inventario-marco-text06 {
  top: 335px;
  left: 20px;
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
  flex-wrap: wrap;
  display: flex;
}

.label-listado {
  display: table-cell;
  margin: 20px 20px 20px 0px;
  position: relative;
}

.boton-descarga {
  top: 10px;
  left: 85%;
  margin: 20px 20px 20px 20px;
}
.grupo-selector-sucursal {
  display: table-cell;
  margin: 20px 20px 20px 20px;
  position: relative;
}

.custom-select {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  font-weight: 400;
  text-align: center;
  margin: 10px 10px 10px 10px;
}

.Contenedor {
  top: 400px;
  left: 20px;
  margin: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
  height: auto;
}

.columna {
  width: 14%;
}

.alerta {
  width: 30%;
  margin-left: 0;
}
</style>
