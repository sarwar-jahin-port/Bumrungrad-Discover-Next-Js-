import React from 'react'
import { TextField } from '@mui/material'
import { useState } from 'react'
const AirPickup = () => {
  //loader
  const [loader, setLoader] = useState()

  const [appointmentfile, setAppointmentfile] = useState('')
  const [airTicketFile, setAirTicketFile] = useState('')
  const [passenger, setPassenger] = useState('')

  const orderAirPickup = (event) => {
    setLoader(true)
    event.preventDefault()
    const form = event.target

    const formData = new FormData()
    formData.append('appointment', appointmentfile)
    formData.append('air_ticket', airTicketFile)
    formData.append('passenger', passenger)

    fetch('http://127.0.0.1:8000/api/add/air/pickup', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {

          setLoader(false)
          window.location.reload();
          alert("Airport request sent! Our support team will contact you soon.")
        }
      })
      .catch((error) => console.error(error))

    form.reset()
  }
  return (
    <div>
      <form
        onSubmit={orderAirPickup}
        className='mt-3 mb-2 md:w-full max-w-screen-lg sm:w-96'
      >
        <div className='mb-2 flex flex-col gap-6'>
          <div className='mt-2'>
            <p className='mb-2 font-semibold text-sm'>
              Patient Appointment File
            </p>
            <TextField
              type='file'
              onChange={(e) => setAppointmentfile(e.target.files[0])}
              fullWidth
              required
            />
          </div>
          <div className='mt-2'>
            <p className='mb-2 font-semibold text-sm'>Air Ticket Copy</p>
            <TextField
              type='file'
              onChange={(e) => setAirTicketFile(e.target.files[0])}
              fullWidth
              required
            />
          </div>
          <div className='mt-2'>
            <p className='mb-2 font-semibold text-sm'>Number of Passenger</p>
            <TextField
              type='number'
              onChange={(e) => setPassenger(e.target.value)}
              fullWidth
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue text-white px-3 py-1 rounded float-left mt-3'
        >
          {loader ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default AirPickup
