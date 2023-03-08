import { getDataFromStorage } from '../utils/storage'
import { apiURL } from './environment'
import { Keys } from '../constants/keys'

export const EXPIRED_STATE = 3000204

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

var defaultHeaders: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const callApi = async (endPoint: string, method: Method, data: any, isBearer: boolean, multipart: boolean) => {
  var url = apiURL + endPoint
  if (isBearer) {
    const token = await getDataFromStorage(Keys.token)
    defaultHeaders['Authorization'] = 'Bearer ' + token
  } else {
    delete defaultHeaders.Authorization
  }
  if (multipart) {
    defaultHeaders['Content-Type'] = 'multipart/form-data'
  }
  else {
    defaultHeaders['Content-Type'] = 'application/json'
  }
  try {
    let response = await fetch(url, {
      method: method,
      headers: defaultHeaders,
      body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
    })

    let responseJson = await response.json()

    return responseJson
  } catch (error) {
    console.log('error:', error)
  }
}

export const fetchData = async (uri: string, method = Method.GET, data = null, isBearer = true, multipart = false) => {
  const resData = await callApi(uri, method, data, isBearer, multipart)
  return resData
}
