export const state = () => ({
    operativo: {}
  })

const mutations = {
    setOperativo(state, operativo){
        state.operativo = operativo
    }
}

const getters = {
    getIdOperativo: (state) => state.operativo
}

export default {
    state,
    mutations,
    getters
}