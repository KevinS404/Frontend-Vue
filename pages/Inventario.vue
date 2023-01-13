<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
<template>
  <div class="inventario-container">
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Inventario</div>
      </div>
      <div class="carrucel">
        <div class="inventario-frame6">
          <div class="inventario-text02">
            <div class="logo">
              <img src="../assets/logo-marco.png" width="150" />
            </div>
            Marcos
          </div>
          <div class="inventario-visualizar">
            <nuxt-link to="/InventarioMarco">
              <span class="inventario-text09"><span>Visualizar</span></span>
            </nuxt-link>
          </div>
        </div>
        <div class="cuadro-cristales-despacho">
          <div class="inventario-text02">
            <div class="logo">
              <img src="../assets/logo-lentes.png" width="200" />
            </div>
            Cristales para Despachos
          </div>
          <div class="inventario-visualizar1">
            <nuxt-link to="/InventarioCristalesDespacho">
              <span class="inventario-text18"><span>Visualizar</span></span>
            </nuxt-link>
          </div>
        </div>
        <div class="inventario-frame7">
          <div class="inventario-text11">
            <div class="logo">
              <img src="../assets/logo-maipu.png" width="150" />
            </div>
            Cristales Maipú
          </div>
          <div class="inventario-visualizar1">
            <nuxt-link to="/InventarioCristales">
              <span class="inventario-text18"><span>Visualizar</span></span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inventario',
  head: {
    title: 'exported project',
  },
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

<style scoped>
.inventario-container {
  min-height: 100vh;
}

.carrucel {
  top: 30px;
  width: auto;
  height: auto;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.inventario-frame6 {
  width: 45%;
  height: 450px;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  align-items: flex-start;
  border-color: var(--dl-color-default-defaultstroke);
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  background-color: var(--dl-color-default-formbackground);
  display: table-cell;
  float: left;
  margin: 20px 20px 20px 20px;
}
.inventario-text02 {
  top: 40px;
  left: 70px;
  color: var(--d1-color-texts);
  height: auto;
  font-size: 55px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: Poppins;
  font-weight: 500;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.inventario-visualizar {
  top: 30px;
  width: 218px;
  height: 83px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  background-color: var(--dl-color-default-defaultstroke);
}
.inventario-text09 {
  top: 18px;
  left: 33px;
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
.inventario-frame7 {
  width: 45%;
  height: 450px;
  margin: 20px 20px 20px 20px;

  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: var(--dl-color-default-defaultstroke);
  border-style: solid;
  border-width: 1px;
  margin-right: 0;
  border-radius: 15px;
  margin-bottom: 0;
  background-color: var(--dl-color-default-formbackground);
  display: table-cell;
  float: left;
}

.cuadro-cristales-despacho {
  position: relative;
  overflow: hidden;

  width: 45%;
  height: 450px;

  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-color: var(--dl-color-default-defaultstroke);
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  background-color: var(--dl-color-default-formbackground);

  display: table-cell;
  float: left;
  margin: 20px 20px 20px 20px;
}

.inventario-text11 {
  top: 100px;
  left: 70px;
  color: var(--d1-color-texts);
  height: auto;
  font-size: 55px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: Poppins;
  font-weight: 500;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.inventario-visualizar1 {
  top: 30px;
  width: 218px;
  height: 83px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  background-color: var(--dl-color-default-defaultstroke);
}
.inventario-text18 {
  top: 18px;
  left: 33px;
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
.logo {
  display: block;
}
</style>
