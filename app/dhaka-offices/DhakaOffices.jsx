"use client";

import Image from "next/image";
import airimg from "@/public/assets/service_logo/Bumrungrad  Hospital-air_ambulance.png";
import airpickup from "@/public/assets/service_logo/Bumrungrad  Hospital-air_pickup.png";
import airticket from "@/public/assets/service_logo/Bumrungrad  Hospital-air_ticket.png";
import appointment from "@/public/assets/service_logo/Bumrungrad  Hospital-appointment.png";
import hotelReservation from "@/public/assets/service_logo/Bumrungrad  Hospital_visa_processing.png";
import orderMedicine from "@/public/assets/service_logo/Bumrungrad  Hospital_order_medicine.png";
import teleMedicine from "@/public/assets/service_logo/Bumrungrad  Hospital_telemedicine.png";
import medicalRecords from "@/public/assets/service_logo/Bumrungrad  Hospital_medical_records.png";
import moneyTransfer from "@/public/assets/service_logo/bro4.png";
import languageImage from "@/public/assets/service_logo/bro.png";
import accommodation from "@/public/assets/service_logo/bro2.png";
import hospitalAdmission from "@/public/assets/service_logo/bro5.png";
import ContactCardImg from "@/public/assets/Bumrungrad  Hospital_contact_card.png";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/hooks/useAuth";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Images stay in code; localized name/description come from messages (same order).
const SERVICE_IMAGES = [
  appointment, hotelReservation, orderMedicine, medicalRecords, teleMedicine,
  airimg, airticket, airpickup, hospitalAdmission, accommodation, languageImage, moneyTransfer,
];
const SERVICE_PAGE_TO = [
  "/our-services/appointment", "/our-services/visaprocessing", "/our-services/order-medicine",
  "/our-services/medical-record", "/our-services/telemedicine", undefined, undefined, undefined,
  undefined, "http://wa.me/+66948283651", undefined, "http://wa.me/+66948283651",
];

const CONTACT_CARD_MAPS = [
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.05224193445!2d90.3824876761062!3d23.745516388962468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b91b29851709%3A0xc3d50a2ecf8fad9a!2sBumrungrad%20Hospital%20Dhaka%20Office!5e0!3m2!1sen!2sbd!4v1692206329747!5m2!1sen!2sbd",
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29212.303573866055!2d90.3837837!3d23.7638509!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72e25bd9c23%3A0x3d32da1eea1d8b1c!2sBumrungrad%20Hospital%20Bangladesh%20%7C%20Patient%20Support%20Center%20In%20Gulshan%20Dhaka%20%7C%20Book%20Your%20Doctor%20Appointment%20at%20Bumrungrad!5e0!3m2!1sen!2ssg!4v1692561871626!5m2!1sen!2ssg",
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.434392452508!2d90.3928183!3d23.874210400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c52a06df3939%3A0x5865aa1fbf242113!2sBumrungrad%20International%20Hospital%20Uttara%20Office!5e0!3m2!1sen!2ssg!4v1692561953360!5m2!1sen!2ssg",
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d939716.4091297725!2d90.5450213!3d23.0689941!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9b23e4a2043%3A0x4d00aafa2c904ae3!2zQnVtcnVuZ3JhZCBJbnRlcm5hdGlvbmFsIEhvc3BpdGFsIFJlZmVycmFsIE9mZmljZS1DaGF0dGFncmFtIC4vLyDgpqzgpr7gpq7gprDgp4Hgpqjgppfgp43gprDgpqYg4KaH4Kao4KeN4Kaf4Ka-4Kaw4Kao4KeN4Kav4Ka-4Ka24Kao4Ka-4KayIOCmueCmvuCmuOCmquCmvuCmpOCmvuCmsiDgprDgp4fgpqvgpr7gprDgp4fgprIg4KaF4Kar4Ka_4Ka4IOCmmuCmn-CnjeCmn-Cml-CnjeCmsOCmvuCmrg!5e0!3m2!1sen!2ssg!4v1692561993428!5m2!1sen!2ssg",
];
const CONTACT_CARD_PHONES = [
  { phone1: "+8801847284860", phone2: "+8801324418100" },
  { phone1: "+8801977284860", phone2: "+8801847284862" },
  { phone1: "+8801977284861", phone2: "+8801601284300" },
  { phone1: "+8801847284863", phone2: "+8801847284862" },
];

// Directory data (address/phone/email/website/map link/fanpage) kept in code —
// these are factual reference records, not narrative UI copy.
const REFERRAL_OFFICE_DATA = [
  {
    address: "Rupayan Prime Tower, Plot No: 02 (9th Floor), Road No: 07, Green Road, Dhanmondi, Dhaka-1205, Bangladesh",
    phone: "+880 1847 28 4860, +880 1847 28 4863",
    email: [
      { label: "support@bumrungraddiscover.com", href: "mailto:support@bumrungraddiscover.com" },
      { label: "dhanmondi@bumrungraddiscover.com", href: "mailto:dhanmondi@bumrungraddiscover.com" },
    ],
    website: [
      { label: "discoverims.com", href: "https://discoverims.com" },
      { label: "discoverinternationalmedicalservice.com", href: "https://discoverinternationalmedicalservice.com/" },
    ],
    mapLink: "https://www.google.com/maps/place/Bumrungrad+Hospital+Dhaka+Office/@23.7455115,90.3850626,15z/data=!4m6!3m5!1s0x3755b91b29851709:0xc3d50a2ecf8fad9a!8m2!3d23.7455115!4d90.3850626!16s%2Fg%2F11g1xxhlz1?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D",
    fanpage: "https://www.facebook.com/bumrungraddhakaoffice",
    mapLabel: "Bumrungrad Hospital Dhaka Office",
  },
  {
    address: "Alamin Park Panorama (Infront of Banani Block -C Park), Lift-5, House 105, Road 13/A, Block - C, Banani, Dhaka - 1213",
    phone: "+8801847284868, +8801977284862",
    email: [
      { label: "banani@bumrungraddiscover.com", href: "mailto:banani@bumrungraddiscover.com" },
      { label: "support@bumrungraddiscover.com", href: "mailto:support@bumrungraddiscover.com" },
    ],
    website: [
      { label: "discoverims.com", href: "https://discoverims.com" },
      { label: "discoverinternationalmedicalservice.com", href: "https://discoverinternationalmedicalservice.com/" },
    ],
    mapLink: "https://www.google.com/maps/place/Bumrungrad+Hospital+Dhaka+Bangladesh+-+Banani+Branch/@23.7638509,90.3837837,14z/data=!4m6!3m5!1s0x3755c72e25bd9c23:0x3d32da1eea1d8b1c!8m2!3d23.7914367!4d90.4035711!16s%2Fg%2F11lrn54v4s?coh=164777&shorturl=1&entry=tts&g_ep=EgoyMDI0MDkyOS4wIPu8ASoASAFQAw%3D%3D",
    fanpage: "https://www.facebook.com/bumrungraddhakaoffice",
    mapLabel: "Bumrungrad Hospital Dhaka Bangladesh - Banani Branch",
  },
  {
    address: "Oasis Oliveira, Lift-02, House-01, Road-1/A, Sonargaon Janapad Road, Sector-13, Uttara, Dhaka, Bangladesh",
    phone: "+8801977284861, +8801601284300",
    email: [
      { label: "uttara@bumrungraddiscover.com", href: "mailto:uttara@bumrungraddiscover.com" },
      { label: "support@bumrungraddiscover.com", href: "mailto:support@bumrungraddiscover.com" },
    ],
    website: [
      { label: "discoverims.com", href: "https://discoverims.com" },
      { label: "discoverinternationalmedicalservice.com", href: "https://discoverinternationalmedicalservice.com/" },
    ],
    mapLink: "https://www.google.com/maps/place/Bumrungrad+International+Hospital+Uttara+Office/@23.8742122,90.3928182,15z/data=!4m6!3m5!1s0x3755c52a06df3939:0x5865aa1fbf242113!8m2!3d23.8742151!4d90.3928172!16s%2Fg%2F11tgcb0n45?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D",
    fanpage: "https://www.facebook.com/bumrungraddhakaoffice",
    mapLabel: "Bumrungrad International Hospital Uttara Office",
  },
  {
    address: "Daar E Shahidi Building 3rd Floor, (Lift-3), Opposite of Ethnological Museum 69, Agrabad C/A. Chittagong.",
    phone: "+8801973-284836, +8801973-284862",
    email: [
      { label: "ctg@bumrungraddiscover.com", href: "mailto:ctg@bumrungraddiscover.com" },
      { label: "support@bumrungraddiscover.com", href: "mailto:support@bumrungraddiscover.com" },
    ],
    website: [
      { label: "discoverims.com", href: "https://discoverims.com" },
      { label: "discoverinternationalmedicalservice.com", href: "https://discoverinternationalmedicalservice.com/" },
    ],
    mapLink: "https://www.google.com/maps/place/Bumrungrad+International+Hospital+Bangladesh+-+Representative+Office+in+Agrabad+,+Chittagong/@22.3271702,91.8144269,17z/data=!3m1!4b1!4m6!3m5!1s0x30acd9b23e4a2043:0x4d00aafa2c904ae3!8m2!3d22.3271702!4d91.8144269!16s%2Fg%2F11t5t0krzw?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D",
    fanpage: "https://www.facebook.com/bumrungraddhakaoffice",
    mapLabel: "Bumrungrad International Hospital Chittagong",
  },
];

export default function DhakaOffices() {
  const t = useTranslations("dhakaOffices");
  const { auth } = useAuth();
  const router = useRouter();

  const services = t.raw("services").map((s, i) => ({
    ...s,
    img: SERVICE_IMAGES[i],
    pageTo: SERVICE_PAGE_TO[i],
    alt: "Bumrungrad International Hospital",
  }));

  const ContactCards = t.raw("contactCards").map((cc, i) => ({
    ...cc,
    ...CONTACT_CARD_PHONES[i],
    map: CONTACT_CARD_MAPS[i],
  }));

  const referralOffices = t.raw("referralOfficeNames").map((name, i) => ({
    name,
    ...REFERRAL_OFFICE_DATA[i],
  }));

  function handleAppointment() {
    if (auth) {
      router.push("/our-services/appointment");
    } else {
      router.push("/login");
    }
  }
  function handleHealthScreen() {
    if (auth) {
      router.push("/check-up");
    } else {
      router.push("/login");
    }
  }
  return (
    <div className="mx-5 md:container md:mx-auto">
      <div className="py-20 md:py-0 md:h-[60vh] bumrungrand-back relative flex justify-center items-center">
        <div className="absolute top-0 h-full w-full bg-black/60"></div>
        <div className="text-white z-10">
          <h1 className="uppercase md:text-xl text-center font-bold">
            {t("heroHeading")}
          </h1>
          <p className="text-sm md:text-base text-center my-4 md:my-8">
            {t("heroText")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleAppointment}
              className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded"
            >
              {t("doctorAppointment")}
            </button>
            <button
              onClick={handleHealthScreen}
              className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded"
            >
              {t("healthScreening")}
            </button>
            <a
              href="/doctors"
              className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded"
            >
              {t("findDoctor")}
            </a>
            <a
              href="/send-query"
              className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded"
            >
              {t("sendQuery")}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-10">
        <h2 className="text-xl font-semibold">
          {t("journeyHeading")}
        </h2>
        <p className="mt-4">
          {t("journeyText")}
        </p>

        <p className="mt-4">
          <Link
            href="https://discoverinternationalmedicalservice.com"
            className="text-blue underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("dimsLinkText")}
          </Link>{" "}
          {t("dimsP1After")}
        </p>

        <p className="mt-4">
          {t("dimsP2Before")}{" "}
          <Link
            href="https://api.whatsapp.com/send/?phone=%2B66948382910&text&type=phone_number&app_absent=0"
            className="text-blue underline font-semibold"
            target="_blank"
          >
            {t("liveChatLink")}
          </Link>{" "}
          {t("dimsP2After")}
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue">
            {t("referralOfficesHeading")}
          </h2>
          <p className="mt-4">
            {" "}
            {t("referralOfficesIntro")}
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {referralOffices.map((office, index) => (
              <div key={index}>
                <h5 className="font-semibold text-blue">{office.name}</h5>
                <p className="mt-2">{t("addressLabel")} {office.address}</p>
                <p className="mt-2">{t("phoneLabel")} {office.phone}</p>
                <p className="mt-2">
                  {t("emailLabel")}{" "}
                  {office.email.map((mail, i) => (
                    <span key={i}>
                      <Link
                        href={mail.href}
                        className="text-blue-600 underline"
                      >
                        {mail.label}
                      </Link>{" "}
                      {i < office.email.length - 1 && "&"}{" "}
                    </span>
                  ))}
                </p>
                <p className="mt-2">
                  {t("websiteLabel")}{" "}
                  {office.website.map((site, i) => (
                    <span key={i}>
                      <Link
                        href={site.href}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {site.label}
                      </Link>{" "}
                      {i < office.website.length - 1 && "&"}{" "}
                    </span>
                  ))}
                </p>
                <p className="mt-2">
                  {t("mapLabel")}{" "}
                  <Link
                    href={office.mapLink}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {office.mapLabel}
                  </Link>
                </p>
                <p className="mt-2">
                  {t("fanpageLabel")}{" "}
                  <Link
                    href={office.fanpage}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {office.name}
                  </Link>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-4">
            <div>
              <h5 className="text-blue font-semibold mt-8">{t("visaOfficerHeading")}</h5>
              <ul className="mt-4">
                <li>
                  Mr Shahriyar:{" "}
                  <a
                    href="tel:+8801847284864"
                    className="text-blue-600 underline"
                  >
                    +8801847284864
                  </a>
                </li>
                <li>
                  Ms Pushpi:{" "}
                  <a
                    href="tel:+8801977284860"
                    className="text-blue-600 underline"
                  >
                    +8801977284860
                  </a>
                </li>
                <li>
                  Mr Tapos Saha:{" "}
                  <a
                    href="tel:+8801977284862"
                    className="text-blue-600 underline"
                  >
                    +8801977284862
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-blue font-semibold mt-8">{t("reservationHeading")}</h5>
              <ul className="mt-4">
                <li>
                  Mr Abdus Samad:{" "}
                  <a
                    href="tel:+8801847284867"
                    className="text-blue-600 underline"
                  >
                    +8801847284867
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-blue font-semibold mt-8">{t("supportMailHeading")}</h5>
              <p className="mt-4">
                <a
                  href="mailto:support@bumrungraddiscover.com"
                  className="text-blue-600 underline"
                >
                  support@bumrungraddiscover.com
                </a>
              </p>
            </div>

            <div>
              <h5 className="text-blue font-semibold mt-8">{t("websiteHeading")}</h5>
              <p className="mt-4">
                <Link
                  href="https://discoverinternationalmedicalservice.com/"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("linkText")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-20">
        <p className="text-center font-semibold text-xl text-blue">
          {t("servicesHeading")}
        </p>
        <p className="text-center my-5 md:my-10">
          {t("servicesIntro")}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {services.map((s, i) => (
            <div
              key={i}
              className="cursor-pointer flex flex-col gap-4 items-center md:hover:scale-105 shadow md:hover:shadow-lg md:hover:shadow-blue duration-300 ease-linear p-4 rounded"
            >
              <Image height={150} width={100} src={s.img} alt={s.alt} />
              <h5 className="text-xl text-center font-semibold text-blue">
                {s.name}
              </h5>
              <p className="text-center">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-20">
        <p className="font-semibold text-xl text-blue text-center">
          {t("closingHeading")}
        </p>
        <p className="my-5 md:my-10 text-center">
          {t("closingText")}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ContactCards.map((cc, i) => (
            <div
              key={i}
              className="group flex flex-col md:flex-row shadow-xl rounded items-center justify-between gap-8 md:gap-0"
            >
              <div className="p-5 h-full w-full md:w-1/2 relative flex flex-col items-center gap-4">
                <Image
                  height={150}
                  width={150}
                  src={ContactCardImg}
                  alt="Bumrungrad International Hospital"
                  effect="blur"
                  className="h-[150px] w-[150px]"
                />
                <div className="flex flex-col">
                  <h5 className="text-center font-semibold text-xl">
                    {cc.office}
                  </h5>
                  <div className="absolute top-0 left-0 bg-black/90 h-full w-full hidden group-hover:flex flex-col items-center justify-center rounded md:rounded-r-none text-white duration-300 ease-linear">
                    <h5 className="text-center font-semibold ">{cc.office}</h5>
                    <p className="text-center">{cc.building}</p>
                    <p className="text-center">{cc.floor}</p>
                    <p className="text-center">{cc.house}</p>
                    <p className="text-center">{cc.city}</p>
                    <p className="text-center">{cc.phone1}</p>
                    <p className="text-center">{cc.phone2}</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2 md:h-full">
                <iframe
                  src={cc.map}
                  title={cc.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
