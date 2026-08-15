"use client";

import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import useAuth from "@/helpers/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";


const MedicalRecords = () => {
  const t = useTranslations("common");
  const tPage = useTranslations("ourServices.medicalRecords");
  const { auth } = useAuth();
  const userDetails = auth;
  const [loader, setLoader] = useState();
  const [passport, setPassport] = useState("");
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [hnNum, setHnNum] = useState("");
  const [caseSummary, setCaseSummary] = useState("");
  const navigate = useRouter();

  const addPatient = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();

    const fields = {
      passport,
      name,
      whatsapp,
      hnNum,
      caseSummary,
    };

    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

    try {
      setLoader(true);
      const response = await fetch(
        "https://api.discoverinternationalmedicalservice.com/api/add/medical/report",
        {
          method: "POST",
          body: formData,
        }
      );
      setLoader(false);

      const data = await response.json();

      if (data.status == 200) {
        toast.success(t("successToast"), {
          position: "top-center",
          style: { borderRadius: "20px" },
          duration: 5000,
        });
        form.reset();
        navigate.push("/");
      } else {
        setLoader(false);
        toast.error(t("errorToast"), {
          position: "top-center",
          duration: 4000,
          style: {
            color: "red",
          },
        });
      }
    } catch (error) {
      setLoader(false);
      console.error(error?.message);
    }
  };

  useEffect(()=>{
    if(userDetails){
      setName(`${userDetails?.firstName} ${userDetails?.lastName}` || "")
      setWhatsapp(userDetails?.phone || "")
    }
  },[userDetails])
  return (
    <>
      <div className="md:my-10 md:p-10 mx-5 md:container md:mx-auto   lg:w-1/2  shadow-xl rounded-xl p-5 ">
        <h1 className="text-center capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue">
          {tPage("heading")}
        </h1>
        <form
          onSubmit={addPatient}
          className="mt-3 mb-2 w-full"
        >
          <div className="mb-2 flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-sm">
                {" "}
                <span className="text-red text-lg">*</span>{tPage("enterName")}
              </p>
              <TextField
                onChange={(e) => setName(e.target.value)}
                fullWidth
                value={name}
              />
            </div>
            <div className="mt-2">
              <p className="mb-2 font-semibold text-sm">
                {" "}
                <span className="text-red text-lg">*</span>{tPage("enterWhatsapp")}
              </p>
              <TextField
                onChange={(e) => setWhatsapp(e.target.value)}
                fullWidth
                value={whatsapp}
              />
            </div>
            <div className="mt-2">
              <p className="mt-2 font-semibold text-sm">
                <span className="text-red text-lg">*</span> {tPage("attachPassport")}
              </p>
              <TextField
                type="file"
                onChange={(e) => setPassport(e.target.files[0])}
                fullWidth
                required
              />
            </div>
            <div>
              <p className="mt-2 font-semibold text-sm">
                {tPage("hnNumber")}
              </p>
              <TextField onChange={(e) => setHnNum(e.target.value)} fullWidth />
            </div>
            <div>
              <p className="mt-2 font-semibold text-sm">
                {" "}
                <span className="text-red text-lg">*</span> {tPage("reportDetails")}
              </p>
              <TextField
                multiline
                onChange={(e) => setCaseSummary(e.target.value)}
                rows={4}
                fullWidth
              />
            </div>
          </div>
          <button
            disabled={loader || !name || !whatsapp || !passport || !caseSummary}
            type="submit"
            className={`${loader || !name || !whatsapp || !passport || !caseSummary ? "bg-white text-black border" : "bg-blue text-white"} btn_primary`}
          >
           {
            loader ? <Loader className="animate-spin" stroke={loader ? "black" : "white"} fill={loader ? "black" : "white"} /> : t("submit")
           }
          </button>
        </form>
      </div>
    </>
  );
};

export default MedicalRecords;
