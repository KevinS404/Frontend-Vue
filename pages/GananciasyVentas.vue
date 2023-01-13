<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Ganancias y Ventas</div>
      </div>

      <div class="carrucel">
        <div class="recuadro">
          <div><img src="../assets/bx-line-chart.svg" width="150" /></div>
          <span class="label-titulo">Ganancias Sucursales</span>
          <div class="botonV">
            <nuxt-link to="/ListadoSucursalGanancia">
              <span class="label-boton">Visualizar</span>
            </nuxt-link>
          </div>
        </div>

        <div class="recuadro">
          <div><img src="../assets/bx-bar-chart-square.svg" width="150" /></div>
          <span class="label-titulo">Ventas Sucursales</span>
          <div class="botonV">
            <nuxt-link to="/ListadoSucursalVentas">
              <span class="label-boton">Visualizar</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
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
.carrucel {
  top: 30px;
  width: auto;
  height: auto;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  padding-bottom: 40px;
}

.recuadro {
  width: 45%;
  height: 400px;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  border-color: var(--dl-color-default-defaultstroke);
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  background-color: var(--dl-color-default-formbackground);
  display: table-cell;
  float: left;
  margin: 20px;
  clear: both;
}

.label-titulo {
  position: relative;
  margin: 40px 0px 40px 0px;
}

.botonV {
  width: 250px;
  margin: 40px 30% 40px 30%;
  height: 83px;
  border-radius: 15px;
  background-color: var(--dl-color-default-defaultstroke);
  color: var(--d1-color-default-label-button);
  font-weight: 400;
  font-family: Poppins;
  position: relative;
}

.label-boton {
  position: absolute;
}
</style>