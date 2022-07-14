/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-25 03:48:33
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 12:50:03
 */
import request from "../util/axios"

export function selectDynamic(data){
    return request({
        url:"/homePage/selectDynamic",
        method: 'post',
        data:data,
    })
}


export function selectReport(){
    return request({
        url:"/dynamic/selectReport",
        method: 'get',
    })
}

export function deleteReport(params){
    return request({
        url:"/dynamic/deleteReport",
        method: 'post',
        params:params
    })
}

export function deleteDynamic(params){
    return request({
        url:"/dynamic/deleteDynamic",
        method: 'post',
        params:params
    })
}

