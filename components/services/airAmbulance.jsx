"use client";

import React, { useState } from "react";

import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import Loader from "../ui/loader";
import { useTranslations } from "next-intl";

const AirAmbulanceForm = () => {
    const t = useTranslations("airAmbulance.form");
    const [loader, setLoader] = useState();

    const [date, setDate] = useState("");
    const [passport, setPassport] = useState("");
    const [caseSummary, setCaseSummary] = useState("");
    const [briflyDiscusion, setbriflyDiscusion] = useState("");

    const addPatient = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData();

        const fields = {
            entry_date: date,
            passport_copy: passport,
            summary: caseSummary,
            description: briflyDiscusion,
        };

        Object.keys(fields).forEach((key) => formData.append(key, fields[key]));

        try {
            setLoader(true);
            const response = await fetch(
                "https://api.discoverinternationalmedicalservice.com/api/add/air/ambulance",
                {
                    method: "POST",
                    body: formData,
                },
            );
            setLoader(false);

            const data = await response.json();

            if (data.status == 200) {
                toast.success(t("successToast"), {
                    position: "top-center",
                    style: { borderRadius: "20px" },
                    duration: 5000,
                });
                window.location.reload();
                form.reset();
            } else {
                toast.error(t("errorToast"));
            }
        } catch (error) {
            setLoader(false);
            console.error(error);
        }
    };
    return (
        <div>
            <form
                onSubmit={addPatient}
                className='mt-3 mb-2 md:w-full max-w-screen-lg sm:w-96'
            >
                <div className='mb-2 flex flex-col gap-6'>
                    <div className=''>
                        <p className='mb-2 font-semibold text-sm'>{t("enterDate")}</p>
                        <TextField
                            type='date'
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div className='mt-1'>
                        <p className='mb-1 font-semibold text-sm'>
                            {t("attachPassport")}
                        </p>
                        <TextField
                            type='file'
                            onChange={(e) => setPassport(e.target.files[0])}
                            fullWidth
                            required
                        />
                    </div>
                    <div className='mt-1'>
                        <p className='mb-2 font-semibold text-sm'>
                            {t("uploadCaseSummary")}
                        </p>
                        <TextField
                            multiline
                            onChange={(e) => setCaseSummary(e.target.value)}
                            rows={2}
                            fullWidth
                        />
                    </div>
                    <div className='mt-1'>
                        <p className='mb-2 font-semibold text-sm'>
                            {t("writeInBrief")}
                        </p>
                        <TextField
                            multiline
                            onChange={(e) => setbriflyDiscusion(e.target.value)}
                            rows={2}
                            fullWidth
                        />
                    </div>
                </div>
                <button
                    disabled={
                        loader ||
                        !date ||
                        !passport ||
                        !caseSummary ||
                        !briflyDiscusion
                    }
                    type='submit'
                    className={`btn_primary ${
                        loader ||
                        !date ||
                        !passport ||
                        !caseSummary ||
                        !briflyDiscusion
                            ? "bg-white text-black border"
                            : "bg-blue text-white"
                    }`}
                >
                    {loader ? (
                        <Loader
                            className='animate-spin'
                            stroke='black'
                            fill='black'
                        />
                    ) : (
                        t("submit")
                    )}
                </button>
            </form>
        </div>
    );
};

export default AirAmbulanceForm;
