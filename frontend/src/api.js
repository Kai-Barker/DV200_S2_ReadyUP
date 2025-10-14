import axios from "axios";


//Custom axios instance. pretty handy because retyping http blah blah gets annoying
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

//Intercepts every request to add the JWT token for authorization and to identify the user :)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = token; 
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
});

export default api;