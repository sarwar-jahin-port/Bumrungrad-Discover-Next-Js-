'use client';

import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { useTranslations } from 'next-intl'

const Disclaimer = () => {
  const t = useTranslations('home.disclaimer')
  const [tickerText, setTickerText] = useState(t('fallback'))

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get/site-settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.data?.breaking_news_ticker) {
          setTickerText(data.data.breaking_news_ticker)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className='mt-5'>
      <>
        <Marquee speed={100} className='font-semibold text-blue'>
          {tickerText}
        </Marquee>
      </>
    </div>
  )
}

export default Disclaimer
