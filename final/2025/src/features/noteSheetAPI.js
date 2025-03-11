import axios from 'axios'

const googleSheetUrl =
  'https://script.google.com/macros/s/AKfycbyPj__28LNYdf8Fs2Xn2A4RpmrIGWDNB3SAuzpK8saAvHx0dBmeLGdkRE9pjREnsgOv'

const apiClient = axios.create({
  baseURL: `${googleSheetUrl}`,
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'text/plain',
    // Authorization:
    //   'Bearer ya29.a0AeXRPp4wmvh7o6IXOuQtPP58mNI8389EigZdKL4WZSgGQHHjfj9YPE5k-YrcbJacigxs6z9A2R0L0ojT88v95BJOsKECPeuUTnvM-HHeZsv0uo0Nsuu_1Qfz4yfk1VYAkTv_ALQfyEpihDSelCwQ_zWz2XyiBuuvxv7DdqIOaCgYKAYISARASFQHGX2MicI3aXk-6OvNebpJXgog4Fg0175',
  },
})

export default {
  async GET(user) {
    const res = await apiClient.get(`/exec?path=工作表1&action=read&user=${user}`)
    return res.data
  },
  async DELETE(data) {
    const res = await apiClient.post(`/exec?path=工作表1&action=delete`, data)
    return res.data
  },
  async UPDATE(data) {
    const res = await apiClient.post(`/exec?path=工作表1&action=update`, data)
    return res.data
  },
  // async UPDATE(data) {
  //   console.log(data)
  //   const pros = data.pros.split('\n').join('\\n')
  //   const cons = data.cons.split('\n').join('\\n')
  //   const params =
  //     `user=${data.user}` +
  //     `&id=${data.id}` +
  //     `&storeName=${data.storeName}` +
  //     `&foodScore=${data.foodScore}` +
  //     `&serviceScore=${data.serviceScore}` +
  //     `&pros=${pros}` +
  //     `&cons=${cons}` +
  //     `&location=${JSON.stringify(data.location)}` +
  //     `&googlemapURL=${data.googlemapURL}` +
  //     `&address=${data.address}`

  //   const res = await apiClient.get(`/exec?path=工作表1&action=update&${params}`)
  //   return res.data
  // },
}
