import {store} from '../redux/store'
import { setData } from '../redux/slice/user'

export const writeToken = (token) => {
    store.dispatch(setData({token:token}))
}

export const writeData = (token, uid, email, name) => {
    store.dispatch(setData({
        token: token,
        uid: uid,
        email: email,
        name: name,
    }))
}

export const removeToken = () => {
    store.dispatch(setData({}))
}