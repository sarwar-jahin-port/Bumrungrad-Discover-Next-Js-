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
import { useTranslations } from "next-intl";

// Tells the user, before they click, what happens next — some tiles open a
// quick popup form, some go to a full page, and a couple hand off to
// WhatsApp entirely. Without this, all tiles look identical and the outcome
// is unpredictable. Labels come from messages (home.services.badge*).
const INTERACTION_BADGES = {
  popup: {
    labelKey: "badgePopup",
    icon: BoltIcon,
    className: "bg-blue/10 text-blue",
  },
  page: {
    labelKey: "badgePage",
    icon: ArticleIcon,
    className: "bg-ash/20 text-black/70",
  },
  whatsapp: {
    labelKey: "badgeWhatsapp",
    icon: WhatsAppIcon,
    className: "bg-green/10 text-green",
  },
};

const InteractionBadge = ({ type, t }) => {
  const badge = INTERACTION_BADGES[type];
  if (!badge) return null;
  const Icon = badge.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
    >
      <Icon sx={{ fontSize: "14px" }} />
      {t(badge.labelKey)}
    </span>
  );
};

export default function Services({ handaleOpen, getData }) {
  const t = useTranslations("home.services");
  const path = usePathname();
  const router = useRouter();

  const handleClick = (s, i, id) => {
    // If the 'pageTo' property exists, navigate to that page
    if (s?.pageTo) {
      return router.push(s.pageTo);
    }

    // Handle specific case for "Language Interpreter"
    if (s?.key === "languageInterpreter") {
      handaleOpen(id);
      getData(s);
      return;
    }

    // Default case: handle opening and data fetching
    handaleOpen(id);
    getData(s);
  };

  // name/description are localized here; the rest (icon, routing, form) stays static.
  const services = SERVICES.map((s) => ({
    ...s,
    name: t(`items.${s.key}.name`),
    description: t(`items.${s.key}.description`),
  }));

  return (
    <div className="p-5 md:p-10 my-10 md:my-20 md:container md:mx-auto">
      {path == "/our-services" ? (
        <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue">
          {t("headingPage")}
        </h2>
      ) : (
        <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue text-center">
          {t("headingDefault")}
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
            <InteractionBadge type={s.interactionType} t={t} />
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

// `key` maps to messages (home.services.items.<key>); name/description are
// resolved at render time. `alt` is decorative and shared across all tiles.
const SERVICES = [
  {
    key: "appointment",
    img: appointment,
    pageTo: "/our-services/appointment",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "healthScreening",
    // TODO: placeholder icon (reused medical records image) — swap for a
    // dedicated Health Screening asset once one is provided.
    img: medicalRecords,
    pageTo: "/check-up",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "visa",
    img: hotelReservation,
    pageTo: "/our-services/visaprocessing",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "orderMedicine",
    id: 3,
    img: orderMedicine,
    pageTo: "/our-services/order-medicine",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "medicalRecords",
    img: medicalRecords,
    pageTo: "/our-services/medical-record",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "telemedicine",
    img: teleMedicine,
    pageTo: "/our-services/telemedicine",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "medicalConsultancy",
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
  },
  {
    key: "airAmbulance",
    id: 2,
    img: airimg,
    pageTo: "/air-ambulance",
    interactionType: "page",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "airTicket",
    id: 7,
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
  },
  {
    key: "airportTransfer",
    id: 8,
    img: airpickup,
    form: <AirPickup />,
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "admission",
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
  },
  {
    key: "accommodation",
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
  },
  {
    key: "languageInterpreter",
    img: languageImage,
    form: <LangugeInterpreter />,
    interactionType: "popup",
    alt: "Bumrungrad International Hospital",
  },
  {
    key: "emergencyDesk",
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
  },
  {
    key: "moneyTransfer",
    img: moneyTransfer,
    pageTo: "http://wa.me/+66948283651",
    interactionType: "whatsapp",
    alt: "Bumrungrad International Hospital",
  },
];
