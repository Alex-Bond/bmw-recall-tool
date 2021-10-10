import React from 'react'

export const VinForm: React.FC<{ setVin: ((value: string) => void) }> = (props) => {
  const { setVin } = props
  return (
    <form onSubmit={event => {
      // @ts-ignore
      setVin(event.target.vin.value)
    }}>
      <div className='mb-3'>
        <label htmlFor='vin' className='form-label'>VIN</label>
        <input type='text' name='vin' className='form-control' id='vin' aria-describedby='vinHelp' required />
        <div id='vinHelp' className='form-text'>Your full VIN numbers of the car.</div>
      </div>

      <button type='submit' className='btn btn-primary'>Check Recalls</button>
    </form>
  )
}
