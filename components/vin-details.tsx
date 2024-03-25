import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { DefectCodeInfo } from '../constants/defect-code-info'
import { ApiClient } from '../services/api.client'

export const VinDetails: React.FC<{ vin: string }> = (props) => {
  const { vin } = props

  const [isLoading, setIsLoading] = React.useState(true)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [response, setResponse] = React.useState<{
    data: {
      technicalCampaigns: [{ [key: string]: string }]
    }
  }>()

  React.useEffect(() => {
    (async function req() {
      try {
        const client = new ApiClient()
        const result = await client.getVinRecals(vin.toUpperCase())
        if (result.data.status == 'OK') {
          setResponse(result.data)
          setIsSuccess(true)
          setIsLoading(false)
        } else if(result.data.data?.allowAccess == false) {
          setErrorMessage('BMW system under maintenance (again)')
          setIsLoading(false)
        }else {
          setErrorMessage(result.data.status)
          setIsLoading(false)
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status == 401 || e.response?.status == 403) {
            setErrorMessage(`Ahh... BMW changed things again. Server response code ${e.response.status}.`)
            setIsLoading(false)
            return
          }
        }
        // @ts-ignore
        setErrorMessage(e.message)
        setIsLoading(false)
      }
    })()
  }, [vin])

  if (isLoading) {
    return (<h2>Loading</h2>)
  } else {
    if (isSuccess) {
      return (
        <>
          <h2>Results for VIN {vin.toUpperCase()}</h2>
          {response?.data.technicalCampaigns?.length ? (
            <>
              <table className='table'>
                <thead>
                <tr>
                  <th>Recall Type</th>
                  <th>Defect Code</th>
                  <th>Defect Code Description</th>
                  <th>Reservation Date</th>
                  <th>VIN Status</th>
                  <th>Reservation Dealer</th>
                  <th>Customer Notification</th>
                  <th>Error Flag</th>
                  <th>Error Message</th>
                </tr>
                </thead>
                <tbody>
                {response?.data.technicalCampaigns.map(item => (
                  <tr key={item.defectCode}>
                    <td>{item.recallType}</td>
                    <td>{item.defectCode}</td>
                    <td>{item.defectCodeDescription?.length ? item.defectCodeDescription : DefectCodeInfo[item.defectCode]?.defectCodeDescription}</td>
                    <td>{item.reservationDate}</td>
                    <td>{item.vinStatus}</td>
                    <td>{item.reservationDealer}</td>
                    <td>{item.customerNotification}</td>
                    <td>{item.ErrorFlag}</td>
                    <td>{item.ErrorMessage}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </>
          ) : (
            <h3 className='my-5'>No open issues found</h3>
          )}

          <Link href='/'><a className='btn btn-primary btn-block'>Try different VIN</a></Link>

          <hr />
          <h4>Couple notes:</h4>
          <ul>
            <li>
              This tool uses BMW GROUP API, which means that data comes from global database. Tool by itself is not
              official, so that that data can be outdated or not complete. If you have questions about your car, please
              contact BMW Genius at 1.844.4GENIUS (443-6487) or your local dealer.
            </li>
            <li>
              <strong>Recall Type</strong> can have a value of <code>no recall</code>, which usually means that this
              is <strong>enhancement</strong> (thanks to the great chip shortages) when a car is not yet delivered to
              the customer.
            </li>
            <li>
              <strong>VIN Status</strong> can be <code>open</code> which means that issue is not yet resolved
              or <code>closed</code> for fixed items.
            </li>
            <li>
              <strong>Code Descriptions</strong> was removed from API recently, but I&apos;m trying to map known defect
              codes
              to descriptions. If you don&apos;t see a description for specific code but know what it is, please submit
              the
              issue on GitHub, and I will add it to the tool.
            </li>
          </ul>
        </>
      )
    } else {
      return (
        <>
          <h2>Error while requesting details: {errorMessage}</h2>
          <Link href='/'><a className='btn btn-primary btn-block'>Try different VIN</a></Link>
        </>
      )
    }
  }
}
