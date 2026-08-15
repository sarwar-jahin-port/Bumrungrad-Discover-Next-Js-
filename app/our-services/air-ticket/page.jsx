"use client";

import React from "react";
import UnifiedInboundForm from "@/components/shared/UnifiedInboundForm";
import { useTranslations } from "next-intl";

const AirTicketPage = () => {
    const t = useTranslations("ourServices.airTicketPage");
    return (
        <div className='mt-5 mb-10 py-5 px-5 md:px-10 md:container md:mx-auto lg:w-1/2 shadow-xl rounded-xl'>
            <h1 className='text-center capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue'>
                {t("heading")}
            </h1>
            <div className='mt-5'>
                <UnifiedInboundForm
                    endpoint='https://api.discoverinternationalmedicalservice.com/api/add/air/ticket'
                    concernField='concern'
                />
            </div>
        </div>
    );
};

export default AirTicketPage;
