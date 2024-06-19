import { Handler } from '@netlify/functions'
import axios from 'axios'
import * as https from 'node:https'

const CryptoJS = require('node-cryptojs-aes').CryptoJS
const accessToken = 'VmVoaWNsZVJlY2FsbFVJOkkyQlZJQ0dXZ29qeGI0ZEI='

export const handler: Handler = async (event, context) => {
  if (event.httpMethod != 'POST') return { statusCode: 200 }
  if (!event.body) throw new Error('Wrong request')
  const { vin } = JSON.parse(event.body)
  const agent = new https.Agent({
    rejectUnauthorized: false,
  })
  try {
    const resp = await axios.get<{
      status: string,
      data: {
        technicalCampaigns: [{ [key: string]: string }]
        vin: string
        vinStatus: string
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
      httpsAgent: agent,
    })

    console.log({
      status: resp.data.status,
      vin: resp.data.data.vin,
      recalls: resp.data.data.technicalCampaigns.reduce((o, i) => {
        o[i.defectCode] = i.defectCodeDescription
        return o
      }, {}),
    })
    return {
      statusCode: 200,
      body: JSON.stringify(resp.data),
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error({ code: e.code, body: e.response?.data })
    }
    throw e
  }
}
