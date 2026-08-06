"use client";

import React from "react";
import UnifiedInboundForm from "@/components/shared/UnifiedInboundForm";
import { useTranslations } from "next-intl";

const AirportTransferPage = () => {
    const t = useTranslations("ourServices.airportTransferPage");
    return (
        <div className='mt-5 mb-10 py-5 px-5 md:px-10 md:container md:mx-auto lg:w-1/2 shadow-xl rounded-xl'>
            <h1 className='text-center capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue'>
                {t("heading")}
            </h1>
            <div className='mt-5'>
                <UnifiedInboundForm
                    endpoint='http://127.0.0.1:8000/api/add/air/pickup'
                    concernField='concern'
                />
            </div>
        </div>
    );
};

export default AirportTransferPage;
