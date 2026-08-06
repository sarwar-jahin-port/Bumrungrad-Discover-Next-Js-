import Head from "next/head";
import ClinicCenters from "./_comp/clinicalCenter";
import Disclaimer from "./_comp/disclaimer";
import Landing from "./_comp/landing";
import MediExpress from "./_comp/mediExpress";
import MiddleBar from "./_comp/middlebar";
import News from "./_comp/news";
import RightHealthcare from "./_comp/rightHealthcare";
import Testimonial from "./_comp/testimonial";
import WhyUs from "./_comp/whyUs";
import InsurancePartners from "./_comp/insurancePartners";
import Faq from "./_comp/faq";
import Packages from "@/components/packages/packages";
import BookingModal from "@/components/services/main/bookingModal";
import SpecificOffer from "./_comp/specificOffer";
import BumrungradAccrediation from "./_comp/bumrungradAccrediation";
import PerformanceMetrics from "./_comp/performanceMetrics";
import MasterAppointmentForm from "./_comp/masterAppointmentForm";

export const metadata = {
    name: "google-site-verification",
    content: "PU4nfwAVdJydAS9wNWWC49A3jXjM5wUP1hYxciG43hQ",
};

export default function Home() {
    return (
        <>
            <Head>
                <meta
                    name='google-site-verification'
                    content='PU4nfwAVdJydAS9wNWWC49A3jXjM5wUP1hYxciG43hQ'
                />
                <title>
                    Bumrungrad Int. Hospital Referral Office for Bangladeshi
                    Patient
                </title>
            </Head>
            <main>
                <Landing />
                {/* <Disclaimer /> */}
                <MediExpress />
                <BookingModal />
                <ClinicCenters />
                <SpecificOffer />
                <RightHealthcare />
                <Packages />
                <WhyUs />
                <BumrungradAccrediation />
                <PerformanceMetrics />
                <Testimonial />
                <MasterAppointmentForm />
                <News />
                <InsurancePartners />
                <Faq />
                <div className='fixed bottom-0 md:bottom-2 min-w-full z-50'>
                    <MiddleBar />
                </div>
            </main>
        </>
    );
}
