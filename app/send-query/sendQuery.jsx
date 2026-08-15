"use client";

import React, { useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { natioNalities, countries } from "@/public/data/country";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";
// import { useNavigate } from 'react-router-dom'

const SendQuery = () => {
  const t = useTranslations("sendQuery");
  const [loader, setLoader] = useState();
  const [inquery, setInquery] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [treatmentInterest, setTreatmentInterest] = useState("");
  const [question, setQuestion] = useState("");
  const [hospitalNumber, setHospitalNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birtDate, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [country, setCountry] = useState("");

  //phoneNumberSelect
  const handleChange = (newValue) => {
    setPhoneNumber(newValue);
  };
  const navigate = useRouter();

  //  Query Submit
  const handaleQuerySubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();

    const fields = {
      inquery,
      doctorName,
      treatmentInterest,
      question,
      hospitalNumber,
      firstName,
      lastName,
      email,
      phoneNumber,
      birtDate,
      gender,
      citizenship,
      country,
    };

    Object.entries(fields).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      setLoader(true);
      const response = await fetch(
        "https://api.discoverinternationalmedicalservice.com/api/add/question",
        {
          method: "POST",
          body: formData,
        }
      );
      setLoader(false);

      const get_response = await response.json();

      if (get_response.status !== 200) {
        toast.success(t("errorToast"), {
          duration: 5000,
          style: {
            color: "red",
          },
        });
        return;
      }

      if (get_response.status === 200) {
        toast.success(
          t("successToast"),
          {
            position: "top-center",
            style: { borderRadius: "20px" },
            duration: 5000,
          }
        );
        form.reset();
        navigate.push("/");
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <section className="md:container md:mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue my-5 ">
        {t("heading")}
      </h1>
      <div className="md mb-14">
        <div className="shadow-xl rounded-xl md:p-5">
          <div className="p-4">
            <form onSubmit={handaleQuerySubmit}>
              <div className="grid md:grid-cols-2 gap-2.5">
                <div>
                  <p className="mb-2.5 font-semibold text-sm">
                    {t("typeOfInquiry")}
                  </p>
                  <TextField
                    onChange={(e) => setInquery(e.target.value)}
                    fullWidth
                    required
                  />
                </div>
                <div className="">
                  <p className="mb-2.5 font-semibold text-sm">
                    {t("doctorNameLabel")}
                  </p>
                  <TextField
                    onChange={(e) => setDoctorName(e.target.value)}
                    fullWidth
                    required
                  />
                </div>
                <div className="">
                  <p className="mb-2.5 font-semibold text-sm">
                    {t("treatmentInterest")}
                  </p>
                  <TextField
                    onChange={(e) => setTreatmentInterest(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>

              {/* <div className='mt-4'>
                <p className='mb-2.5 font-semibold text-sm'>
                  Country of Bumrungrad Office*
                </p>
                <TextField
                  onChange={(e) => setBumrungradOffice(e.target.value)}
                  fullWidth
                />
              </div> */}

              <div className="mt-4">
                <p className="mb-2.5 font-semibold text-sm">{t("yourQuestion")}</p>
                <TextField
                  onChange={(e) => setQuestion(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-2.5">
                <div className="mt-4">
                  <p className="mb-2.5 font-semibold text-sm">
                    {t("hospitalNumber")}
                  </p>
                  <TextField
                    onChange={(e) => setHospitalNumber(e.target.value)}
                    fullWidth
                    placeholder={t("hospitalNumberPlaceholder")}
                  />
                </div>
                <div className="mt-4">
                  <p className="mb-2.5 font-semibold text-sm">{t("firstName")}</p>
                  <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    required
                  />
                </div>
                <div className="mt-4">
                  <p className="mb-2.5 font-semibold text-sm">{t("lastName")}</p>
                  <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    required
                  />
                </div>
                <div className="mt-4">
                  <p className="mb-2.5 font-semibold text-sm">{t("email")}</p>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    placeholder={t("emailPlaceholder")}
                    required
                  />
                </div>
                <div className="mt-4">
                  <p className="mb-2.5 font-semibold text-sm">
                    {t("whatsappNumber")}
                  </p>
                  <MuiTelInput
                    value={phoneNumber}
                    onChange={handleChange}
                    defaultCountry="TH"
                    className="w-[100%]"
                  />
                </div>
              </div>
              <div className="mt-6 grid  md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2.5 font-semibold text-sm">{t("dob")}</p>
                  <TextField
                    onChange={(e) => setDOB(e.target.value)}
                    type="date"
                    fullWidth
                    placeholder={t("dobPlaceholder")}
                  />
                </div>
                <div>
                  <FormControl fullWidth>
                    <p className="mb-2.5 font-semibold text-sm">
                      {t("selectGender")}
                    </p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      required
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Male">{t("male")}</MenuItem>
                      <MenuItem value="Female">{t("female")}</MenuItem>
                      <MenuItem value="Other">{t("other")}</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <p className="mb-2.5 font-semibold text-sm">
                      {t("selectCitizenship")}
                    </p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={citizenship}
                      required
                      onChange={(e) => setCitizenship(e.target.value)}
                    >
                      {natioNalities.map((c, i) => (
                        <MenuItem key={i} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p className="mb-2.5 font-semibold text-sm">
                    {t("countryOfResidence")}
                  </p>
                  <TextField
                    id="filled-select-currency-native"
                    select
                    fullWidth
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    SelectProps={{
                      native: true,
                    }}
                    helperText={t("selectCountryHelper")}
                  >
                    {countries.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="flex justify-center m-5">
                <button
                  disabled={loader}
                  type="submit"
                  className={`${
                    loader
                      ? "bg-white text-black border $"
                      : "bg-blue text-white border-blue"
                  } btn_primary `}
                >
                  {loader ? (
                    <Loader
                      color={"black"}
                      stroke="black"
                      className="animate-spin"
                    />
                  ) : (
                    t("submit")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendQuery;
