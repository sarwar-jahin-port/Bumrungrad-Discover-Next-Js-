"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/helpers/hooks/useAuth";
import { useRouter } from "next/navigation";
import BookAppointmentModal from "@/components/shared/BookAppointmentModal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaLock, FaUserMd, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const Landing = () => {
  const t = useTranslations("home.landing");
  const BULLET_POINTS = [t("bullet1"), t("bullet2"), t("bullet3")];
  const { auth } = useAuth();
  const router = useRouter();
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [heroStat, setHeroStat] = useState("");

  const [patientName, setPatientName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [medicalConcern, setMedicalConcern] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setHeroStat(data.data?.hero_stat_cases_managed || "");
        }
      })
      .catch(() => {});
  }, []);

  function handleAppointment() {
    if (auth) {
      router.push("/our-services/appointment");
    } else {
      router.push("/login");
    }
  }
  function handleHealthScreen() {
    setAppointmentOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    const formData = new FormData();
    formData.append("patient_name", patientName);
    formData.append("whatsapp", whatsapp);
    formData.append("medical_concern", medicalConcern);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/add/free-consultation", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSubmitLoader(false);
      if (data.status === 200) {
        toast.success(t("successToast"));
        setPatientName("");
        setWhatsapp("");
        setMedicalConcern("");
      } else {
        toast.error(t("errorToast"));
      }
    } catch (error) {
      setSubmitLoader(false);
      toast.error(t("errorToast"));
    }
  };

  return (
    <section className="bg-cream relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="flex flex-col lg:flex-row gap-10 py-16 px-5 items-center md:container md:mx-auto relative">
        <div className="lg:w-1/2 w-full">
          <div className="relative bg-white rounded-2xl shadow-[0_25px_60px_-20px_rgba(40,38,111,0.35)] border border-blue/10 p-6 md:p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue via-gold to-blue" />
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-blue/10 text-blue text-lg shrink-0">
                <FaUserMd />
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-blue leading-tight">
                  {t("formTitle")}
                </h2>
                <p className="text-xs text-ash">{t("formSubtitle")}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-blue/70 mb-1 block">
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-cream/40 border border-blue/15 rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-blue/70 mb-1 block">
                  {t("whatsapp")}
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-cream/40 border border-blue/15 rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-blue/70 mb-1 block">
                  {t("medicalConcern")}
                </label>
                <textarea
                  required
                  rows={3}
                  value={medicalConcern}
                  onChange={(e) => setMedicalConcern(e.target.value)}
                  className="w-full bg-cream/40 border border-blue/15 rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10"
                />
              </div>
              <button
                type="submit"
                disabled={submitLoader}
                className="group px-4 py-3 bg-blue text-white rounded-lg font-semibold shadow-md shadow-blue/20 hover:bg-gold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitLoader ? t("submitting") : t("submit")}
                {!submitLoader && (
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                )}
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-ash">
                <FaLock className="text-[10px]" /> {t("confidential")}
              </p>
            </form>
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col gap-5 md:gap-6">
          <h1 className="text-xl md:text-3xl lg:text-4xl text-blue font-extrabold">
            {t("heading")}
          </h1>
          <ul className="flex flex-col gap-3">
            {BULLET_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <IoMdCheckmarkCircle className="text-green text-xl mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {heroStat && (
            <AnimatedCounter
              text={heroStat}
              className="text-2xl md:text-3xl font-bold text-gold"
            />
          )}

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleAppointment}
              className="w-full text-sm md:w-fit px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded"
            >
              {t("doctorAppointment")}
            </button>
            <button
              onClick={handleHealthScreen}
              className="w-full text-sm md:w-fit px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded"
            >
              {t("healthScreening")}
            </button>
          </div>
        </div>
      </div>
      <BookAppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </section>
  );
};

export default Landing;
