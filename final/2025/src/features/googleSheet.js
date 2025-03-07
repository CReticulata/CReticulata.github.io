import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  async GET(url) {
    const res = await apiClient.get(`${url}?key=${API_KEY}`)
    return res.data
  },
  async POST(url, data) {
    const res = await apiClient.post(url, data)
    return res.data
  },
  // async PATCH(url, data) {
  //   const res = await apiClient.patch(url, data)
  //   return res.data
  // },
}
