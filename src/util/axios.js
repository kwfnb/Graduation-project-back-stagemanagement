/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-05 12:21:33
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-21 22:06:38
 */
import axios from "axios";
import {VUE_BASE_URL} from "./index";

const instance = axios.create({
    baseURL:VUE_BASE_URL,
})

instance.defaults.timeout = 30000;

//请求拦截
instance.interceptors.request.use(
    function(config){
        if(config.isJson){
            config.headers["Content-Type"] = 'application/json';  
        }
        if (config.isMultipart) {
             config.headers["Content-Type"] = 'multipart/from-data';
        }
        return config;
    },
    function(err){
        return Promise.reject(err)
    }
);

//响应拦截
instance.interceptors.response.use(
    function(response){
        let resData = response.data;
        console.log("response",response);
        
        return response;
    },
    function(err){
        return Promise.reject(err)
    }
)

export default instance;