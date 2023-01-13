<template>
  <div>
    <sidebar-menu />

    <div>
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto1">Guia de despacho</div>
      </div>
    </div>

    <form @submit.prevent="enviarFormulario">
      <!-- DATOS DEL USUARIO-->
      <table class="tablaDatos">
        <tr>
          <td>
            <div>
              <h1>Nombre de Paciente</h1>
              <input v-model="newOrden.nombre" placeholder="Nombre" />
            </div>
          </td>

          <td>
            <div>
              <h1>Rut</h1>
              <input v-model="newOrden.rut" placeholder="Rut" />
            </div>
          </td>

          <td>
            <div>
              <h1>Edad</h1>
              <input v-model="newOrden.edad" placeholder="Edad" type="number" />
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div>
              <h1>Profesional</h1>
              <input v-model="newOrden.profesional" placeholder="Profesional" />
            </div>
          </td>
          <td>
            <div>
              <h1>Fecha de Recepcion</h1>
              <input
                type="date"
                placeholder="Ingrese Fecha"
                v-model="newOrden.fecha_recepcion"
              />
            </div>
          </td>
          <td>
            <div>
              <h1>Fono</h1>
              <input v-model="newOrden.fono" placeholder="Ingrese Fono" />
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div>
              <h1>Sucursal</h1>

              <select class="tablaBotSucursal" v-model="newOrden.idSucursal">
                <option disabled>Selecione una Sucursal</option>
                <option
                  v-for="(sucursal, index) in listaSucursales"
                  :key="index"
                  :value="sucursal.id"
                >
                  {{ sucursal.nombre }}
                </option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <h1>Ubicación</h1>
              <input
                v-model="newOrden.ubicacion"
                placeholder="Ingrese ubicacion"
              />
            </div>
          </td>

          <td>
            <div>
              <h1>Fecha de Entrega</h1>
              <input
                placeholder="Ingrese Fecha"
                type="date"
                v-model="newOrden.fecha_entrega"
              />
            </div>
          </td>
        </tr>
      </table>

      <!-- Se inicia la tabla de lejos -->

      <h1 class="titulo">Lejos</h1>

      <table class="tablaCercaLejos">
        <tr>
          <th></th>
          <th>Esfera</th>
          <th>Cilindro</th>
          <th>Eje</th>
          <th>DP</th>
          <th>CR o MIN</th>
          <th>Foto o AR</th>
          <th>Focalidad</th>
          <th>Alto Indice</th>
        </tr>

        <tr>
          <th>OD</th>

          <td>
            <div>
              <input v-model="newCristalDL.esferico" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalDL.cilindro" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalDL.eje" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalDL.dp" type="number" />
            </div>
          </td>

          <td>
            <div>
              <div>
                <select v-model="newCristalDL.cr_min">
                  <option>CR</option>
                  <option>MIN</option>
                </select>
              </div>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalDL.foto_ar">
                <option>FOTO</option>
                <option>AR</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalDL.focalidad">
                <option>Bifocal</option>
                <option>Multifocal</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalDL.alto_indice" />
            </div>
          </td>
        </tr>

        <tr>
          <th>OI</th>

          <td>
            <div>
              <input v-model="newCristalil.esferico" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalil.cilindro" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalil.eje" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalil.dp" type="number" />
            </div>
          </td>

          <td>
            <div>
              <div>
                <select v-model="newCristalil.cr_min">
                  <option>CR</option>
                  <option>MIN</option>
                </select>
              </div>
            </div>
          </td>

          <td>
            <div>
              <div>
                <select v-model="newCristalil.foto_ar">
                  <option>FOTO</option>
                  <option>AR</option>
                </select>
              </div>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalil.focalidad">
                <option>Bifocal</option>
                <option>Multifocal</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalil.alto_indice" />
            </div>
          </td>
        </tr>
      </table>

      <!-- Tabla ADD-->
      <table class="tablaCercaLejos">
        <tr>
          <th>ADD</th>

          <td>
            <div>
              <input
                v-model="newCristalI.add"
                placeholder="INGRESE ADD IZQUIERDO"
              />
            </div>
          </td>

          <td>
            <div>
              <input
                v-model="newCristalD.add"
                placeholder="INGRESE ADD DERECHO"
              />
            </div>
          </td>
        </tr>
      </table>

      <!-- Se inicia la tabla de Cerca -->
      <h1 class="titulo">Cerca</h1>

      <table class="tablaCercaLejos">
        <tr>
          <th></th>
          <th>Esfera</th>
          <th>Cilindro</th>
          <th>Eje</th>
          <th>DP</th>
          <th>CR o MIN</th>
          <th>Foto o AR</th>
          <th>Focalidad</th>
          <th>Alto Indice</th>
        </tr>

        <tr>
          <th>OD</th>

          <td>
            <div>
              <input v-model="newCristalD.esferico" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalD.cilindro" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalD.eje" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalD.dp" type="number" />
            </div>
          </td>

          <td>
            <div>
              <div>
                <select v-model="newCristalD.cr_min">
                  <option>CR</option>
                  <option>MIN</option>
                </select>
              </div>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalD.foto_ar">
                <option>Foto</option>
                <option>AR</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalD.focalidad">
                <option>Bifocal</option>
                <option>Multifocal</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalD.alto_indice" />
            </div>
          </td>
        </tr>

        <tr>
          <th>OI</th>

          <td>
            <div>
              <input v-model="newCristalI.esferico" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalI.cilindro" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalI.eje" type="number" />
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalI.dp" type="number" />
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalI.cr_min">
                <option>CR</option>
                <option>MIN</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalI.foto_ar">
                <option>FOTO</option>
                <option>AR</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <select v-model="newCristalI.focalidad">
                <option>Bifocal</option>
                <option>Multifocal</option>
              </select>
            </div>
          </td>

          <td>
            <div>
              <input v-model="newCristalI.alto_indice" />
            </div>
          </td>
        </tr>
      </table>

      <!-- OBSERVACIONES -->
      <table class="tablaObs">
        <tr>
          <td>
            <div>
              <h1 class="titulo">Observaciones</h1>
              <textarea
                class="Obs"
                v-model="newOrden.observaciones"
                placeholder="Ingrese aquí sus observaciones"
              />
            </div>
          </td>

          <td>
            <tr>
              <div>
                <h1>Total</h1>
                <input
                  class="money"
                  v-model="newOrden.total"
                  placeholder="Ingrese Total"
                />
              </div>
            </tr>

            <tr>
              <div>
                <h1>Abono</h1>
                <input
                  class="money"
                  v-model="newOrden.abono"
                  placeholder="Ingrese Abono"
                />
              </div>
            </tr>

            <tr>
              <div>
                <h1>Saldo</h1>
                <input
                  class="money"
                  v-model="newOrden.saldo"
                  placeholder="Ingrese Saldo"
                />
              </div>
            </tr>
          </td>
        </tr>
      </table>

      <button class="botonEntrada" type="submit">Ingresar</button>

      <nuxt-link to="/ListadoOrdenes">
        <button class="botonSalida">Cancelar</button>
      </nuxt-link>
    </form>
  </div>
</template>

<script>
import authHeader from '../services/auth-header'
export default {
  name: 'Orden',
  head: {
    title: 'exported project',
  },
  middleware: ['authenticated'],
  data: function () {
    return {
      listaOrdenes: [],
      listaSucursales: [],

      newOrden: {
        rut: '',
        nombre: '',
        edad: '',
        total: 0,
        abono: 0,
        saldo: 0,
        observaciones: '',
        fono: '',
        lote: 0,
        fecha_recepcion: '',
        fecha_entrega: '',
        profesional: '',
        estadoOrden: 'Activo',
        gasto: 0,
        ubicacion: '',
        idSucursal: '',
        idUsuario: '',
        idOperativo: '',
      },

      newCristalI: {
        tipo: 'Despacho',
        esferico: null,
        cilindro: null,
        eje: null,
        dp: null,
        cr_min: '',
        foto_ar: '',
        ojo_d_i: 'Izquierdo',
        add: null,
        tipo_lejos_cerca: 'Cerca',
        estado_proceso: 'En inventario',
        id_sucursal: '',
        lote: 0,
        costo: null,
        focalidad: '',
        alto_indice: '',
      },

      newCristalD: {
        tipo: 'Despacho',
        esferico: null,
        cilindro: null,
        eje: null,
        dp: null,
        cr_min: '',
        foto_ar: '',
        ojo_d_i: 'Derecho',
        add: null,
        tipo_lejos_cerca: 'Cerca',
        estado_proceso: 'En inventario',
        id_sucursal: '',
        lote: 0,
        costo: null,
        focalidad: '',
        alto_indice: '',
      },

      newCristalDL: {
        tipo: 'Despacho',
        esferico: null,
        cilindro: null,
        eje: null,
        dp: null,
        cr_min: '',
        foto_ar: '',
        ojo_d_i: 'Derecho',
        add: null,
        tipo_lejos_cerca: 'Lejos',
        estado_proceso: 'En inventario',
        id_sucursal: '',
        lote: 0,
        costo: null,
        focalidad: '',
        alto_indice: '',
      },

      newCristalil: {
        tipo: 'Despacho',
        esferico: null,
        cilindro: null,
        eje: null,
        dp: null,
        cr_min: '',
        foto_ar: '',
        ojo_d_i: 'Derecho',
        add: null,
        tipo_lejos_cerca: 'Lejos',
        estado_proceso: 'En inventario',
        id_sucursal: '',
        lote: 0,
        costo: null,
        focalidad: '',
        alto_indice: '',
      },
    }
  },

  methods: {
    getData: async function () {
      try {
        let response = await this.$axios.get('/orden', {
          headers: authHeader(),
        })
        this.listaOrdenes = response.data

        response = await this.$axios.get('/sucursal', {
          headers: authHeader(),
        })
        this.listaSucursales = response.data
      } catch (error) {
        console.log('Error al obtener la informacion', error)
      }
    },

    enviarFormulario() {
      /* Se crea el lote en el cristal */
      this.newOrden.lote = this.listaOrdenes.length + 1
      this.newCristalD.lote = this.listaOrdenes.lenght + 1
      this.newCristalI.lote = this.listaOrdenes.lenght + 1
      this.newCristalDL.lote = this.listaOrdenes.lenght + 1
      this.newCristalil.lote = this.listaOrdenes.lenght + 1
      this.newCristalI.tipo =
        this.newCristalD.tipo /* Se copia el mismo tipo en el cristal izquiendo y derecho */

      if (
        this.newCristalD.esferico == null &&
        this.newCristalD.cilindrico == null &&
        this.newCristalD.eje == null &&
        this.newCristalD.dp == null &&
        this.newCristalD.cr_min == '' &&
        this.newCristalD.foto_ar == '' &&
        this.newCristalD.add == null &&
        this.newCristalI.esferico == null &&
        this.newCristalI.cilindrico == null &&
        this.newCristalI.eje == null &&
        this.newCristalI.dp == null &&
        this.newCristalI.cr_min == '' &&
        this.newCristalI.foto_ar == '' &&
        this.newCristalI.add == null &&
        this.newCristalDL.esferico == null &&
        this.newCristalDL.cilindrico == null &&
        this.newCristalDL.eje == null &&
        this.newCristalDL.dp == null &&
        this.newCristalDL.cr_min == '' &&
        this.newCristalDL.foto_ar == '' &&
        this.newCristalDL.add == null &&
        this.newCristalil.esferico == null &&
        this.newCristalil.cilindrico == null &&
        this.newCristalil.eje == null &&
        this.newCristalil.dp == null &&
        this.newCristalil.cr_min == '' &&
        this.newCristalil.foto_ar == '' &&
        this.newCristalil.add == null
      ) {
        alert('Ambas tablas vacias')
      } else {
        if (
          (this.newCristalD.esferico != null ||
            this.newCristalD.cilindrico != null ||
            this.newCristalD.eje != null ||
            this.newCristalD.dp != null ||
            this.newCristalD.cr_min != '' ||
            this.newCristalD.foto_ar != '' ||
            this.newCristalI.esferico != null ||
            this.newCristalI.cilindrico != null ||
            this.newCristalI.eje != null ||
            this.newCristalI.dp != null ||
            this.newCristalI.cr_min != '' ||
            this.newCristalI.foto_ar != '') &&
          (this.newCristalDL.esferico != null ||
            this.newCristalDL.cilindrico != null ||
            this.newCristalDL.eje != null ||
            this.newCristalDL.dp != null ||
            this.newCristalDL.cr_min != '' ||
            this.newCristalDL.foto_ar != '' ||
            this.newCristalil.esferico != null ||
            this.newCristalil.cilindrico != null ||
            this.newCristalil.eje != null ||
            this.newCristalil.dp != null ||
            this.newCristalil.cr_min != '' ||
            this.newCristalil.foto_ar != '')
        ) {
          alert('Ambas tablas llenas')
          window.location.reload()
        } else {
          alert('Entre al else 2')

          if (
            this.newCristalD.esferico != null ||
            this.newCristalD.cilindrico != null ||
            this.newCristalD.eje != null ||
            this.newCristalD.dp != null ||
            this.newCristalD.cr_min != '' ||
            this.newCristalD.foto_ar != '' ||
            this.newCristalI.esferico != null ||
            this.newCristalI.cilindrico != null ||
            this.newCristalI.eje != null ||
            this.newCristalI.dp != null ||
            this.newCristalI.cr_min != '' ||
            this.newCristalI.foto_ar != ''
          ) {
            this.$axios
              .post('/cristal', this.newCristalI, { headers: authHeader() })
              .then((res) => {})
              .catch((error) => {
                alert(error)
                console.log(error)
              })

            this.$axios
              .post('/cristal', this.newCristalD, { headers: authHeader() })
              .then((res) => {})
              .catch((error) => {
                alert(error)
                console.log(error)
              })

            alert('Se ha ingesado correctamente tabla de cerca')
          }

          if (
            this.newCristalDL.esferico != null ||
            this.newCristalDL.cilindrico != null ||
            this.newCristalDL.eje != null ||
            this.newCristalDL.dp != null ||
            this.newCristalDL.cr_min != '' ||
            this.newCristalDL.foto_ar != '' ||
            this.newCristalDL.add != null ||
            this.newCristalil.esferico != null ||
            this.newCristalil.cilindrico != null ||
            this.newCristalil.eje != null ||
            this.newCristalil.dp != null ||
            this.newCristalil.cr_min != '' ||
            this.newCristalil.foto_ar != '' ||
            this.newCristalil.add != null
          ) {
            this.$axios
              .post('/cristal', this.newCristalil, { headers: authHeader() }) //Se realiza post con el objeto newMarco como parametro asimilando el formato json
              .then((res) => {})
              .catch((error) => {
                alert(error)
                console.log(error)
              })

            this.$axios
              .post('/cristal', this.newCristalDL, { headers: authHeader() }) //Se realiza post con el objeto newMarco como parametro asimilando el formato json
              .then((res) => {})
              .catch((error) => {
                alert(error)
                console.log(error)
              })

            alert('Se ha ingesado correctamente tabla de lejos')
          }

          this.$axios
            .post('/orden', this.newOrden, { headers: authHeader() }) //Se realiza post con el objeto newMarco como parametro asimilando el formato json
            .then((res) => {})
            .catch((error) => {
              alert(error)
              console.log(error)
            })

          alert('Se ha ingesado correctamente la orden')
          window.location.reload()
        }
      }
    },
  },

  created: function () {
    /* APENAS EJECUTA LA PAGINA EMPIEZA A PEDIR LOS DATOS */
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

<style scoped>
.encabezado {
  height: max-content; /* para que abarque todo */
}

.titulo {
  text-align: center;
  width: 90%;
  color: var(--d1-color-texts);
}

.tablaCercaLejos {
  border-collapse: collapse;
  width: 90%;
  padding: 25px;
  margin: 2%;
}

.tablaCercaLejos tr td {
  border: solid;
  border-color: black;
  border-width: thin;
  border-radius: 10px;
}

.tablaCercaLejos tr th {
  padding: 25px;
  border: solid;
  border-color: black;
  border-width: thin;
  border-radius: 10px;
}

.tablaCercaLejos tr td div input {
  text-align: center;
  width: 100%;
  height: 70px;
}

.tablaCercaLejos tr td div select {
  text-align: center;
  width: 100%;
  height: 70px;
}

.tablaDatos {
  width: 70%;
}

.tablaDatos tr td div {
  padding: 5px;
}

.tablaDatos tr td div input {
  border: solid;
  border-color: gray;
  border-radius: 10px;
  border-width: thin;
  width: 340px;
  height: 35px;
}

.tablaDatos tr td div h1 {
  color: var(--d1-color-texts);
}

.tablaBotSucursal {
  border: solid;
  border-color: gray;
  border-radius: 10px;
  border-width: thin;
  width: 340px;
  height: 35px;
}

.tablaObs {
  width: 100%;
}

.tablaObs tr td div {
  padding: 2px;
}

.tablaObs tr td div input {
  border: solid;
  border-color: gray;
  border-radius: 10px;
  border-width: thin;
  width: 600px;
}

.tablaObs tr td div h1 {
  color: var(--d1-color-texts);
}

.Obs {
  border: solid;
  border-color: gray;
  border-radius: 10px;
  border-width: thin;
  width: 600px;
  height: 150px;
  text-align: center;
}

.money {
  height: 35px;
}

.botonSalida {
  border: solid red;
  color: black;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  margin: 0 240px;
}

.botonEntrada {
  border: solid green;
  color: black;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  margin: 0 5px;
}

.header-texto1 {
  width: 100%;
  color: white;
  background-color: var(--d1-color-texts);
  height: 80px;
  padding-left: 25%;
  font-size: 64px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Poppins;
  font-weight: 500;
  line-height: 130%;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
h1 {
  font-size: 20px;
}
</style>
