import AuthService from '../services/auth.service';

const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const state = () => ({
  usuario: initialState
})

export const actions = {
  async login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      error => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  async logout({ commit }) {
    AuthService.logout();
    commit('logout');
  },
  async register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
  }
}

export const mutations = {
  loginSuccess(state, user) {
    state.usuario.status.loggedIn = true;
    state.usuario.user = user;
  },
  loginFailure(state) {
    state.usuario.status.loggedIn = false;
    state.usuario.user = null;
  },
  logout(state) {
    state.usuario.status.loggedIn = false;
    state.usuario.user = null;
  },
  registerSuccess(state) {
    state.usuario.status.loggedIn = false;
  },
  registerFailure(state) {
    state.usuario.status.loggedIn = false;
  }
}