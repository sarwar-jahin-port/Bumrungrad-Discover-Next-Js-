"use client";

// Reusable "Unified Logistics & Inbound Support" form per client doc §2.2.
// Deploys, with different presentation content + submit endpoint, across:
// Medical Consultancy, Direct Admission, Visa Processing, Order Medicine,
// Air Ticket Booking, Extended Stay Lodging, and Emergency Desk.
//
// Left: image + YouTube explainer presentation panel.
// Right: Full Name + WhatsApp number — the only two fields the doc specifies.

import React, { useState } from "react";
import { TextField } from "@mui/material";
import Image from "next/image";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";

const UnifiedInboundForm = ({
    image,
    imageAlt = "",
    youtubeUrl,
    endpoint,
    fullNameField = "fullName",
    whatsappField = "whatsapp",
    requireAuth = false,
    onSuccess,
}) => {
    const t = useTranslations("common");
    const tForm = useTranslations("ourServices.unifiedForm");
    const [fullName, setFullName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            const token = requireAuth
                ? localStorage.getItem("Access_Token")
                : null;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    [fullNameField]: fullName,
                    [whatsappField]: whatsapp,
                }),
            });
            const data = await response.json();

            if (data.status === 200) {
                toast.success(
                    t("successToast"),
                    {
                        position: "top-center",
                        style: { borderRadius: "20px" },
                        duration: 5000,
                    },
                );
                setFullName("");
                setWhatsapp("");
                onSuccess?.(data);
            } else {
                const errorMessage =
                    data?.errors && Object.values(data.errors).flat()[0];
                toast.error(errorMessage || t("errorToast"));
            }
        } catch (err) {
            toast.error(t("errorToast"));
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='grid md:grid-cols-2 gap-6 items-start'>
            <div className='flex flex-col gap-3'>
                {image && (
                    <div className='relative w-full h-[180px] md:h-[220px] rounded overflow-hidden'>
                        <Image
                            src={image}
                            alt={imageAlt}
                            fill
                            className='object-cover'
                        />
                    </div>
                )}
                {youtubeUrl && (
                    <div className='relative w-full aspect-video rounded overflow-hidden'>
                        <iframe
                            src={youtubeUrl}
                            title='Explainer video'
                            className='w-full h-full'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <p className='mb-2 font-semibold text-sm'>{t("fullName")}</p>
                    <TextField
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={tForm("fullNamePlaceholder")}
                        fullWidth
                        required
                    />
                </div>
                <div>
                    <p className='mb-2 font-semibold text-sm'>
                        {t("whatsappNumber")}
                    </p>
                    <TextField
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder={tForm("whatsappPlaceholder")}
                        fullWidth
                        required
                    />
                </div>
                <button
                    disabled={loader}
                    type='submit'
                    className={`${
                        loader
                            ? "bg-white text-black border"
                            : "bg-blue text-white border-blue"
                    } btn_primary`}
                >
                    {loader ? (
                        <Loader
                            className='animate-spin'
                            stroke={loader ? "black" : "white"}
                            fill={loader ? "black" : "white"}
                        />
                    ) : (
                        t("submit")
                    )}
                </button>
            </form>
        </div>
    );
};

export default UnifiedInboundForm;
