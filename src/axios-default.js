import axios from 'axios'

const customHeaders = { 'Content-Type': 'application/json' }

const instance = axios.create({
  baseURL: process.env.VUE_APP_DEFAULT_BACKEND_API_URL,
  headers: customHeaders
})

export default instance
