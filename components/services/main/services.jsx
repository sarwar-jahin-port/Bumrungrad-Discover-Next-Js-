"use client";

import airimg from "@/public/assets/service_logo/Bumrungrad  Hospital-air_ambulance.png";
import airpickup from "@/public/assets/service_logo/Bumrungrad  Hospital-air_pickup.png";
import airticket from "@/public/assets/service_logo/Bumrungrad  Hospital-air_ticket.png";
import appointment from "@/public/assets/service_logo/Bumrungrad  Hospital-appointment.png";
import hotelReservation from "@/public/assets/service_logo/Bumrungrad  Hospital_visa_processing.png";
import orderMedicine from "@/public/assets/service_logo/Bumrungrad  Hospital_order_medicine.png";
import teleMedicine from "@/public/assets/service_logo/Bumrungrad  Hospital_telemedicine.png";
import medicalRecords from "@/public/assets/service_logo/Bumrungrad  Hospital_medical_records.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/hooks/useAuth";
import AirPickup from "../airPickup";
import moneyTransfer from "@/public/assets/service_logo/bro4.png";
import languageImage from "@/public/assets/service_logo/bro.png";
import accommodation from "@/public/assets/service_logo/bro2.png";
import hospitalAdmission from "@/public/assets/service_logo/bro5.png";
import UnifiedInboundForm from "@/components/shared/UnifiedInboundForm";
import LangugeInterpreter from "../languge";
import BoltIcon from "@mui/icons-material/Bolt";
import ArticleIcon from "@mui/icons-material/Article";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Tells the user, before they click, what happens next — some tiles open a
// quick popup form, some go to a full page, and a couple hand off to
// WhatsApp entirely. Without this, all tiles look identical and the outcome
// is unpredictable.
const INTERACTION_BADGES = {
  popup: {
    label: "Quick Request",
    icon: BoltIcon,
    className: "bg-blue/10 text-blue",
  },
  page: {
    label: "Full Form",
    icon: ArticleIcon,
    className: "bg-ash/20 text-black/70",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: WhatsAppIcon,
    className: "bg-green/10 text-green",
  },
};

const InteractionBadge = ({ type }) => {
  const badge = INTERACTION_BADGES[type];
  if (!badge) return null;
  const Icon = badge.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
    >
      <Icon sx={{ fontSize: "14px" }} />
      {badge.label}
    </span>
  );
};

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
            <InteractionBadge type={s.interactionType} />
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
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "Easily book your Appointment with top doctors at Bumrungrad International Hospital, Thailand. We're here to make sure you get the best care quickly and without any hassle.",
  },
  {
    name: "Health Screening",
    // TODO: placeholder icon (reused medical records image) — swap for a
    // dedicated Health Screening asset once one is provided.
    img: medicalRecords,
    pageTo: "/check-up",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "Comprehensive diagnostic and preventive health check-up packages, tailored to your needs and reviewed by our specialist team.",
  },
  {
    name: "Thailand Visa Processing",
    img: hotelReservation,
    pageTo: "/our-services/visaprocessing",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "We’re make getting your Thailand visa simple and stress-free. From figuring out what you need to managing the paperwork, our team has you covered. Let us handle the details so you can get excited about your trip!",
  },
  {
    id: 3,
    name: "Order Medicine",
    img: orderMedicine,
    pageTo: "/our-services/order-medicine",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "Enjoy a simple and efficient way to order your medicine from Thailand. Our service manages the details for you, making sure your medication arrives as expected.",
  },
  {
    name: "Medical Records",
    img: medicalRecords,
    pageTo: "/our-services/medical-record",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "We want to support you every step of the way. That’s why we offer a clear and easy-to-understand treatment plan along with a detailed cost estimate for critical care. Our friendly approach ensures you have all the information you need, so you can focus on your health without any added stress.",
  },
  {
    name: "Telemedicine",
    img: teleMedicine,
    pageTo: "/our-services/telemedicine",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "Experience expert medical consultations from Bumrungrad Hospital through our telemedicine service. We make connecting with top doctors easy and accessible from home.",
  },
  {
    name: "Medical Consultancy",
    // TODO: placeholder icon (reused telemedicine image) — swap for a
    // dedicated Medical Consultancy asset once one is provided.
    img: teleMedicine,
    form: (
      <UnifiedInboundForm
        image={teleMedicine}
        imageAlt="Medical Consultancy"
        endpoint="http://127.0.0.1:8000/api/add/medical-consultancy"
      />
    ),
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "Specialized evaluation support from our clinical team to help guide your treatment options before you commit to a plan.",
  },
  {
    id: 2,
    name: "Air Ambulance Service",
    img: airimg,
    pageTo: "/air-ambulance",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
    description:
      "We’re here to help in emergencies with fast and reliable air ambulance service. Our experienced team ensures you’re transported safely and comfortably to top hospitals.",
  },
  {
    id: 7,
    name: "Air Ticket",
    img: airticket,
    form: (
      <UnifiedInboundForm
        image={airticket}
        imageAlt="Air Ticket"
        endpoint="http://127.0.0.1:8000/api/add/air/ticket"
      />
    ),
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "Book your Thailand air ticket booking for treatment effortlessly with us. We offer daily options, competitive pricing, and seamless service, ensuring a smooth, professional, and stress-free experience.",
  },
  {
    id: 8,
    name: "Airport Transfer Service",
    img: airpickup,
    form: <AirPickup />,
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "We’re here to make your airport journey as smooth as possible. Our team will handle pick-up and drop-off, so you can relax and enjoy a comfortable ride to your accommodation.",
  },
  {
    name: "Admission On Arrival",
    img: hospitalAdmission,
    form: (
      <UnifiedInboundForm
        image={hospitalAdmission}
        imageAlt="Admission On Arrival"
        endpoint="http://127.0.0.1:8000/api/add/admission"
      />
    ),
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "We’re make your arrival as smooth and stress-free as possible. From quick online pre-registration to personal help from our team, we’re committed to making sure you settle in comfortably and start your care without any hassle.",
  },
  {
    name: "Thai Local Accommodation",
    img: accommodation,
    form: (
      <UnifiedInboundForm
        image={accommodation}
        imageAlt="Thai Local Accommodation"
        endpoint="http://127.0.0.1:8000/api/add/lodging-booking"
      />
    ),
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "Extended stay hotel and apartment booking near your treatment center. Tell us your dates and we'll arrange comfortable lodging for you and your companions.",
  },
  {
    name: "Language Interpreter",
    img: languageImage,
    form: <LangugeInterpreter />,
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "Our language interpreters are here to make your conversations seamless and stress-free. We ensure accurate and easy communication every time.",
  },
  {
    name: "Emergency Desk",
    // TODO: placeholder icon (reused air ambulance image) — swap for a
    // dedicated Emergency Desk asset once one is provided.
    img: airimg,
    form: (
      <UnifiedInboundForm
        image={airimg}
        imageAlt="Emergency Desk"
        endpoint="http://127.0.0.1:8000/api/add/emergency-desk"
      />
    ),
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
    description:
      "24/7 emergency support portal. Reach our on-call team immediately for urgent medical coordination and guidance.",
  },
  {
    name: "Transfer Money for Treatment",
    img: moneyTransfer,
    pageTo: "http://wa.me/+66948283651",
    interactionType: "whatsapp",
    alt: "Bumrungrad International Hospital",
    description:
      "We simplify transferring funds for your medical treatment. Our process ensures your money reaches its destination quickly and securely, so you can focus on your care.",
  },
];
