import axios from 'axios'

const googleSheetUrl =
  'https://script.google.com/macros/s/AKfycbxAlW3xAgN-XveIMW0ICUDKygdyBCoZSlKyiGlVqTxnb5i5gjsMYEeFh7QnyOInKcv9wg'

const apiClient = axios.create({
  baseURL: `${googleSheetUrl}`,
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'text/plain',
    // Authorization:
    //   'Bearer ya29.a0AeXRPp4wmvh7o6IXOuQtPP58mNI8389EigZdKL4WZSgGQHHjfj9YPE5k-YrcbJacigxs6z9A2R0L0ojT88v95BJOsKECPeuUTnvM-HHeZsv0uo0Nsuu_1Qfz4yfk1VYAkTv_ALQfyEpihDSelCwQ_zWz2XyiBuuvxv7DdqIOaCgYKAYISARASFQHGX2MicI3aXk-6OvNebpJXgog4Fg0175',
  },
})

export default {
  async GET() {
    const res = await apiClient.get(`/exec?path=工作表1&action=read`)
    return res.data
  },
  async POST(data) {
    const pros = data.pros.split('\n').join('\\n')
    const cons = data.cons.split('\n').join('\\n')
    const params =
      `user=${data.user}` +
      `&id=${data.id}` +
      `&storeName=${data.storeName}` +
      `&foodScore=${data.foodScore}` +
      `&serviceScore=${data.serviceScore}` +
      `&pros=${pros}` +
      `&cons=${cons}` +
      `&location=${JSON.stringify(data.location)}` +
      `&googlemapURL=${data.googlemapURL}` +
      `&address=${data.address}`

    const res = await apiClient.get(`/exec?path=工作表1&action=write&${params}`)
    return res.data
  },
  // async PATCH(url, data) {
  //   const res = await apiClient.patch(url, data)
  //   return res.data
  // },
}
