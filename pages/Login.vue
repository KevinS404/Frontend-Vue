<template>
  <div class="contenedor">
    <div class="rectangulo">
      <form @submit.prevent="handleSubmitForm">
        <span class="titulo">Ingreso</span>
        <div class="contenedor-input-usuario">
          <span class="contenedor-input-label">Usuario</span>
          <input
            class="input"
            type="text"
            v-model="usuario.username"
            placeholder="Ingrese su nombre usuario"
          />
        </div>
        <div class="contenedor-input-contrasena">
          <span class="contenedor-input-label">Contraseña</span>
          <input
            class="input"
            type="password"
            v-model="usuario.password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div class="contenedor-ingresar">
          <button type="submit" class="boton-ingresar">
            <span>Ingresar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['notauthenticated'],
  data: function () {
    return {
      usuario: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    handleSubmitForm() {
      this.loading = true

      this.$store.dispatch('auth/login', this.usuario).then(
        () => {
          this.$router.push('/')
        },
        (error) => {
          alert(error)
        }
      )
    },
  },
}
</script>

<style>
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
.rectangulo {
  width: 600px;
  height: 600px;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-color: var(--dl-color-default-defaultstroke);
  border-width: 1px;
  border-radius: 15px;
}
.titulo {
  position: relative;
  top: 0%;
  left: 0%;
  font-weight: 700;
  font-size: 64px;
  color: var(--dl-color-default-defaultstroke);
}
.contenedor-input-usuario {
  margin-top: 50px;
  position: relative;
}

.contenedor-input-contrasena {
  margin-top: 160px;
  position: relative;
}
.contenedor-input-label {
  color: var(--d1-color-texts);
  height: auto;
  position: absolute;
  left: 60px;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.input {
  border-width: 1px;
  border-radius: 15px;
  border-color: var(--dl-color-default-defaultstroke);
  border-style: solid;
  text-align: center;
  position: absolute;
  top: 40px;
  left: 60px;
  color: var(--dl-color-default-defaultstroke);
  width: 480px;
  height: 50px;
  font-size: 24px;
}

.contenedor-ingresar {
  width: 218px;
  height: 83px;
  display: flex;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 140px;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  margin-right: 0;
  border-radius: 15px;
  margin-bottom: 0;
  text-align: center;
  justify-content: center;
  background-color: var(--dl-color-default-defaultstroke);
}

.boton-ingresar {
  top: 18px;
  color: var(--d1-color-default-label-button);
  height: auto;
  position: relative;
  font-size: 32px;
  align-self: auto;
  font-style: Regular;
  font-family: Poppins;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  margin-bottom: 0;
  text-decoration: none;
}
</style>