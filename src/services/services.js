import axios from "./index";

export function login(email, password){
    let promise = new Promise(function(resolve,reject){
        axios.post(`/api/auth/login`,{
            email: email,
            password: password,
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function register(name, email, password){
    let promise = new Promise(function(resolve,reject){
        axios.post(`/api/auth/register`,{
            name: name,
            email: email,
            password: password,
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getUserData(token){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/me`, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getAllProject(token){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/project/get`,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getProjectById(token, id){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/project/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getAllWorkLog(token, limit, page){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/worklog/get?limit=${limit}&page=${page}`,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getWorkLogUser(token, limit, page){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/worklog?limit=${limit}&page=${page}`,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getWorkLogByUserId(token, user_id, limit, page){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/worklog/get/user/${user_id}?limit=${limit}&page=${page}`,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function addWorkLog(data, token){
    let promise = new Promise(function(resolve,reject){
        axios.post('/api/worklog/add', data,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function deleteWorkLog(id, token){
    let promise = new Promise(function(resolve,reject){
        axios.delete('/api/worklog/delete/' + id ,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getAllUser(token, limit, page){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/user/get?limit=${limit}&page=${page}`,{
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getUserDataById(token, id){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getTotalUserHoursWorkedByProject(token, id){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/worklog/get/user/byproject/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getAbsenRecap(token){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/user/get/absent/recap`, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}

export function getAbsenRecapByUserId(token, id){
    let promise = new Promise(function(resolve,reject){
        axios.get(`/api/user/get/absent/recap/byuser/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        })
        .then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
    return promise
}