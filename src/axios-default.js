import axios from 'axios'

const customHeaders = { 'Content-Type': 'application/json' }

const instance = axios.create({
  baseURL: 'http://192.168.0.128:8087/api/v1',
  headers: customHeaders
})

export default instance
