"use client";

import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import Loader from '../../shared/Loader/Loader'
import { FaArrowUp } from "react-icons/fa";
import notFoundAnim from "@/public/assets/anim/notfound.json";
import Lottie from "lottie-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import { CardLoaders } from "@/components/ui/cardload";
import { useTranslations } from "next-intl";

export default function FindDoctor() {
  const t = useTranslations("doctors.findDoctor");
  const [advanceBox, setAdvanceBox] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showData, setshowData] = useState(15);
  const [speacility, setSpeacility] = React.useState("");
  const [subSpeacility, setSubSpeacility] = React.useState("");
  const [lang, setLang] = React.useState("");
  const [day, setDay] = React.useState("");
  const [time, setTime] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState({});
  const [specialties, setSpecialities] = useState([]);
  const [subSpecialties, setSubSpecialities] = useState([]);

  //filter modal states
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = React.useState("");
  const [docName, setDocName] = React.useState("");
  // search by name
  const addDocName = () => {
    setDocName(name);
  };

  // `name` is the API filter value (kept in English); the display label is
  // translated separately via t(`weekdays.${name}`) etc. at render time.
  const weekdays = [
    { name: "Saturday" },
    { name: "Sunday" },
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
  ];
  const languages = [
    { name: "Thai" },
    { name: "English" },
    { name: "Arabic" },
    { name: "Chinese" },
    { name: "Dutch" },
    { name: "French" },
    { name: "German" },
    { name: "Hindi" },
    { name: "Japanese" },
    { name: "Spanish" },
    { name: "Urdo" },
    { name: "Mandarin" },
    { name: "Punjab" },
    { name: "Hokkin" },
    { name: "Hainan" },
    { name: "Cantonese" },
  ];

  const times = [{ name: "Morning" }, { name: "Evening" }, { name: "Night" }];
  const genders = [{ name: "Male" }, { name: "Female" }];

  const style = {
    height: 300,
  };

  //Show data add and data less
  const handaleAddData = () => {
    setshowData((prev) => prev + 15);
  };
  const handalelessData = (num) => {
    setshowData((prev) => Math.max(prev - 15, 15));
  };
  //get speacilities
  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/api/get/specialty"
    )
      .then((res) => res.json())
      .then((data) => setSpecialities(data?.response?.data));
  }, []);

  //get sub speacilities
  useEffect(() => {
    if (speacility) {
      fetch(
        `http://127.0.0.1:8000/api/get/selected/sub/specialty/${speacility}`
      )
        .then((res) => res.json())
        .then((data) => setSubSpecialities(data?.response?.data));
    }
  }, [speacility]);

  //get doctors
  useEffect(() => {
    setLoader(true);
    // Create a function to fetch data based on the URL
    const fetchData = () => {
      // Create a query string based on your query states
      const queryParams = `name=${docName}&specialty=${speacility}&sub_specialty=${subSpeacility}&lang=${lang}&gender=${gender}&shift=${time}&day=${day}`;
      // Create the base URL
      const baseUrl =
        "http://127.0.0.1:8000/api/search/doctor";
      // Create the final URL by appending the query string if it's not empty
      const finalUrl = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
      // Fetch data from the API
      fetch(finalUrl)
        .then((res) => res.json())
        .then((data) => {
          setDoctors(data.data);
          setQuery(data.query);
          setLoader(false);
        })
        .catch((error) => console.error(error));
    };
    // Call the fetchData function whenever any state changes
    fetchData();
  }, [docName, speacility, subSpeacility, lang, day, time, gender]);

  const handaleToptoBottom = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen container mx-auto">
      {/* search field  */}
      <div id="finddoctor" className="flex items-center">
        <div className="container mx-5 md:mx-auto max-sm:p4 p-6 md:p-12 rounded-xl bg-white shadow-xl md:w-1/2 lg:w-1/3">
          <h1 className="text-xl md:text-3xl font-semibold text-blue text-center">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-4 mt-5 md:mt-10">
            <div className="flex">
              <TextField
                id="outlined-basic"
                label={t("enterDoctorName")}
                variant="outlined"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                onClick={addDocName}
                variant="contained"
                className="!bg-blue"
              >
                <IoSearchOutline className="text-3xl" />
              </Button>
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("selectSpeciality")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={speacility}
                label={t("selectSpeciality")}
                onChange={(e) => setSpeacility(e.target.value)}
              >
                {specialties?.map((s, i) => (
                  <MenuItem value={s?.name} key={i}>
                    {s?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("selectSubSpeciality")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subSpeacility}
                label={t("selectSubSpeciality")}
                onChange={(e) => setSubSpeacility(e.target.value)}
                disabled={subSpecialties?.length === 0}
              >
                {subSpecialties?.map((s, i) => (
                  <MenuItem value={s?.sub_specialty} key={i}>
                    {s?.sub_specialty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <button
              onClick={() => setAdvanceBox(!advanceBox)}
              className="bg-blue rounded px-4 py-3 text-white hidden md:flex justify-between"
            >
              {t("advanceSearch")}
              {advanceBox ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </button>

            <button
              onClick={handleClickOpen}
              className="md:hidden bg-blue rounded px-4 py-3 text-white flex justify-between"
            >
              {t("moreSearch")}
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View Search Fields */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="md:hidden"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center text-blue !font-semibold"
        >
          {t("yourPreferences")}
        </DialogTitle>
        <DialogContent>
          <form className="py-1.5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("language")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lang}
                  label={t("language")}
                  onChange={(e) => setLang(e.target.value)}
                >
                  {languages.map((l, i) => (
                    <MenuItem value={l.name} key={i}>
                      {t(`languages.${l.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("day")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={day}
                  label={t("day")}
                  onChange={(e) => setDay(e.target.value)}
                >
                  {weekdays.map((w, i) => (
                    <MenuItem value={w.name} key={i}>
                      {t(`weekdays.${w.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("time")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label={t("time")}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {times.map((tm, i) => (
                    <MenuItem key={i} value={tm.name}>
                      {t(`times.${tm.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("gender")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label={t("gender")}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genders.map((g, i) => (
                    <MenuItem value={g.name} key={i}>
                      {t(`genders.${g.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="!flex !justify-center mb-5">
          <Button
            onClick={handleClose}
            variant="contained"
            className="!bg-blue !shadow-none"
          >
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Tab View Search Fields */}
      {advanceBox && (
        <>
          <form className="hidden md:block relative mt-5 mb-10 lg:w-1/2 mx-5 md:container md:mx-auto pt-16 px-10 pb-10 bg-white/90 rounded-xl shadow-md shadow-blue">
            <button
              onClick={() => setAdvanceBox(!advanceBox)}
              className="absolute top-2 right-2 bg-red text-white rounded"
            >
              <CloseIcon />
            </button>
            <div className="grid gap-4 md:grid-cols-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("language")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lang}
                  label={t("language")}
                  onChange={(e) => setLang(e.target.value)}
                >
                  {languages.map((l, i) => (
                    <MenuItem value={l.name} key={i}>
                      {t(`languages.${l.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("day")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={day}
                  label={t("day")}
                  onChange={(e) => setDay(e.target.value)}
                >
                  {weekdays.map((w, i) => (
                    <MenuItem value={w.name} key={i}>
                      {t(`weekdays.${w.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("time")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label={t("time")}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {times.map((tm, i) => (
                    <MenuItem key={i} value={tm.name}>
                      {t(`times.${tm.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("gender")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label={t("gender")}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genders.map((g, i) => (
                    <MenuItem value={g.name} key={i}>
                      {t(`genders.${g.name}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <button className="px-4 py-2 bg-blue border border-blue hover:bg-white hover:text-blue duration-300 ease-linear mt-4 rounded flex items-center gap-5 text-white">
              {t("clearFilters")}
              <CachedIcon />
            </button>
          </form>
        </>
      )}
      {/* filters  */}
      {docName ||
      query?.specialty ||
      query?.sub_specialty ||
      query?.lang ||
      query?.day ||
      query?.schedule ||
      query?.gender ? (
        <div className="mx-5 mt-10 md:container md:mx-auto">
          <p className="text-lg md:text-xl font-semibold">{t("filtersLabel")}</p>
          <div className="flex flex-wrap gap-1 mt-5">
            {docName && (
              <button
                onClick={() => setDocName("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {docName} <CloseIcon />{" "}
              </button>
            )}
            {query?.specialty && (
              <button
                onClick={() => setSpeacility("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.specialty} <CloseIcon />{" "}
              </button>
            )}
            {query?.sub_specialty && (
              <button
                onClick={() => setSubSpeacility("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.sub_specialty} <CloseIcon />{" "}
              </button>
            )}
            {query?.lang && (
              <button
                onClick={() => setLang("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.lang} <CloseIcon />{" "}
              </button>
            )}
            {query?.day && (
              <button
                onClick={() => setDay("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.day} <CloseIcon />{" "}
              </button>
            )}
            {query?.shift && (
              <button
                onClick={() => setTime("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.shift} <CloseIcon />{" "}
              </button>
            )}
            {query?.schedule && (
              <button
                onClick={() => setDay("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.schedule} <CloseIcon />{" "}
              </button>
            )}
            {query?.gender && (
              <button
                onClick={() => setGender("")}
                className="capitalize bg-blue text-white duration-300 ease-linear shadow flex items-center gap-1 px-2 py-1 border rounded lg:text-xl"
              >
                {query?.gender} <CloseIcon />{" "}
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* doctors data  */}
      {loader ? (
        <CardLoaders cardLength={20} gridNumber={5} />
      ) : (
        <div className="mx-5 md:container md:mx-auto relative">
          <button
            onClick={handaleToptoBottom}
            className="p-2 md:p-4 fixed bottom-5 right-5 z-50 bg-blue hover:bg-white border-2 border-blue text-white hover:text-blue rounded-full"
          >
            <FaArrowUp className="text-xl md:text-3xl" />
          </button>
          {doctors?.length > 0 ? (
            <div>
              <p className="max-sm:pt-5 md:pt-10 text-xl md:text-2xl font-semibold">
                {t("found")} <span className="text-blue">{doctors?.length}</span>{" "}
                {t("doctorWord")}
              </p>

              <div className="grid grid-cols-1 place-items-center  md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5 my-5">
                {doctors.slice(0, showData).map((d, i) => (
                  <div
                    className="shadow hover:shadow-xl duration-300 ease-linear flex flex-col gap-5 w-full h-full lg:h-[520px] rounded-xl "
                    key={i}
                  >
                    <div className="relative">
                      {d.cover_photo ? (
                        <Image
                          height={300}
                          width={1000}
                          src={d.cover_photo}
                          alt="Bumrungrad International Hospital"
                          loading="lazy"
                          className="max-sm:h-full max-sm:w-full md:h-[350px]  w-full rounded-tl-xl rounded-tr-xl"
                        />
                      ) : (
                        <div className="max-sm:h-full max-sm:w-full md:h-[350px] w-full rounded-tl-xl rounded-tr-xl bg-cream flex items-center justify-center text-black/30 text-sm">
                          {t("noPhoto")}
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/doctors/${d?.slug}`}
                          className="flex justify-center"
                          target="_blank"
                        >
                          <button className="bg-blue text-sm md:text-base text-white  absolute bottom-0 rounded-tl-xl rounded-tr-xl px-2 md:px-6 py-2">
                            {t("viewProfile")}
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="mb-2.5 ">
                      <p className="text-center md:text-xl text-blue font-bold">
                        {d?.name}
                      </p>
                      <p className="text-center mt-1 md:text-lg ">
                        {d?.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="min-h-[40vh] shadow-xl rounded p-5 mb-2.5">
              <Lottie style={style} animationData={notFoundAnim} loop={true} />
              <p className="text-xl font-semibold text-blue text-center">
                {t("noDoctorFound")}
              </p>
            </div>
          )}
        </div>
      )}

      {doctors.length > 15 && (
        <div className="flex justify-center items-center gap-2 md:gap-4 mt-8 ">
          {showData !== 15 && (
            <button
              onClick={handalelessData}
              className="border border-blue bg-blue hover:bg-white hover:text-blue rounded-full text-sm md:text-base text-white px-2 md:px-6 py-2"
            >
              {t("viewLess")}
            </button>
          )}

          <button
            onClick={handaleAddData}
            className="border border-blue bg-blue hover:bg-white hover:text-blue rounded-full text-sm md:text-base text-white   px-2 md:px-6 py-2"
            disabled={showData === doctors?.length}
          >
            {t("viewMore")}
          </button>
        </div>
      )}
    </section>
  );
}
