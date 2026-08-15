'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import CardLoader from '@/components/ui/cardLoader'
import { usePathname } from 'next/navigation'
import { CardLoaders, NewsCardSkeleton } from '@/components/ui/cardload'
import { useTranslations } from 'next-intl'


export default function News() {
  const t = useTranslations('home.news')
  const path = usePathname()
  const [newsData, setNewsData] = useState()
  const [loader, setLoader] = useState()
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoader(true)
    fetch('https://api.discoverinternationalmedicalservice.com/api/get/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNewsData(data?.data)
          setLoader(false)
        } else {
          setLoader(false)
        }
      })
  }, [])

  const searchedNews =
    path === '/news' && search
      ? newsData?.filter((d) =>
          d?.newsTitle?.toLowerCase().includes(search.toLowerCase()),
        )
      : newsData

  const sanitizedNews = path === '/news' ? searchedNews : searchedNews?.slice(0,4)
  const cardNumber = path === '/news' ? 3 : 4
  const cardLength = path === '/news' ? 15 : 4

  return (
    <div className='p-5 md:p-10 md:container md:mx-auto'>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
        <h2 className='capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue'>
          {t('heading')}
        </h2>
       {
         path === '/news' ? (
           <input
             type='text'
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder={t('searchPlaceholder')}
             className='border border-ash/40 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue md:w-72'
           />
         ) : (
           <Link href='/news' className='text-blue hover:text-blue-700 px-4 border py-1 hover:bg-blue hover:text-white transition duration-300'>{t('viewAll')}</Link>
         )
       }
      </div>
      {loader ? (
        <CardLoaders Component={NewsCardSkeleton} cardLength={cardLength} gridNumber={cardNumber} speed='slow' />
      ) : sanitizedNews?.length === 0 ? (
        <p className='my-10 text-center text-black/60'>
          {search ? t('noNewsFor', { query: search }) : `${t('noNews')}.`}
        </p>
      ) : (
        <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-4 mt-5 md:mt-10'>
          {sanitizedNews?.map((d, i) => (
            <div
              key={i}
              className='shadow rounded hover:shadow-xl duration-300 ease-linear flex flex-col justify-between'
            >
              <Image
                src={d.newsImage}
                alt='Bumrungrad International Hospital'
                effect='blur'
                className=''
                height={300}
                width={500}
              />
              <div className='p-4'>
                {' '}
                <h5 className='font-semibold text-blue text-lg'>
                  {`${d?.newsTitle?.length > 50 ? d?.newsTitle?.slice(0, 50) + '...' : d?.newsTitle}`}
                </h5>
                <p className='my-3 text-justify'>
                  {`${d?.newsDescription?.length > 100 ? d?.newsDescription?.slice(0, 100) + '...' : d?.newsDescription}`}
                </p>
                <Link href={`/news/${d?.id}`}>
                  <button className='border border-blue bg-blue hover:bg-white px-2 py-1 rounded hover:text-blue text-white duration-300 ease-linear'>
                    {t('readMore')}
                  </button>
                </Link>
              </div>
             
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
