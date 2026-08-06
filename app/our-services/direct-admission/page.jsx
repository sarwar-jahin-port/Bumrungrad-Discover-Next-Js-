import DirectAdmission from "./_comp/directAdmission";

export const metadata = {
    title: 'Bumrungrad Hospital: Direct Admission',
    description: "Quick online pre-registration and personal help from our team to make your arrival as smooth and stress-free as possible.",
    alternates: {
      canonical: 'https://discoverinternationalmedicalservice.com/our-services/direct-admission',
    },
    charset: 'utf-8',
};

const page = () => {
  return (
    <div>
        <DirectAdmission />
    </div>
  )
}

export default page
