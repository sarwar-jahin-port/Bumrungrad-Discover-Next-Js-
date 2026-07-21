import React from "react";
import { useTranslations } from "next-intl";

const LangugeInterpreter = () => {
    const t = useTranslations("ourServices.languageInterpreter");
    const languages = t.raw("languages");
    const helpDeskServices = t.raw("helpDeskServices");
    return (
        <div className='flex flex-col gap-2.5 max-sm:p-2 px-5 py-8 max-sm:text-[12px] overflow-y-auto'>
            <h5>
                {t("intro")}
            </h5>
            <ul className='grid md:grid-cols-2 list-disc max-sm:text-[12px]  max-sm:grid-cols-2'>
                {languages.map((l, i) => (
                    <li key={i} className='ml-8'>
                        {l}
                    </li>
                ))}
            </ul>
            <p>
                <span className='font-semibold'>{t("culturalHelpdeskLabel")}</span> {t("culturalHelpdeskText")}
            </p>
            <p>
                {" "}
                <span className='font-semibold'>{t("operationTimeLabel")}</span> {t("operationTimeText")}
            </p>
            <p>
                {" "}
                <span className='font-semibold'>{t("locationLabel")}</span> {t("locationText")}
            </p>
            <p>{t("servicesLabel")}</p>
            <ul className='list-disc max-sm:text-[12px] '>
                {helpDeskServices.map((hds, i) => (
                    <li key={i} className='ml-8'>
                        {hds}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LangugeInterpreter;
