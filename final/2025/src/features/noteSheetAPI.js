import axios from 'axios'

const googleSheetUrl =
  'https://script.google.com/macros/s/AKfycbxPtvm6VFJFvo0VWy0JSVR7jKFGB8fs6FI3MrO_6IOm0OlUQlN2cGkHSn5LODFcJC7-dg'

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
}
