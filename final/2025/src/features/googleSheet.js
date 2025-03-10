import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization:
    //   'Bearer ya29.a0AeXRPp4wmvh7o6IXOuQtPP58mNI8389EigZdKL4WZSgGQHHjfj9YPE5k-YrcbJacigxs6z9A2R0L0ojT88v95BJOsKECPeuUTnvM-HHeZsv0uo0Nsuu_1Qfz4yfk1VYAkTv_ALQfyEpihDSelCwQ_zWz2XyiBuuvxv7DdqIOaCgYKAYISARASFQHGX2MicI3aXk-6OvNebpJXgog4Fg0175',
  },
})

export default {
  async GET(url) {
    const res = await apiClient.get(`${url}?key=${API_KEY}`)
    return res.data
  },
  async POST(url, data) {
    const res = await apiClient.post(`${url}?key=${API_KEY}`, data)
    return res.data
  },
  // async PATCH(url, data) {
  //   const res = await apiClient.patch(url, data)
  //   return res.data
  // },
}
