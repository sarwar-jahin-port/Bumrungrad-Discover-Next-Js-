"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Divider, MenuItem, TextField } from "@mui/material";
import useAuth from "@/helpers/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendEmails } from "@/helpers/mail/sendMail";
import { admin_mails } from "@/constant";
import { comapanyMailBody } from "@/helpers/mail/mailbody";
import Loader from "@/components/ui/loader";
import { formatKeys } from "@/helpers/objectKeyFormat";

// Builds one selectable slot per schedule row a doctor has, e.g.
// "Monday - Morning (09:00 - 12:00)". Doctors with no schedule rows
// don't produce any slots, so they naturally fall out of the "active
// schedules" filter on the doctor dropdown below.
const buildTimeSlots = (doctor) => {
    const days = doctor?.day || [];
    return days.map((day, i) => {
        const shift = doctor?.shift?.[i] || "";
        const arrival = doctor?.arrival?.[i] || "";
        const leave = doctor?.leave?.[i] || "";
        const label = `${day}${shift ? ` - ${shift}` : ""}${
            arrival || leave ? ` (${arrival} - ${leave})` : ""
        }`;
        return { value: label, label };
    });
};

const TeleMedicine = () => {
    const { auth } = useAuth();
    const [loader, setLoader] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const navigate = useRouter();

    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [patientType, setPatientType] = useState("new");
    const [preferredDoctor, setPreferredDoctor] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [specificConcern, setSpecificConcern] = useState("");
    const [contactDetails, setContactDetails] = useState("");

    useEffect(() => {
        if (auth) {
            setFullName(`${auth?.firstName ?? ""} ${auth?.lastName ?? ""}`.trim());
            setBirthDate(auth?.dob || "");
            setContactDetails(auth?.phone || "");
        }
    }, [auth]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/get/doctors")
            .then((res) => res.json())
            .then((data) => {
                if (data?.response?.status === 200) {
                    // Doctor Selector doc requirement: "Dynamic filter list
                    // mapping active schedules" — only doctors with at least
                    // one schedule row are selectable.
                    const withSchedules = (data.response.data || []).filter(
                        (d) => (d?.day || []).length > 0,
                    );
                    setDoctors(withSchedules);
                }
            })
            .catch(() => {
                // Backend unreachable — leave the doctor list empty rather than
                // block the rest of the form from rendering.
            });
    }, []);

    const selectedDoctorRecord = useMemo(
        () => doctors.find((d) => d.name === preferredDoctor),
        [doctors, preferredDoctor],
    );
    const timeSlotOptions = useMemo(
        () => buildTimeSlots(selectedDoctorRecord),
        [selectedDoctorRecord],
    );

    const handleDoctorChange = (e) => {
        setPreferredDoctor(e.target.value);
        setTimeSlot(""); // slots depend on the doctor, reset on change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const fields = {
            fullName,
            birthDate,
            patientType,
            preferredDoctor,
            timeSlot,
            specificConcern,
            contactDetails,
        };

        setLoader(true);
        const token = localStorage.getItem("Access_Token");
        const response = await fetch(
            "http://127.0.0.1:8000/api/add/tele/medicine",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(fields),
            },
        );

        const jsonresponse = await response.json();

        if (jsonresponse.status === 200) {
            const send_mail_on_admin = await sendEmails(
                admin_mails,
                `Tele Medicine`,
                comapanyMailBody(formatKeys(fields), "Tele Medicine"),
            );
            const send_client_email = await sendEmails(
                auth?.email,
                `Tele Medicine`,
                comapanyMailBody(formatKeys(fields), "Tele Medicine"),
            );
            setLoader(false);

            if (send_mail_on_admin?.messageId && send_client_email?.messageId) {
                toast.success(
                    "We have received your request. Our representative will reach you shortly!",
                    {
                        position: "top-center",
                        style: { borderRadius: "20px" },
                        duration: 5000,
                    },
                );
                form.reset();
                navigate.push("/");
            }
        } else {
            setLoader(false);
            const errorMessage =
                jsonresponse?.errors &&
                Object.values(jsonresponse.errors).flat()[0];
            toast.error(errorMessage || "Something went wrong");
        }
    };

    return (
        <section className='md:container lg:w-1/2 md:mx-auto md:my-20 shadow rounded-xl'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-blue my-5 text-center'>
                Tele Medicine
            </h1>
            <form onSubmit={handleSubmit} className='px-5 md:px-10 lg:px-16 pb-24'>
                <Divider className='my-2.5' />
                <section className='grid md:grid-cols-2 gap-2.5'>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>Full Name</p>
                        <TextField
                            type='text'
                            value={fullName}
                            placeholder='Same As In Passport'
                            onChange={(e) => setFullName(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>Date of Birth</p>
                        <TextField
                            type='date'
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>
                            Patient Onboarding Verification
                        </p>
                        <div className='flex gap-2' role='radiogroup' aria-label='Patient type'>
                            {[
                                { value: "new", label: "New Patient" },
                                { value: "returning", label: "Returning Patient" },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    type='button'
                                    aria-pressed={patientType === opt.value}
                                    onClick={() => setPatientType(opt.value)}
                                    className={`flex-1 rounded border px-3 py-2 text-sm font-semibold duration-200 ease-linear ${
                                        patientType === opt.value
                                            ? "bg-blue text-white border-blue"
                                            : "bg-white text-blue border-blue/40"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>Target Doctor</p>
                        <TextField
                            select
                            value={preferredDoctor}
                            onChange={handleDoctorChange}
                            fullWidth
                            required
                            SelectProps={{ displayEmpty: true }}
                        >
                            <MenuItem value='' disabled>
                                {doctors.length
                                    ? "Select a doctor"
                                    : "No doctors with active schedules"}
                            </MenuItem>
                            {doctors.map((d) => (
                                <MenuItem key={d.id} value={d.name}>
                                    {d.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>
                            Preferred Booking Time Slot
                        </p>
                        <TextField
                            select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            fullWidth
                            required
                            disabled={!preferredDoctor}
                            SelectProps={{ displayEmpty: true }}
                        >
                            <MenuItem value='' disabled>
                                {preferredDoctor
                                    ? "Select a time slot"
                                    : "Select a doctor first"}
                            </MenuItem>
                            {timeSlotOptions.map((slot) => (
                                <MenuItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <p className='mb-2 font-semibold text-sm'>
                            WhatsApp Mobile Number
                        </p>
                        <TextField
                            placeholder='e.g. +66 12 345 6789'
                            value={contactDetails}
                            onChange={(e) => setContactDetails(e.target.value)}
                            fullWidth
                            required
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <p className='mb-2 font-semibold text-sm'>
                            Narrative Medical Concern
                        </p>
                        <TextField
                            placeholder='Describe your medical concern'
                            value={specificConcern}
                            onChange={(e) => setSpecificConcern(e.target.value)}
                            fullWidth
                            required
                            multiline
                            minRows={4}
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
                        "Submit"
                    )}
                </button>
            </form>
        </section>
    );
};

export default TeleMedicine;
