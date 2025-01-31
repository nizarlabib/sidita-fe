import axios from "axios";

import {store} from '../redux/store'
import { setData } from '../redux/slice/user'
import history from "../history";

let instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        // Authorization:'Bearer '+JSON.parse(JSON.parse(localStorage.getItem("persist:user")).value).token
    }
})
if(localStorage.getItem("persist:user") != undefined && JSON.parse(JSON.parse(localStorage.getItem("persist:user"))?.value)?.token){
    instance.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(JSON.parse(localStorage.getItem("persist:user")).value).token
}

instance.interceptors.response.use(res=>{
//for 200
    return res;
},
res=>{
//for 400-500
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:user")).value).access_token)
if(!res.response){
    res.response = {}
    res.response.data = {}
    res.response.data.message = 'Something Wrong'
}    
    if(res.response.status == 401){
        history.push('/login')
        store.dispatch(setData({}))
    }
    throw res;
})


export default instance

