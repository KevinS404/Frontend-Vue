<template>
  <div>
    <sidebar-menu />

    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto1">Guia de despacho</div>
      </div>

      <form @submit.prevent="enviarFormulario">
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
                <input
                  v-model="newOrden.edad"
                  placeholder="Edad"
                  type="number"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div>
                <h1>Profesional</h1>
                <input
                  v-model="newOrden.profesional"
                  placeholder="Profesional"
                />
              </div>
            </td>
            <td>
              <div>
                <h1>Fecha de Recepcion</h1>
                <input
                  v-model="newOrden.fechaRecepcion"
                  placeholder="Ingrese Fecha"
                  type="date"
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

                <span v-for="(sucursal, index) in listaSucursales" :key="index"
                  ><span v-if="sucursal.id == operativo.id_sucursal">{{
                    sucursal.nombre
                  }}</span></span
                >
              </div>
            </td>

            <td>
              <div>
                <h1>Ubicacion</h1>
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
                  v-model="newOrden.fechaEntrega"
                  placeholder="Ingrese Fecha"
                  type="date"
                />
              </div>
            </td>
          </tr>
        </table>

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
                <input
                  v-model="newCristalDL.esferico"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalDL.cilindro"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalDL.eje"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalDL.dp"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalDL.cr_min"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalDL.foto_ar"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
              </div>
            </td>
          </tr>

          <tr>
            <th>OI</th>

            <td>
              <div>
                <input
                  v-model="newCristalil.esferico"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalil.cilindro"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalil.eje"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalil.dp"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalil.cr_min"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalil.foto_ar"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
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
                <input
                  v-model="newCristalD.esferico"
                  placeholder="Input1"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalD.cilindro"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalD.eje"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalD.dp"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalD.cr_min"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalD.foto_ar"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
              </div>
            </td>
          </tr>

          <tr>
            <th>OI</th>

            <td>
              <div>
                <input
                  v-model="newCristalI.esferico"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalI.cilindro"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalI.eje"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalI.dp"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalI.cr_min"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input
                  v-model="newCristalI.foto_ar"
                  placeholder="Input"
                  type="number"
                />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
              </div>
            </td>

            <td>
              <div>
                <input placeholder="Input" />
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
                <input
                  class="Obs"
                  v-model="newOrden.observaciones"
                  placeholder="Observaciones"
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

        <nuxt-link to="/InfoOperativo">
          <button class="botonSalida">Cancelar</button>
        </nuxt-link>
      </form>
    </div>
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
      operativo: {},
      listaOrdenes: [],
      listaSucursales: [],
      valor: 1,

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
        fechaRecepcion: '',
        fechaEntrega: '',
        profesional: '',
        estadoOrden: 'Activo',
        gasto: 0,
        ubicacion: '',
        id_sucursal: '',
        id_usuario: this.$store.state.auth.usuario.id,
        id_operativo: '',
      },

      newCristalI: {
        tipo: '',
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
      },

      newCristalD: {
        tipo: '',
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
      },

      newCristalDL: {
        tipo: '',
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
      },

      newCristalil: {
        tipo: '',
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
      },
    }
  },

  methods: {
    getData: async function () {
      this.operativo = this.$store.getters['page/getIdOperativo']
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
      this.newOrden.id_sucursal = this.operativo.id_sucursal
      this.newOrden.id_operativo = this.operativo.id
      let lote = this.listaOrdenes.length + 1
      this.newOrden.lote = lote /* Se crea el lote en el cristal */
      this.newCristalD.lote = lote /* Se crea el lote en el cristal */
      this.newCristalI.lote = lote /* Se crea el lote en el cristal */
      this.newCristalDL.lote = lote /* Se crea el lote en el cristal */
      this.newCristalil.lote = lote /* Se crea el lote en el cristal */
      this.newCristalI.tipo =
        this.newCristalD.tipo /* Se copia el mismo tipo en el cristal izquiendo y derecho */
    },

    enviarFormulario() {
      if (
        this.newCristalDL.cilindro == null &&
        this.newCristalDL.add == null &&
        this.newCristalDL.esferico == null &&
        this.newCristalDL.eje == null &&
        this.newCristalDL.dp == null &&
        this.newCristalil.cilindro == null &&
        this.newCristalil.add == null &&
        this.newCristalil.esferico == null &&
        this.newCristalil.eje == null &&
        this.newCristalil.dp == null
      ) {
        /* Se guarda tabla de Cerca */

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
      } else {
        /* Se guarda tabla de Lejos */

        if (
          (this.newCristalDL.cilindro != null ||
            this.newCristalDL.add != null ||
            this.newCristalDL.esferico != null ||
            this.newCristalDL.eje != null ||
            this.newCristalDL.dp != null ||
            this.newCristalil.cilindro != null ||
            this.newCristalil.add != null ||
            this.newCristalil.esferico != null ||
            this.newCristalil.eje != null ||
            this.newCristalil.dp != null) &&
          (this.newCristalI.cilindro != null ||
            this.newCristalI.add != null ||
            this.newCristalI.esferico != null ||
            this.newCristalI.eje != null ||
            this.newCristalI.dp != null ||
            this.newCristalD.cilindro != null ||
            this.newCristalD.add != null ||
            this.newCristalD.esferico != null ||
            this.newCristalD.eje != null ||
            this.newCristalD.dp != null)
        ) {
          alert('Solo puede completar una tabla')
          this.valor = 0
        } else {
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
        }
      }

      if (this.valor == 1) {
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
  width: 100%;
  border: solid;
  border-color: gray;
  border-radius: 10px;
  border-width: thin;
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
</style>
