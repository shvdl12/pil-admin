import axios from 'axios';
import getToken from './utils/token'

const _axios = axios.create()


_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers.Authorization = getToken()

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(// 확인해
  function(response) {
    // Do something with response data
    // if(response.data.token) {
    //   localStorage.accessTokenAdmin = response.data.token;
    //   axios.defaults.headers.common.Authorization = localStorage.accessTokenAdmin;
    //   store.commit("RESET")
    //   console.log(store.state)
      
    // }
    return Promise.resolve(response);
  },
  function(error) {
    // Do something with response error
    if(error.response.status === 401) {
      window.location.href = '/';
     // delete localStorage
    }
    else if(error.response.status === 500 ) {
      let message = error
      if(error.response.data.message) {
        message = message + "\n" + error.response.data.message
      }
      alert(message)
    }

    return Promise.reject(error);
  }
);

export default _axios;