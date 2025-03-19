import axios from 'axios'

const url = 'https://api.imgur.com/3/image'
const CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID

const apiClient = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`,
  },
})

export default {
  async GET(imageHash) {
    const res = await apiClient.get(`/${imageHash}`)
    return res.data
  },
  async POST(formData) {
    const res = await apiClient.post('', formData)
    return res.data
  },
}
