import decode from 'jwt-decode';
import Cookies from 'js-cookie';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return decode(token);
    }
    return null;
  }
  
    loggedIn() {
      const token = this.getToken();
      return token && !this.isTokenExpired(token) ? true : false;
    }
  
    isTokenExpired(token) {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
      }
      return false;
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    login(token) {
      localStorage.setItem('token', token);
      window.location.assign('/Profile');
    }
  
    logout() {
      localStorage.removeItem('token');
      window.location.assign('/');
      Cookies.remove('favoriteCities');
    }
    redirect() {
      window.location.assign('/login');
      alert("You must be signed in to Schedule an appointment");
    }
  }
  
  export default new AuthService();