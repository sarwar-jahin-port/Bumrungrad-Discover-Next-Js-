import MedicalTreatment from "./_comp/medicalTreatment";

export const metadata = {
    title: 'Bumrungrad Hospital: Medical Treatment',
    description: "Get specialized evaluation support from our clinical team to help guide your treatment options before you commit to a plan.",
    alternates: {
      canonical: 'https://discoverinternationalmedicalservice.com/our-services/medical-treatment',
    },
    charset: 'utf-8',
};

const page = () => {
  return (
    <div>
        <MedicalTreatment />
    </div>
  )
}

export default page
