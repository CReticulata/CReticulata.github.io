import axios from 'axios'

const url = 'https://api.imgbb.com/1/'
const API_KEY = import.meta.env.VITE_IMGBB_API_KEY

const apiClient = axios.create({
  baseURL: `${url}`,
})

export default {
  async POST(file) {
    const formData = new FormData()
    formData.append('image', file)

    const res = await apiClient.post(`upload?key=${API_KEY}`, formData)
    return res.data
  },
}
