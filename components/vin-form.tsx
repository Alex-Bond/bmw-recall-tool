import React, { FormEventHandler, useState } from 'react'
import { useRouter } from 'next/router'

export const VinForm: React.FC = () => {
  const router = useRouter()

  const [vin, setVin] = useState('')

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (vin.length != 17) {
      alert('VIN must be exactly 17 chars/digits')
      return
    }

    router.push(`/vin/${vin}`)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-3'>
        <label htmlFor='vin' className='form-label'>VIN</label>
        <input type='text'
               name='vin'
               className='form-control'
               id='vin'
               aria-describedby='vinHelp'
               value={vin}
               onChange={e => setVin(e.target.value.toUpperCase())}
               required />
        <div id='vinHelp' className='form-text'>Your full 17 chars/digits VIN number of the BMW car.</div>
      </div>

      <button type='submit' className='btn btn-primary'>Check Recalls</button>
    </form>
  )
}
