import axios from 'axios'

const googleSheetUrl =
  'https://script.google.com/macros/s/AKfycbwMXaPYGNzObVAB5GRco0ZiVKlmdZUorF9ZAA7OjT9k2vB1L38jFtzNNSta-XowAQdMzg'

const apiClient = axios.create({
  baseURL: `${googleSheetUrl}`,
  headers: {
    'Content-Type': 'text/plain',
  },
})

export default {
  async GET() {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.get(`/exec?path=工作表1&action=read&key=${key}`)
    return res.data
  },
  async DELETE(data) {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.post(`/exec?path=工作表1&action=delete&key=${key}`, data)
    return res.data
  },
  async UPDATE(data) {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.post(`/exec?path=工作表1&action=update&key=${key}`, data)
    return res.data
  },
}
