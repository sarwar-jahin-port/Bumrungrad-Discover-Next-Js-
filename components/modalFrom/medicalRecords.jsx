import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const MedicalRecords = () => {
  const userDetails = JSON.parse(localStorage.getItem('User_Details'))
  //loader
  const [loader, setLoader] = useState()

  const [passport, setPassport] = useState('')
  const [name, setName] = useState(
    userDetails?.firstName
      ? `${userDetails?.firstName} ${userDetails?.lastName}`
      : ''
  )
  const [hnNum, setHnNum] = useState('')
  const [caseSummary, setCaseSummary] = useState('')
  const navigate = useNavigate()

  const addPatient = (event) => {
    setLoader(true)
    event.preventDefault()
    const form = event.target

    const formData = new FormData()

    formData.append('passport', passport)
    formData.append('name', name)
    formData.append('caseSummary', caseSummary)
    formData.append('hnNum', hnNum)

    fetch('https://api.discoverinternationalmedicalservice.com/api/add/medical/report', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate('/')
          alert(
            'Medical record request sent! Our support team will contact you soon.'
          )
          form.reset()
          setLoader(false)
        }
      })
      .catch((error) => console.error(error))
  }
  return (
    <div className='md:my-10 md:container md:mx-auto lg:w-1/2 shadow-xl rounded py-10 md:py-12 md:px-10 lg:px-16'>
      <HelmetProvider>
        {' '}
        <Helmet>
          <meta charSet='utf-8' />
          <title>Bumrungrad Hospital: Explore The Accreditation & Awards</title>
          <meta
            name='description'
            content="Discover Bumrungrad International Hospital's Accolades. Elevate your health journey with excellence at our hospital. Explore now! #BumrungradHospital

"
          />
          <link
            rel='canonical'
            href='https://discoverinternationalmedicalservice.com/medical-record'
          />
        </Helmet>
      </HelmetProvider>
      <h1 className='text-center capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue'>
        Medical Records
      </h1>
      <form
        onSubmit={addPatient}
        className='mt-3 mb-2 md:w-full max-w-screen-lg pb-8 px-5'
      >
        <div className='mb-2 flex flex-col'>
          <div>
            <p className='mb-2 font-semibold text-sm'>
              {' '}
              <span className='text-red text-lg'>*</span>Enter Your Name
            </p>
            <TextField
              onChange={(e) => setName(e.target.value)}
              fullWidth
              value={name}
            />
          </div>
          <div className='mt-2'>
            <p className='mt-2 font-semibold text-sm'>
              <span className='text-red text-lg'>*</span> Attach Your Passport
              Copy
            </p>
            <TextField
              type='file'
              onChange={(e) => setPassport(e.target.files[0])}
              fullWidth
              required
            />
          </div>
          <div>
            <p className='mt-2 font-semibold text-sm'>
              {' '}
              <span className='text-red text-lg'>*</span> HN Number
            </p>
            <TextField onChange={(e) => setHnNum(e.target.value)} fullWidth />
          </div>
          <div>
            <p className='mt-2 font-semibold text-sm'>
              {' '}
              <span className='text-red text-lg'>*</span> Report Details
            </p>
            <TextField
              multiline
              onChange={(e) => setCaseSummary(e.target.value)}
              rows={4}
              fullWidth
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue mt-6 text-white px-6 py-2 md:px-12 md:py-4 rounded flex items-center gap-1'
        >
          Submit
          {loader && (
            <div className='flex gap-0.5'>
              <div className='h-2 w-2 rounded-full bg-white shadow'></div>
              <div className='h-2 w-2 rounded-full bg-white shadow animate-bounce'></div>
              <div className='h-2 w-2 rounded-full bg-white shadow'></div>
            </div>
          )}
        </button>
      </form>
    </div>
  )
}

export default MedicalRecords
