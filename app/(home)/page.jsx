import Head from "next/head";
import BookingModal from "./_comp/bookingModal";
import ClinicCenters from "./_comp/clinicalCenter";
import Disclaimer from "./_comp/disclaimer";
import HomeContact from "./_comp/homeContact";
import JourneyBetter from "./_comp/journeyBetter";
import Landing from "./_comp/landing";
import MediExpress from "./_comp/mediExpress";
import MiddleBar from "./_comp/middlebar";
import News from "./_comp/news";
import OnlineConsultation from "./_comp/onlineConsultation";
import HomePackages from "./_comp/ourpackage";
import RightHealthcare from "./_comp/rightHealthcare";
import Testimonial from "./_comp/testimonial";
import WhyUs from "./_comp/whyUs";
import InsurancePartners from "./_comp/insurancePartners";
import Faq from "./_comp/faq";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bumrungrad Int. Hospital Referral Office for Bangladeshi Patient</title>
        {/* <meta name="description" content="Your page description here." /> */}
        {/* Add other meta tags like keywords, author, etc. if needed */}
      </Head>
      <main>
        <Landing />
        <Disclaimer />
        <JourneyBetter />
        <MediExpress />
        <BookingModal />
        <ClinicCenters />
        <RightHealthcare />
        <HomePackages />
        <OnlineConsultation />
        <WhyUs />
        <Testimonial/>
        <News />
        <InsurancePartners/>
        <Faq/>
        <HomeContact />
        <div className="fixed bottom-0 md:bottom-2 min-w-full z-50">
          <MiddleBar />
        </div>
      </main>
    </>
  );
}
