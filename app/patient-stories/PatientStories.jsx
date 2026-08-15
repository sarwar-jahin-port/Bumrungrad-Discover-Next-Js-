"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const StoryCard = ({ story, t }) => (
  <div className="relative p-6 rounded-xl shadow-lg border border-ash/20 bg-white flex flex-col gap-3">
    <FaQuoteLeft className="text-3xl text-blue" />
    <p className="text-sm md:text-base text-black/80">{story.story}</p>
    <div className="flex items-center gap-1 text-[#f7cb2b]">
      {Array.from({ length: 5 }).map((_, i) =>
        i < (story.rating || 5) ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
      )}
    </div>
    <div>
      <p className="font-semibold">{story.patient_name}</p>
      {story.country && <p className="text-sm text-black/60">{t("from")} {story.country}</p>}
    </div>
  </div>
);

const PatientStories = () => {
  const t = useTranslations("healthInfo.patientStories");
  const [stories, setStories] = useState([]);
  const [loader, setLoader] = useState(true);

  const [patientName, setPatientName] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState(5);
  const [story, setStory] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/patient-stories")
      .then((res) => res.json())
      .then((data) => {
        setStories(data.status === 200 ? data.data : []);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    const formData = new FormData();
    formData.append("patient_name", patientName);
    formData.append("country", country);
    formData.append("rating", rating);
    formData.append("story", story);

    try {
      const response = await fetch("https://api.discoverinternationalmedicalservice.com/api/add/patient-story", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSubmitLoader(false);
      if (data.status === 200) {
        toast.success(t("successToast"));
        setPatientName("");
        setCountry("");
        setRating(5);
        setStory("");
      } else {
        toast.error(t("errorToast"));
      }
    } catch (error) {
      setSubmitLoader(false);
      toast.error(t("errorToast"));
    }
  };

  return (
    <div>
      <div className="py-14 md:py-20 bg-blue relative flex justify-center items-center text-center px-5">
        <div className="text-white z-10 max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold">{t("heading")}</h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            {t("intro")}
          </p>
        </div>
      </div>

      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-blue mb-6">
          {t("storiesHeading")}
        </h2>

        {loader ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 rounded-xl bg-cream animate-pulse" />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <p className="text-black/60">
            {t("noStories")}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stories.map((s) => (
              <StoryCard key={s.id} story={s} t={t} />
            ))}
          </div>
        )}

        <div className="mt-14 md:mt-20 max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-blue mb-2">
            {t("shareHeading")}
          </h2>
          <p className="text-sm text-black/60 mb-6">
            {t("shareIntro")}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-ash/30 shadow-lg p-6 bg-white">
            <div>
              <label className="text-sm font-semibold mb-1 block">{t("yourName")}</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border border-ash/40 rounded px-3 py-2 focus:outline-none focus:border-blue"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">{t("country")}</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-ash/40 rounded px-3 py-2 focus:outline-none focus:border-blue"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">{t("rating")}</label>
              <div className="flex gap-1 text-2xl text-[#f7cb2b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(i + 1)}
                    aria-label={t("rateLabel", { n: i + 1 })}
                  >
                    {i < rating ? <AiFillStar /> : <AiOutlineStar />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">{t("yourStory")}</label>
              <textarea
                required
                rows={5}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full border border-ash/40 rounded px-3 py-2 focus:outline-none focus:border-blue"
              />
            </div>
            <button
              type="submit"
              disabled={submitLoader}
              className="px-4 py-2.5 bg-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {submitLoader ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientStories;
