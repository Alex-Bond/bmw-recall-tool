import React from 'react'

export const VinForm: React.FC = () => {
  return (
    <form onSubmit={event => {
      // @ts-ignore
      const value: string = event.target.vin.value
      if (value.length != 17) {
        event.preventDefault()
        event.stopPropagation()
        alert('VIN must be exactly 17 chars/digits')
      }
    }}>
      <div className='mb-3'>
        <label htmlFor='vin' className='form-label'>VIN</label>
        <input type='text' name='vin' className='form-control' id='vin' aria-describedby='vinHelp' required />
        <div id='vinHelp' className='form-text'>Your full 17 chars/digits VIN number of the BMW car.</div>
      </div>

      <button type='submit' className='btn btn-primary'>Check Recalls</button>
    </form>
  )
}
