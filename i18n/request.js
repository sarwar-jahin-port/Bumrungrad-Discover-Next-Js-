import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "bn"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Messages are split per-namespace under messages/<locale>/*.json for
// maintainability. Add a namespace here once and it becomes available to
// useTranslations("<namespace>") everywhere.
const NAMESPACES = ["nav", "header", "home", "footer", "common", "ourServices", "blogs", "insurance", "clinicCenters", "checkUp", "packagesPages", "doctors", "airAmbulance", "healthInfo", "aboutBumrungrad", "aboutVisionMission", "aboutFoundation", "aboutFactsheet", "aboutAccreditation", "contactUs", "auth", "dhakaOffices", "sendQuery", "termsConditions", "privacyPolicy", "myProfile", "bookAppointmentModal", "sidebar"];

async function loadMessages(locale) {
  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => [
      ns,
      (await import(`../messages/${locale}/${ns}.json`)).default,
    ])
  );
  return Object.fromEntries(entries);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = SUPPORTED_LOCALES.includes(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
