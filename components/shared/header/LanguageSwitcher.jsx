"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALES = [
  { code: "en", label: "EN" },
  { code: "bn", label: "BN" },
];

const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("header");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setLocale = (nextLocale) => {
    if (nextLocale === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      className='flex items-center gap-1 text-sm font-semibold text-blue'
      role='group'
      aria-label={t("language")}
    >
      {LOCALES.map((l, i) => (
        <div key={l.code} className='flex items-center'>
          {i > 0 && <span className='mx-1 text-blue/40'>|</span>}
          <button
            type='button'
            onClick={() => setLocale(l.code)}
            disabled={isPending}
            aria-pressed={locale === l.code}
            className={`px-1 rounded duration-200 ease-linear ${
              locale === l.code
                ? "text-blue underline underline-offset-4"
                : "text-blue/60 hover:text-blue"
            }`}
          >
            {l.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
