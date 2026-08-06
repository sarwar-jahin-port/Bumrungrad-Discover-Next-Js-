"use client";

import React, { useState } from "react";
import { Divider, TextField } from "@mui/material";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const VisaProcessing = () => {
    const t = useTranslations("common");
    const tPage = useTranslations("ourServices.visaProcessing");
    const navigate = useRouter();
    const [loader, setLoader] = useState(false);

    const [fullName, setFullName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [specificConcern, setSpecificConcern] = useState("");
    const [passport, setPassport] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("whatsapp", whatsapp);
        formData.append("specificConcern", specificConcern);
        formData.append("passport", passport);

        setLoader(true);
        try {
            const token = localStorage.getItem("Access_Token");
            const response = await fetch(
                "http://127.0.0.1:8000/api/add/visa/precessing",
                {
                    method: "POST",
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: formData,
                },
            );

            const jsonresponse = await response.json();
            setLoader(false);

            if (jsonresponse.status === 200) {
                toast.success(
                    t("successToast"),
                    {
                        position: "top-center",
                        style: { borderRadius: "20px" },
                        duration: 5000,
                    },
                );
                form.reset();
                navigate.push("/");
            } else {
                const errorMessage =
                    jsonresponse?.errors &&
                    Object.values(jsonresponse.errors).flat()[0];
                toast.error(errorMessage || t("errorToast"));
            }
        } catch (err) {
            setLoader(false);
            toast.error(t("errorToast"));
        }
    };

    return (
        <section className='md:container lg:w-1/2 md:mx-auto md:my-20 shadow rounded-xl'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-blue my-5 text-center'>
                {tPage("heading")}
            </h1>
            <form onSubmit={handleSubmit} className='px-5 md:px-10 lg:px-16 pb-24'>
                <Divider className='my-2.5' />
                <section className='grid md:grid-cols-2 gap-2.5'>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>{tPage("fullName")}</p>
                        <TextField
                            type='text'
                            value={fullName}
                            placeholder={tPage("fullNamePlaceholder")}
                            onChange={(e) => setFullName(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>
                            {tPage("whatsappNumber")}
                        </p>
                        <TextField
                            placeholder={tPage("whatsappPlaceholder")}
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <p className='mb-2 font-semibold text-sm'>
                            {tPage("narrativeConcern")}
                        </p>
                        <TextField
                            placeholder={tPage("concernPlaceholder")}
                            value={specificConcern}
                            onChange={(e) => setSpecificConcern(e.target.value)}
                            fullWidth
                            required
                            multiline
                            minRows={4}
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <p className='mb-2 font-semibold text-sm'>
                            {tPage("passport")}
                        </p>
                        <TextField
                            type='file'
                            onChange={(e) => setPassport(e.target.files[0])}
                            fullWidth
                            required
                        />
                    </div>
                </section>
                <button
                    disabled={loader}
                    type='submit'
                    className={`mt-6 ${
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
        </section>
    );
};

export default VisaProcessing;
