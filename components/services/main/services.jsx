"use client";

import airimg from "@/public/assets/service_logo/Bumrungrad  Hospital-air_ambulance.png";
import airpickup from "@/public/assets/service_logo/Bumrungrad  Hospital-air_pickup.png";
import airticket from "@/public/assets/service_logo/Bumrungrad  Hospital-air_ticket.png";
import appointment from "@/public/assets/service_logo/Bumrungrad  Hospital-appointment.png";
import hotelReservation from "@/public/assets/service_logo/Bumrungrad  Hospital_visa_processing.png";
import orderMedicine from "@/public/assets/service_logo/Bumrungrad  Hospital_order_medicine.png";
import teleMedicine from "@/public/assets/service_logo/Bumrungrad  Hospital_telemedicine.png";
import medicalRecords from "@/public/assets/service_logo/Bumrungrad  Hospital_medical_records.png";
import AirAmbulanceForm from "../airAmbulance";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/hooks/useAuth";
import AirtTcket from "../airtTcket";
import AirPickup from "../airPickup";
import moneyTransfer from "@/public/assets/service_logo/bro4.png";
import languageImage from "@/public/assets/service_logo/bro.png";
import accommodation from "@/public/assets/service_logo/bro2.png";
import hospitalAdmission from "@/public/assets/service_logo/bro5.png";
import Arrival from "../arrival";
import LangugeInterpreter from "../languge";

export default function Services({ handaleOpen, getData }) {
  const { auth } = useAuth();
  const path = usePathname();
  const router = useRouter();

  const handleClick = (s, i, id) => {
    // If the 'pageTo' property exists, navigate to that page
    if (s?.pageTo) {
      return router.push(s.pageTo);
    }

    // Handle specific case for "Language Interpreter"
    if (s?.name === "Language Interpreter") {
      handaleOpen(id);
      getData(s);
      return;
    }

    // If the user is not authenticated, redirect to login
    if (!auth) {
      return router.push("/login");
    }

    // Default case: handle opening and data fetching
    handaleOpen(id);
    getData(s);
  };

  return (
    <div className="p-5 md:p-10 my-10 md:my-20 md:container md:mx-auto">
      {path == "/our-services" ? (
        <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue">
          Our Services
        </h2>
      ) : (
        <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue text-center">
          Our Complete Services for Patients at Bumrungrad International
          Hospital
        </h2>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5 md:mt-10">
        {services.map((s, i, id) => (
          <button
            key={i}
            onClick={() => handleClick(s, i, id)}
            className="cursor-pointer flex flex-col gap-4 items-center md:hover:scale-105 shadow md:hover:shadow-lg md:hover:shadow-blue duration-300 ease-linear p-4 rounded"
          >
            <Image height={150} width={100} src={s.img} alt={s.alt} />
            <h5 className="text-xl text-center font-semibold text-blue">
              {s.name}
            </h5>
            <p className="text-center">{s.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    name: "Schedule Doctor Appointment",
    img: appointment,
    pageTo: "/our-services/appointment",
    alt: "Bumrungrad International Hospital",
    description:
      "Easily book your Appointment with top doctors at Bumrungrad International Hospital, Thailand. We're here to make sure you get the best care quickly and without any hassle.",
  },
  {
    name: "Thailand Visa Processing",
    img: hotelReservation,
    pageTo: "/our-services/visaprocessing",
    alt: "Bumrungrad International Hospital",
    description:
      "We make getting your Thailand visa simple and stress-free. From understanding the requirements to managing the paperwork, our team has you covered. Let us handle the details so you can focus on your trip.",
  },
  {
    id: 3,
    name: "Order Medicine",
    img: orderMedicine,
    pageTo: "/our-services/order-medicine",
    alt: "Bumrungrad International Hospital",
    description:
      "Enjoy a simple and efficient way to order your medication from Thailand. Our service takes care of all the details to ensure your medicine arrives as expected.",
  },
  {
    name: "Medical Records",
    img: medicalRecords,
    pageTo: "/our-services/medical-record",
    alt: "Bumrungrad International Hospital",
    description:
      "We support you every step of the way by offering a clear, easy-to-understand treatment plan along with a detailed cost estimate for critical care. Our friendly approach ensures you have all the information you need to focus on your health—without added stress.",
  },
  {
    name: "Telemedicine",
    img: teleMedicine,
    pageTo: "/our-services/telemedicine",
    alt: "Bumrungrad International Hospital",
    description:
      "Access expert medical consultations from Bumrungrad Hospital through our telemedicine service. We make it easy and convenient to connect with top doctors from the comfort of your home.",
  },
  {
    id: 2,
    name: "Air Ambulance Service",
    img: airimg,
    form: <AirAmbulanceForm />,
    alt: "Bumrungrad International Hospital",
    description:
      "We’re here to assist in emergencies with fast and reliable air ambulance service. Our experienced team ensures safe and comfortable transportation to leading hospitals.",
  },
  {
    id: 7,
    name: "Air Ticket",
    img: airticket,
    form: <AirtTcket />,
    alt: "Bumrungrad International Hospital",
    description:
      "Effortlessly book your flight to Thailand for medical treatment. We offer daily options, competitive pricing, and seamless service for a smooth and stress-free experience.",
  },
  {
    id: 8,
    name: "Airport Transfer Service",
    img: airpickup,
    form: <AirPickup />,
    alt: "Bumrungrad International Hospital",
    description:
      "We make your airport journey smooth and comfortable. Our team will handle pick-up and dropoff, so you can relax on your way to or from the hospital.",
  },
  {
    name: "Admission On Arrival",
    img: hospitalAdmission,
    form: <Arrival />,
    alt: "Bumrungrad International Hospital",
    description:
      "We make your arrival smooth and stress-free. With quick online pre-registration and personal support from our team, we ensure you settle in comfortably and begin your care without delay.",
  },
  {
    name: "Thai Local Accommodation",
    img: accommodation,
    pageTo: "http://wa.me/+66948382910",
    alt: "Bumrungrad International Hospital",
    description:
      "We provide convenient airport pick-up and drop-off, ensuring a relaxed and stress-free journeyfrom the airport to your Thai accommodation.",
  },
  {
    name: "Language Interpreter",
    img: languageImage,
    form: <LangugeInterpreter />,
    alt: "Bumrungrad International Hospital",
    description:
      "Our interpreters ensure seamless and stress-free communication. We support accurate, easy conversations in your language, helping you feel confident throughout your care.",
  },
  {
    name: "Transfer Money for Treatment",
    img: moneyTransfer,
    pageTo: "http://wa.me/+66948382910",
    alt: "Bumrungrad International Hospital",
    description:
      "We simplify international fund transfers for your medical care. Our secure and efficient process ensures your money reaches the hospital quickly, so you can focus on your recovery.",
  },
];
