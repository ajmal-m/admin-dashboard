import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});


axiosInstance.interceptors.request.use(function (config) {
    let token =  localStorage.getItem("token");
    if(token) token = JSON.parse(token);
    if(token){
          config.headers.Authorization = `Bearer ${token}`
    }  
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;