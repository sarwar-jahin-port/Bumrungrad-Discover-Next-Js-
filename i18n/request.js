import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const SUPPORTED_LOCALES = ["en", "bn"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = SUPPORTED_LOCALES.includes(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
