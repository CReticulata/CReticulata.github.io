import axios from 'axios'

const url = 'https://yhbtdswgzercvhikcfkp.supabase.co/functions/v1/storage-upload'

const apiClient = axios.create({
  baseURL: `${url}`,
})

export default {
  async POST(file) {
    const formData = new FormData()
    formData.append('file', file)

    const res = await apiClient.post('', formData)
    return res.data
  },
}
