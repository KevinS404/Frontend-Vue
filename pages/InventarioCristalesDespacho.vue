<template>
  <div class="inventario-cristales-container">
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Inventario Cristales Despacho</div>
      </div>
      <div class="inventario-cristales-visualizar">
        <nuxt-link to="/Inventario">
          <span class="inventario-cristales-text02"><span>Volver</span></span>
        </nuxt-link>
      </div>

      <div class="inventario-cristales-text08">
        <span class="label-listado">Listado</span>
        <v-btn
          color="primary"
          class="boton-descarga"
          dark
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
            <span class="columna">Esferico</span>
            <span class="columna">Cilindro</span>
            <span class="columna">Eje</span>
            <span class="columna">DP</span>
            <span class="columna">CR/MIN</span>
            <span class="columna">Foto/Ar</span>
            <span class="columna">ADD</span>
            <span class="columna">Sucursal</span>
            <span class="columna">Lotes</span>
          </div>
          <div
            class="fila"
            v-for="(cristal, index) in listadoCristalesFiltrada"
            :key="index"
          >
            <span class="columna">{{ cristal.cantidad }}</span>
            <span class="columna">{{ cristal.esferico }}</span>
            <span class="columna">{{ cristal.cilindro }}</span>
            <span class="columna">{{ cristal.eje }}</span>
            <span class="columna">{{ cristal.dp }}</span>
            <span class="columna">{{ cristal.cr_min }}</span>
            <span class="columna">{{ cristal.foto_ar }}</span>
            <span class="columna">{{ cristal.add }}</span>
            <span class="columna"> {{ cristal.sucursal.nombre }} </span>
            <span class="columna"> {{ cristal.lotes.toString() }} </span>
          </div>
        </div>

        <div v-else>
          <div class="fila">
            <span class="columna">Cantidad</span>
            <span class="columna">Esferico</span>
            <span class="columna">Cilindro</span>
            <span class="columna">Eje</span>
            <span class="columna">DP</span>
            <span class="columna">CR/MIN</span>
            <span class="columna">Foto/Ar</span>
            <span class="columna">ADD</span>
            <span class="columna">Lotes</span>
          </div>
          <div
            class="fila"
            v-for="(cristal, index) in filtrarPorSucursal"
            :key="index"
          >
            <span class="columna">{{ cristal.cantidad }}</span>
            <span class="columna">{{ cristal.esferico }}</span>
            <span class="columna">{{ cristal.cilindro }}</span>
            <span class="columna">{{ cristal.eje }}</span>
            <span class="columna">{{ cristal.dp }}</span>
            <span class="columna">{{ cristal.cr_min }}</span>
            <span class="columna">{{ cristal.foto_ar }}</span>
            <span class="columna">{{ cristal.add }}</span>
            <span class="columna"> {{ cristal.lotes.toString() }} </span>
            <div v-if="verificarCantidad(index)">
            <v-alert class="alerta" :value="alert" dense type="info" dismissible
              >Se ha detectado una baja cantidad de stock</v-alert
            >
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authHeader from '../services/auth-header'
import exportXlsFile from 'export-from-json'
export default {
  name: 'InventarioCristales',
  head: {
    title: 'exported project',
  },
  middleware: ['authenticated'],

  data: function () {
    return {
      id_sucursal: 'Todas',
      listadoCristales: [],
      listadoSucursales: [],
      listadoCristalesFiltrada: [],
      listadoCristalesExcel: [],
      limite: null
    }
  },

  methods: {
    getData: async function () {
      this.limite = this.$store.getters['limite/getValor']
      try {
        let response = await this.$axios.get('/cristal/tipo/Despacho', {
          headers: authHeader(),
        })
        this.listadoCristales = response.data

        let sucursales = await this.$axios.get('/sucursal', {
          headers: authHeader(),
        })
        this.listadoSucursales = sucursales.data

        for (let i in this.listadoCristales) {
          let cristal = {
            cantidad: 0,
            esferico: 0,
            cilindro: 0,
            eje: 0,
            dp: 0,
            cr_min: '',
            foto_ar: '',
            add: '',
            sucursal: {},
            lotes: [],
          }

          cristal.cantidad = this.listadoCristales.at(i).cantidad
          cristal.esferico = this.listadoCristales.at(i).esferico
          cristal.cilindro = this.listadoCristales.at(i).cilindro
          cristal.eje = this.listadoCristales.at(i).eje
          cristal.dp = this.listadoCristales.at(i).dp
          cristal.cr_min = this.listadoCristales.at(i).cr_min
          cristal.foto_ar = this.listadoCristales.at(i).foto_ar
          cristal.add = this.listadoCristales.at(i).add

          cristal.sucursal = this.listadoSucursales
            .filter(
              (sucursal) =>
                sucursal.id == this.listadoCristales.at(i).id_sucursal
            )
            .at(0)

          cristal.lotes = this.listadoCristales.at(i).lotes

          this.listadoCristalesFiltrada.push(cristal)
        }
      } catch (error) {
        console.log('Error al obtener listado cristales', error)
      }
    },
    verificarCantidad(indice) {
      if (this.listadoCristales.at(indice).cantidad < this.limite) {
        return true
      }
    },
    descargarExcel() {
      for (let i in this.listadoCristales) {
        let cristal = {
          cantidad: '',
          esferico: '',
          cilindro: '',
          eje: '',
          dp: '',
          cr_min: '',
          foto_ar: '',
          add: '',
          sucursal: '',
          lotes: '',
        }
        cristal.cantidad = this.listadoCristales.at(i).cantidad
        cristal.esferico = this.listadoCristales.at(i).esferico
        cristal.cilindro = this.listadoCristales.at(i).cilindro
        cristal.eje = this.listadoCristales.at(i).eje
        cristal.dp = this.listadoCristales.at(i).dp
        cristal.cr_min = this.listadoCristales.at(i).cr_min
        cristal.foto_ar = this.listadoCristales.at(i).foto_ar
        cristal.add = this.listadoCristales.at(i).add
        cristal.lotes = this.listadoCristales.at(i).lotes
        cristal.sucursal = this.listadoSucursales
          .filter(
            (sucursal) => sucursal.id == this.listadoCristales.at(i).id_sucursal
          )
          .at(0).nombre

        this.listadoCristalesExcel.push(cristal)
      }

      const data = this.listadoCristalesExcel
      const fileName = 'Cristales'
      const exportType = exportXlsFile.types.xls
      exportXlsFile({ data, fileName, exportType })
      this.listadoCristalesExcel = []
    },
  },

  computed: {
    filtrarPorSucursal() {
      if (this.id_sucursal == 'Todas' || this.id_sucursal == '') {
        return this.listadoCristalesFiltrada
      }
      return this.listadoCristalesFiltrada.filter(
        (cristal) => cristal.sucursal.id == this.id_sucursal
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

  created: function () {
    this.getData()
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
.inventario-cristales-container {
  min-height: 100vh;
}

.inventario-cristales-visualizar {
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
.inventario-cristales-text02 {
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
.inventario-cristales-ingresar-cristal {
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
.inventario-cristales-text04 {
  top: 18px;
  left: 24px;
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

.label-listado {
  top: 10px;
  margin: 20px 20px 20px 0px;
  left: 10%;
}

.boton-descarga {
  top: 10px;
  left: 65%;
  margin: 20px 20px 20px 20px;
}

.grupo-selector-sucursal {
  top: 10px;
  margin: 20px 20px 20px 20px;
  left: 10%;
}

.custom-select {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  font-weight: 400;
  text-align: center;
  margin: 10px 10px 10px 10px;
}

.inventario-cristales-text08 {
  top: 335px;
  left: 20px;
  width: 100%;
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

.Contenedor {
  top: 400px;
  left: 20px;
  margin: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
  height: auto;
}

.columna {
  font-size: 80%;
  width: 100px;
}
</style>
