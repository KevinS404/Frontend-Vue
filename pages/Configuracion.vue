<template>
  <div>
    <sidebar-menu />
    <div class="contenedor-pagina">
      <div class="encabezado">
        <div class="logo-header">
          <img src="../assets/logo-01.png" alt="logo-maxisvision" width="80" />
        </div>
        <div class="header-texto">Configuración</div>
      </div>

      <div class="contenedor-grupos">
        <div class="contenedor-limite-stock">
          <label class="label-titulo"
            >Ajustar limite de stock para alertas</label
          >
          <div>
            <div> El limite actual definido es {{$store.state.limite.limite}}</div>
            <input type="number" v-model= "limite" class="input" />
            <button class="boton">
              <span class="label-boton" @click="cambiarLimite()">Actualizar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarMenu from '../components/sidebar-menu.vue'

export default {
  components: { sidebarMenu },
  middleware: ['authenticated'],
  data() {
    return {
       limite: 0
    
    }
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
  methods: {
    cambiarLimite() {
      this.$store.commit('limite/setLimite',this.limite)
    },
  }
}
</script>

<style>
.contenedor-grupos {
  width: auto;
  height: auto;
  position: relative;
  padding: 20px 20px 20px 20px;
}

.contenedor-limite-stock {
  padding: 20px 0px 20px 0px;
}

.boton {
  width: 200px;
  height: 48px;
}

.label-boton {
  font-size: 24px;
}

.label-titulo {
  font-size: 32px;
}

.input {
  width: 225px;
  padding-right: 20px;
}
</style>
