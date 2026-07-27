"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
];

const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("header");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  const setLocale = (nextLocale) => {
    setOpen(false);
    if (nextLocale === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={containerRef}>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        disabled={isPending}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label={t("language")}
        className='flex items-center gap-1.5 text-sm font-semibold text-blue px-2 py-1 rounded hover:bg-blue/5 duration-200 ease-linear'
      >
        <span className='text-base leading-none'>{current.flag}</span>
        <span>{current.label}</span>
        <ExpandMoreIcon
            sx={{ fontSize: "18px" }}
            className={`transition-transform duration-200 ease-linear ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role='listbox'
          className='absolute right-0 top-full mt-1 min-w-[140px] bg-white rounded shadow-xl border border-blue/10 py-1 z-30'
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type='button'
                role='option'
                aria-selected={locale === l.code}
                onClick={() => setLocale(l.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left duration-200 ease-linear ${
                  locale === l.code
                    ? "text-blue font-semibold bg-blue/5"
                    : "text-blue/70 hover:bg-blue/5 hover:text-blue"
                }`}
              >
                <span className='text-base leading-none'>{l.flag}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
