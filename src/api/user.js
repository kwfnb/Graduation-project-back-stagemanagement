/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-20 03:26:54
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-10 01:52:03
 */
import request from "../util/axios"

export function selectAdmin(data){
    return request({
        url:"/user/selectAdmin",
        method: 'post',
        data:data,
    })
}

export function SMSverification(params){
    return request({
        url:"/user/SMSverification",
        method: 'post',
        params:params,
    })
}

export function updateAdmin(data){
    return request({
        url:"/user/updateAdmin",
        method: 'post',
        data:data,
    })
}

export function selectUser(data){
    return request({
        url:"/user/selectUser",
        method: 'post',
        data:data,
    })
}

export function insertSystemMessage(data){
    return request({
        url:"/user/insertSystemMessage",
        method: 'post',
        data:data,
    })
}

export function updateUser(data){
    return request({
        url:"/user/updateUser",
        method: 'post',
        data:data
    })
}