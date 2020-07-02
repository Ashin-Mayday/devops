import axios from 'axios'
import qs from 'qs'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

export const POST = (url, params) => {
  return axios.post(url, qs.stringify(params)).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(url, params).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(url, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(url, params).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(url, params).then(res => res.data)
}
