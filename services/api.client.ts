import axios from 'axios'

export class ApiClient {
  async getVinRecals(vin: string) {
    return axios.post<{ vin: string }, {
      data: {
        status: string,
        data: {
          technicalCampaigns: [{ [key: string]: string }]
        }
      }
    }>(
      `/.netlify/functions/vin`,
      {
        vin,
      },
    )
  }
}
