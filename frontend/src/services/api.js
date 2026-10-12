//import axios library 
import axios from "axios";

//create an axios instance and make the request 
//the common connection url will be the base url 
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

//write an interceptor to automatically include the access token 
//along with the request that is sent to the server 
//the request interceptor will run before the request is being sent 
api.interceptors.request.use((config)=>{
    //config is a variable that receives a value when Axios calls this function 
    //read token from localStorage 
    const token = localStorage.getItem("access");
    //if we got the token, then attach it as the authorization header 
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//write another interceptor to check if the response is 401 unauthorized 
//this interceptor will be running after the response of the request is received 
//if 401, then delete the access and refresh tokens 
api.interceptors.response.use((response)=> response, 
    //
    //return the response itself if the response is valid 
    (error) => {
        //onrejected arrow function 
        if(error.response?.status === 401) {
            //? is for optional chaining, 
            //so that we will not get error if response is null
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            //redirect the user back to the login page/home page 
            window.location.href="/";
        }
        return Promise.reject(error); //return error
    }
);

export default api;