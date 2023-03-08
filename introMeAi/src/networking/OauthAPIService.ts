import { Method, callApi, fetchData } from './NetworkManager'
import { api } from './Environment'
import { storeDataToStorage } from '../utils/storage'


export const loginQuery = async (data: any) => {
    const response = await fetchData(api.login, Method.POST, data, false)
    if (response.status == 200) {
        storeDataToStorage('token', response.token)
        return response
    } else {
        return response
    }
}

export const signup = async ({ email, password }) => {
    let data = { email, password }
    const response = await fetchData(api.signup, Method.POST, data, false)
    if (response.status == 200) {
        storeDataToStorage('token', response.token)
        return response
    } else {
        return response
    }
}

export const forgotPassword = async ({ email }) => {
    let data = { email }
    const response = await fetchData(api.forgotPassword, Method.POST, data, false)
    if (response.status == 200) {
        return response
    } else {
        return response
    }
}