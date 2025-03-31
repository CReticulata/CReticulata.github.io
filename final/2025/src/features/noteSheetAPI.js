import axios from 'axios'

const googleSheetUrl =
  'https://script.google.com/macros/s/AKfycbwNkQfkGeeqBrKeNtZIMsXC9xfDuX5yR-QHvzIAeE2ckV25RDV_q3kJPBOHSF9dtrhtWw'

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
  async SIGNUP() {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.get(`/exec?action=signup&key=${key}`)
    return res.data
  },
  async SUBSCRIBE(email) {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.get(`/exec?action=subscribe&email=${email}&key=${key}`)
    return res.data
  },
  async UNSUBSCRIBE(email) {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.get(`/exec?action=unsubscribe&email=${email}&key=${key}`)
    return res.data
  },
  async CHANGEPRIVACY() {
    const key = localStorage.getItem('Tomato-key')
    const res = await apiClient.get(`/exec?action=change-privacy&key=${key}`)
    return res.data
  },
}
