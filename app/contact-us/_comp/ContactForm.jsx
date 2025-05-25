"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import emailjs from '@emailjs/browser'
import contactAnim from "@/public/assets/anim/contact.json";
import { TextField } from "@mui/material";
import { sendEmails } from "@/helpers/mail/sendMail";
import toast from "react-hot-toast";
import { admin_mails } from "@/constant";
import { userMailBody } from "@/helpers/mail/mailbody";
import Loader from "@/components/ui/loader";
import { FaSpinner } from "react-icons/fa";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAnim, setShowAnim] = useState(false);
  useEffect(() => {
    setShowAnim(true);
  }, []);
  const sendEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      );

      setLoading(false);
      if (response.success == true && sendClientMail.success == true) {
        toast.success(
          "We have received your request. Our representative will reach you shortly!",
          {
            position: "top-center",
            style: { borderRadius: "20px" },
            duration: 5000,
          }
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
      if (response.success == false) {
        toast.error("Something went wrong", {
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
  // const sendEmail = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);

  //     const response = await fetch(
  //       "https://api.discoverinternationalmedicalservice.com/api/contact-us",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     const result = await response.json();
  //     setLoading(false);

  //     if (result.status === 200) {
  //       toast.success(
  //         "We have received your request. Our representative will reach you shortly!",
  //         {
  //           position: "top-center",
  //           style: { borderRadius: "20px" },
  //           duration: 5000,
  //         }
  //       );

  //       setFormData({
  //         name: "",
  //         email: "",
  //         message: "",
  //       });
  //     } else {
  //       toast.error("Something went wrong", {
  //         position: "top-center",
  //         style: { color: "red", padding: "16px" },
  //         duration: 3000,
  //         icon: "😱😱",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("API error:", error);
  //     setLoading(false);
  //     toast.error("Server error. Please try again later.");
  //   }
  // };

  return (
    <div>
      <h1 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue">
        Contact Us
      </h1>
      <div className="my-10 md:flex gap-8 items-center">
        <form
          onSubmit={sendEmail}
          className="flex flex-col gap-4 md:w-1/2 shadow p-5 rounded"
        >
          <TextField
            label="Enter Name"
            variant="outlined"
            name="user_name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            label="Enter Email"
            variant="outlined"
            name="user_email"
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
            label="Enter Message"
            variant="outlined"
            multiline
            required
            name="message"
            rows={5}
          />
          <button
            disabled={loading}
            className="flex items-center justify-center bg-blue px-4 py-2.5 text-white font-semibold rounded"
            type="submit"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="md:w-1/2">
          {showAnim && (
            <Lottie
              animationData={contactAnim}
              loop={true}
              style={{ height: 400 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
