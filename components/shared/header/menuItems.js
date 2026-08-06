// `header`/`name` values are next-intl message keys (see messages/en.json, messages/bn.json
// under the "nav" namespace), resolved via useTranslations("nav") in topbar.jsx — not literal
// display text.
export const menuItems = [
  {
    header: 'home',
    link: '/',
  },
  {
    header: 'doctors',
    link: '/doctors',
  },
  {
    header: 'ourServices',
    link: '/our-services',
    // 3-column mega menu per the client redesign spec (doc §1.3, Pillars A/B/C).
    // Items without a dedicated page yet fall back to /our-services (where the
    // existing tile grid can still surface them) rather than a dead link;
    // several get dedicated pages/forms in later phases (see plan phases 2, 6).
    megaColumns: [
      {
        title: 'pillarDirectMedical',
        items: [
          { name: 'doctorAppointment', link: '/our-services/appointment' },
          { name: 'healthScreeningItem', link: '/check-up' },
          { name: 'telemedicine', link: '/our-services/telemedicine' },
          { name: 'medicalConsultancy', link: '/our-services/medical-treatment' },
          { name: 'directAdmission', link: '/our-services/direct-admission' },
        ],
      },
      {
        title: 'pillarTravelLogistics',
        items: [
          { name: 'visaProcessing', link: '/our-services/visaprocessing' },
          { name: 'airTicket', link: '/our-services/air-ticket' },
          { name: 'airportPickDrop', link: '/our-services/airport-transfer' },
          { name: 'hotelBooking', link: '/our-services/accommodation' },
        ],
      },
      {
        title: 'pillarPatientSupport',
        items: [
          { name: 'medicalRecords', link: '/our-services/medical-record' },
          { name: 'orderMedicine', link: '/our-services/order-medicine' },
          { name: 'languageInterpreter', link: '/our-services/language-interpreter' },
          { name: 'fundTransfer', link: '/our-services/fund-transfer' },
          { name: 'emergencySupport', link: '/our-services' },
          { name: 'postTreatmentSupport', link: '/our-services' },
        ],
      },
    ],
  },
  {
    header: 'packages',
    link: '/packages',
  },
  {
    header: 'clinicCenters',
    link: '/clinic-centers',
  },
  {
    header: 'airAmbulance',
    link: '/air-ambulance',
  },
  {
    header: 'blogs',
    link: '/blogs',
  },
  {
    header: 'about',
    childs: [
      {
        name: 'aboutBumrungrad',
        link: '/about-bumrungrad',
      },
      {
        name: 'aboutVisionMission',
        link: '/about-vision-and-misson',
      },
      {
        name: 'aboutFactsheet',
        link: '/about-factsheet',
      },
      {
        name: 'aboutAccreditation',
        link: '/about-accreditation',
      },
      {
        name: 'aboutFoundation',
        link: '/about-foundation',
      },
      // Folded in from the former top-level "Insurance" dropdown.
      {
        name: 'insuranceWeAccept',
        link: '/insurance-we-accept',
      },
      {
        name: 'insuranceGoodVibes',
        link: '/insurance-goodVibes',
      },
      {
        name: 'insurancePackagePromotion',
        link: '/insurance-package-promotion',
      },
      // Folded in from the former top-level "Health Info Workspace" dropdown.
      {
        name: 'healthInfoBlogNews',
        link: '/blogs',
      },
      {
        name: 'healthInfoPatientStories',
        link: '/patient-stories',
      },
      {
        name: 'healthInfoHospitalRepository',
        link: '/hospital-information',
      },
    ],
  },
  {
    header: 'contact',
    link: '/contact-us',
  },
]
