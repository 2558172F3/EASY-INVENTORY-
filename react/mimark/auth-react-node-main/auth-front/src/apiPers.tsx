import axios from 'axios'
const APIURL = 'http://127.0.0.1:9000/'
// const APIURL ="http://54.211.37.134:8000/"

const apiPers = axios.create({
  baseURL:APIURL ,
  headers: {
    'Content-type': 'application/json',
  },
})

apiPers.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  }
)
export default apiPers