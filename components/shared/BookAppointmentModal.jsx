"use client";

import {
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { countries } from "@/public/data/country";
import { MuiTelInput } from "mui-tel-input";
import { AiFillEye } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";

export default function BookAppointmentModal({ open, onClose }) {
  const t = useTranslations("bookAppointmentModal");
  const [yes, setYes] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, SetError] = useState("");

  const [firstname, setfirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [pataientEmail, setPataientEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [errors, SetErrors] = useState(null);
  const [passport, setPassport] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const inputType = isVisible ? "text" : "password";

  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const inputType1 = isVisible1 ? "text" : "password";

  const handlePhone = (newPhone) => setPhone(newPhone);

  const resetForm = () => {
    setfirstname("");
    setLastName("");
    setDob("");
    setPataientEmail("");
    setPhone("");
    setGender("");
    setCitizenship("");
    setCountry("");
    setPassword("");
    setConfirmPassword("");
    setPassport("");
    setYes(true);
    SetError("");
    SetErrors(null);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      SetError(t("passwordMismatch"));
      setLoader(false);
    } else {
      const formData = new FormData();
      formData.append("firstName", firstname);
      formData.append("lastName", lastName);
      formData.append("dob", dob);
      formData.append("email", pataientEmail);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("citizenship", citizenship);
      formData.append("passport", passport);
      if (yes) {
        formData.append("country", "Thailand");
      } else {
        formData.append("country", country);
      }
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      try {
        setLoader(true);
        SetErrors(null);

        const res = await fetch(
          "http://127.0.0.1:8000/api/register",
          {
            method: "POST",
            body: formData,
          }
        );
        setLoader(false);

        if (res?.status !== 200) {
          toast.error(t("errorToast"), {
            position: "top-center",
            style: {
              padding: "20px",
              border: "1px solid #ccc",
              color: "red",
            },
          });
          SetErrors({ status: 500 });
        }
        const jsonData = await res.json();

        if (jsonData?.err) {
          toast.error(t("errorToast"), {
            position: "top-center",
            style: {
              padding: "20px",
              border: "1px solid #ccc",
              color: "red",
            },
          });
          SetErrors(jsonData.err);
          return;
        }

        if (jsonData?.data?.token) {
          toast.success(t("successToast"), {
            position: "top-center",
            style: {
              padding: "20px",
              border: "1px solid #ccc",
              color: "green",
            },
            duration: 5000,
          });
          resetForm();
          onClose();
        }
      } catch (error) {}
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-2 md:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-4 md:my-8 bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-cream hover:bg-blue hover:text-white text-blue rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 shadow"
          aria-label="Close"
        >
          <CloseIcon sx={{ fontSize: "18px" }} />
        </button>

        <div className="p-4 md:p-6 max-h-[90vh] overflow-y-auto">
          <h5 className="mb-3 text-base md:text-xl font-semibold text-blue pr-8">
            {t("heading")}
          </h5>
          <Divider />

          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div>
              <p className="mb-1 text-sm">{t("firstName")}</p>
              <TextField
                size="small"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                fullWidth
                placeholder={t("required")}
              />
            </div>
            <div>
              <p className="mb-1 text-sm">{t("lastName")}</p>
              <TextField
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                placeholder={t("required")}
              />
            </div>

            <FormControl fullWidth size="small">
              <p className="mb-1 text-sm">{t("citizenship")}</p>
              <Select
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value)}
              >
                {countries.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <p className="mb-1 text-sm">{t("gender")}</p>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">{t("male")}</MenuItem>
                <MenuItem value="Female">{t("female")}</MenuItem>
                <MenuItem value="Other">{t("other")}</MenuItem>
              </Select>
            </FormControl>
            <div>
              <p className="mb-1 text-sm">{t("email")}</p>
              {errors?.email && (
                <p className="text-red text-xs">{errors?.email[0]}</p>
              )}
              <TextField
                size="small"
                fullWidth
                placeholder={t("required")}
                type="email"
                value={pataientEmail}
                onChange={(e) => setPataientEmail(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-sm">{t("phone")}</p>
              <MuiTelInput
                size="small"
                defaultCountry="TH"
                value={phone}
                onChange={handlePhone}
                fullWidth
              />
            </div>
            <div>
              <p className="mb-1 text-sm">{t("dob")}</p>
              <TextField
                size="small"
                fullWidth
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-sm">{t("passportCopy")}</p>
              <input
                type="file"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                className="w-full h-[40px] text-sm border border-gray-300 rounded px-3 py-1.5 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-cream file:text-blue hover:file:bg-blue hover:file:text-white file:cursor-pointer cursor-pointer focus:outline-none focus:border-blue"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium">{t("areYouInThailand")}</p>
            <div className="flex gap-2 mt-1.5 mb-3">
              <button
                type="button"
                className={`px-4 py-1 rounded text-sm ${
                  yes === true ? "bg-blue text-white" : "border"
                }`}
                onClick={() => setYes(true)}
              >
                {t("yes")}
              </button>
              <button
                type="button"
                className={`px-4 py-1 rounded text-sm ${
                  yes === false ? "bg-blue text-white" : "border"
                }`}
                onClick={() => setYes(false)}
              >
                {t("no")}
              </button>
            </div>
            {yes === false && (
              <FormControl fullWidth size="small">
                <p className="mb-1 text-sm">{t("country")}</p>
                <Select
                  value={country}
                  className="mb-3"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((c, i) => (
                    <MenuItem key={i} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          <div className="md:grid md:grid-cols-2 gap-3 mt-2">
            <div>
              <p className="mb-1 text-sm">{t("password")}</p>
              <div className="flex relative">
                <TextField
                  size="small"
                  type={inputType}
                  fullWidth
                  placeholder={t("required")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={toggleVisibility}>
                  <AiFillEye className="text-xl text-blue !absolute right-3 top-[10px]" />
                </button>
              </div>
            </div>
            <div>
              <p className="mt-2 md:mt-0 mb-1 text-sm">{t("confirmPassword")}</p>
              <div className="flex relative">
                <TextField
                  size="small"
                  type={inputType1}
                  fullWidth
                  placeholder={t("required")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" onClick={toggleVisibility1}>
                  <AiFillEye className="text-xl text-blue !absolute right-3 top-[10px]" />
                </button>
              </div>
            </div>
            {error && (
              <div className="mt-2 md:col-span-2">
                <p className="text-red text-sm font-semibold">{error}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="button"
              className={`px-8 py-2 rounded font-semibold text-sm duration-300 ease-linear ${
                loader ||
                firstname === "" ||
                lastName === "" ||
                citizenship === "" ||
                gender === "" ||
                pataientEmail === "" ||
                phone === "" ||
                dob === ""
                  ? "bg-white text-blue border border-blue cursor-not-allowed"
                  : "text-white bg-blue border border-blue hover:bg-white hover:text-blue"
              }`}
              disabled={
                loader ||
                firstname === "" ||
                lastName === "" ||
                citizenship === "" ||
                gender === "" ||
                pataientEmail === "" ||
                phone === "" ||
                dob === ""
              }
              onClick={handleSubmit}
            >
              {loader ? (
                <Loader className="animate-spin" stroke="black" color="black" />
              ) : (
                t("submit")
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
