import React from 'react'
import axios from 'axios'

export const VinDetails: React.FC<{ vin: string, reset: () => void }> = (props) => {
  const { vin, reset } = props

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
        const result = await axios.get<{
          status: string, data: {
            technicalCampaigns: [{ [key: string]: string }]
          }
        }>(`https://vehiclerecall.bmwgroup.com/api/recall?vin=${vin}&market=GB`, {
          headers: {
            Authorization: 'Basic T2xpdmVyOkRybEJpR29TajNlM1BITHE=',
          },
        })
        if (result.data.status == 'OK') {
          setResponse(result.data)
          setIsSuccess(true)
          setIsLoading(false)
        } else {
          setErrorMessage(result.data.status)
          setIsLoading(false)
        }
      } catch (e) {
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
          <h2>Results for VIN {vin}</h2>
          <table className='table'>
            <thead>
            <tr>
              <th>Recall Type</th>
              <th>Defect Code</th>
              <th>Defect Code Description</th>
              <th>Reservation Date</th>
              <th>Vin Status</th>
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
                <td>{item.defectCodeDescription}</td>
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
          <a className='btn btn-primary btn-block' onClick={() => reset()}>Try different VIN</a>
        </>
      )
    } else {
      return (
        <>
          <h2>Error while requesting details: {errorMessage}</h2>
          <a className='btn btn-primary btn-block' onClick={() => reset()}>Try different VIN</a>
        </>
      )
    }
  }
}
