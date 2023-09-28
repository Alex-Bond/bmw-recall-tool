import { Handler } from '@netlify/functions'
import axios from 'axios'

const CryptoJS = require('node-cryptojs-aes').CryptoJS
const accessToken = 'VmVoaWNsZVJlY2FsbFVJOkkyQlZJQ0dXZ29qeGI0ZEI='

export const handler: Handler = async (event, context) => {
  if (event.httpMethod != 'POST') return { statusCode: 200 }
  if (!event.body) throw new Error('Wrong request')
  const { vin } = JSON.parse(event.body)
  const resp = await axios.get<{
    status: string, data: {
      technicalCampaigns: [{ [key: string]: string }]
    }
  }>(`https://vehiclerecall.bmwgroup.com/api/recall?vin=${vin}&market=GB&language=EN`, {
    headers: {
      Authorization: `Basic ${CryptoJS.AES.encrypt(accessToken.trim(), 'vren!@noswa').toString()}`,
      Referer: 'https://vehiclerecall.bmwgroup.com/index.html?brand=bmw&market=uk&language=en',
      isHitFromUI: 'true',
      FromUI: 'true',
      Fromui: 'true',
      'X-Frame-Options': 'deny',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    },
  })
  console.log(resp.data)
  return {
    statusCode: 200,
    body: JSON.stringify(resp.data),
  }
}
