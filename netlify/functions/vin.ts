import { Handler } from '@netlify/functions'
import axios from 'axios'

const CryptoJS = require('node-cryptojs-aes').CryptoJS
const accessToken = 'TTJiNG1oMnR1Q0plZ1VmOkkyQlZLU0dGRFlQSUNHSktHS0dKR1ZKSEZMRkdXZ0ZLR0hGRktIbFpUT0U='

const handler: Handler = async (event, context) => {
  if (event.httpMethod != 'POST') return { statusCode: 200 }
  if (!event.body) throw new Error('Wrong request')
  const { vin } = JSON.parse(event.body)
  const resp = await axios.get<{
    status: string, data: {
      technicalCampaigns: [{ [key: string]: string }]
    }
  }>(`https://vehiclerecall.bmwgroup.com/api/recall?vin=${vin}&market=GB`, {
    headers: {
      Authorization: `Basic ${CryptoJS.AES.encrypt(accessToken.trim(), 'hdlurn13bjdlnvld').toString()}`,
      Referer: 'https://vehiclerecall.bmwgroup.com/index.html?brand=bmw&market=uk&language=en',
      isHitFromUI: 'true',
      'X-Frame-Options': 'deny',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  console.log(resp.data)
  return {
    statusCode: 200,
    body: JSON.stringify(resp.data),
  }
}

export { handler }
