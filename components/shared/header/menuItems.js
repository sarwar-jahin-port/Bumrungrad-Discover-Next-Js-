// `header`/`name` values are next-intl message keys (see messages/en.json, messages/bn.json
// under the "nav" namespace), resolved via useTranslations("nav") in topbar.jsx — not literal
// display text.
export const menuItems = [
  {
    header: 'home',
    link: '/',
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
          { name: 'medicalConsultancy', link: '/our-services' },
          { name: 'directAdmission', link: '/our-services' },
        ],
      },
      {
        title: 'pillarTravelLogistics',
        items: [
          { name: 'visaProcessing', link: '/our-services/visaprocessing' },
          { name: 'airTicket', link: '/our-services' },
          { name: 'airportPickDrop', link: '/our-services' },
          { name: 'hotelBooking', link: '/our-services' },
        ],
      },
      {
        title: 'pillarPatientSupport',
        items: [
          { name: 'medicalRecords', link: '/our-services/medical-record' },
          { name: 'orderMedicine', link: '/our-services/order-medicine' },
          { name: 'languageInterpreter', link: '/our-services' },
          { name: 'fundTransfer', link: 'http://wa.me/+66948283651' },
          { name: 'emergencySupport', link: '/our-services' },
          { name: 'postTreatmentSupport', link: '/our-services' },
        ],
      },
    ],
  },
  {
    header: 'blogs',
    link: '/blogs',
  },
  {
    header: 'insurance',
    childs: [
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
    ],
  },
  {
    header: 'clinicCenters',
    link: '/clinic-centers',
  },
  {
    header: 'healthScreening',
    link: '/check-up',
  },
  {
    header: 'packages',
    link: '/packages',
  },
  // Added per client doc §1.2 — previously missing from the nav entirely.
  {
    header: 'doctors',
    link: '/doctors',
  },
  // Added per client doc §1.2 (doc §3.4 for the dedicated landing page).
  {
    header: 'airAmbulance',
    link: '/air-ambulance',
  },
  // Added per client doc §1.2. Only "Blog & News" is wired today — Patient
  // Stories and Hospital Information Repository (doc §3.5) don't have pages
  // yet and will be added here once that phase ships, so this dropdown
  // doesn't contain dead links in the meantime.
  {
    header: 'healthInfo',
    childs: [
      {
        name: 'healthInfoBlogNews',
        link: '/blogs',
      },
    ],
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
    ],
  },
  {
    header: 'contact',
    link: '/contact-us',
  },
]
