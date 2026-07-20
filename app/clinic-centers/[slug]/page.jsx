import React from 'react'
import SingleCenter from './_comp/singleCenter'

export async function generateMetadata({ params }) {
  // Fetch clinic details or other relevant data
  const clinic = await fetch(`http://127.0.0.1:8000/api/get/centers/${params.slug}`)
    .then((res) => res.json())
    .then((data) => data?.response?.data);

  if (!clinic) {
    return { title: 'Clinical Center - Bumrungrad Hospital' };
  }

  return {
    title: `${clinic.name} - Bumrungrad Hospital`,
    description: `Discover top care at Bumrungrad Hospital's ${clinic.name}. Tailored healthcare services at our ${clinic.name} clinic.`,
    alternates: {
      canonical: `https://discoverinternationalmedicalservice.com/clinic-centers/${params.slug}`,
    },
  };
}

const page = ({params}) => {
  return (
    <div>
      <SingleCenter params={params} />
    </div>
  )
}

export default page