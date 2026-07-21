"use client";

import React, { useState } from "react";
// import emailjs from '@emailjs/browser'
import contactAnim from "@/public/assets/anim/contact.json";
import Lottie from "lottie-react";
import { TextField } from "@mui/material";
import { sendEmails } from "@/helpers/mail/sendMail";
import toast from "react-hot-toast";
import { admin_mails } from "@/constant";
import { userMailBody } from "@/helpers/mail/mailbody";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";


export default function ContactForm() {
    const t = useTranslations("contactUs.form");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });


    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await sendEmails(
              admin_mails,
                `Contact Us - ${formData.email}`,
                userMailBody(formData, "Contact Us")
            );
            const sendClientMail = await sendEmails(
                formData.email,
                `Contact Us - ${formData.name}`,
                userMailBody(formData, "Contact Us")
            )

            setLoading(false);
            if (response.success == true && sendClientMail.success == true) {
                toast.success(t("successToast"), {
                    position: "top-center",
                    style: { borderRadius: "20px" },
                    duration: 5000,
                  });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
            }
            if (response.success == false) {
                toast.error(t("errorToast"), {
                    position: "top-center",
                    style: { color: "red", padding: "16px" },
                    duration: 3000,
                    icon: "😱😱",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1 className='capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue'>
                {t("heading")}
            </h1>
            <div className='my-10 md:flex gap-8 items-center'>
               
                <form
                    onSubmit={sendEmail}
                    className='flex flex-col gap-4 md:w-1/2 shadow p-5 rounded'
                >
                    <TextField
                        label={t("enterName")}
                        variant='outlined'
                        name='user_name'
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    <TextField
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        label={t("enterEmail")}
                        variant='outlined'
                        name='user_email'
                        required
                    />
                    <TextField
                        type='tel'
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        label={t("enterPhone")}
                        variant='outlined'
                        name='user_phone'
                        required
                    />
                    <TextField
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                message: e.target.value,
                            })
                        }
                        label={t("enterMessage")}
                        variant='outlined'
                        multiline
                        required
                        name='message'
                        rows={5}
                    />
                    <button
                    disabled={loading}
                        className='flex items-center justify-center hover:bg-blue px-4 py-2 text-blue hover:text-white border border-blue font-semibold rounded duration-300 ease-linear'
                        type='submit'
                    >
                        {loading ? <Loader className="animate-spin" /> : t("submit")}
                    </button>
                </form>
                <div className=' md:w-1/2'>
                    <Lottie
                        animationData={contactAnim}
                        loop={true}
                        style={{ height: 400 }}
                    />
                </div>
            </div>
        </div>
    );
}
