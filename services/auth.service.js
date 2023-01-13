import axios from 'axios';

const API_URL = 'http://143.198.116.56:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
