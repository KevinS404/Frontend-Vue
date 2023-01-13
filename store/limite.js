export const state = () => ({
    limite : null
  })

const mutations = {
    setLimite(state, limite){
        state.limite = limite
    }
}

const getters = {
    getValor: (state) => state.limite
}

export default {
    state,
    mutations,
    getters
}