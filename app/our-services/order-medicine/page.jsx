"use client";

import React from "react";
import medicineImg from "@/public/assets/service_logo/Bumrungrad  Hospital_order_medicine.png";
import whatsapp from "@/public/assets/Bumrungrad  Hospital_whatsapp.png";
import Image from "next/image";
import UnifiedInboundForm from "@/components/shared/UnifiedInboundForm";
import { useTranslations } from "next-intl";

const OrderMedicine = () => {
    const t = useTranslations("ourServices.orderMedicine");
    return (
        <div className='mt-5 mb-10 py-5 px-5 md:px-10 md:container md:mx-auto lg:w-2/3 shadow-xl rounded-xl'>
            <h1 className='text-center capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue'>
                {t("heading")}
            </h1>
            <div className='mt-5'>
                <UnifiedInboundForm
                    image={medicineImg}
                    imageAlt='Order Medicine'
                    endpoint='http://127.0.0.1:8000/api/add/order/medicine'
                    fullNameField='name'
                    whatsappField='phoneNumber'
                    requireAuth
                />
            </div>
            <div className='mt-6'>
                <p className='text-blue font-semibold'>
                    {t("orText")}
                </p>
                <a
                    href='http://wa.me/+8801847284860'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='rounded-xl flex gap-4 my-2 items-center p-2 hover:shadow-lg duration-300 ease-linear'
                >
                    <Image
                        height={40}
                        width={40}
                        src={whatsapp}
                        alt='Bumrungrad International Hospital'
                        className='h-[40px]'
                    />
                    <span className='text-blue font-semibold'>
                        {t("sendWhatsapp")}
                    </span>
                </a>
            </div>
        </div>
    );
};

export default OrderMedicine;
