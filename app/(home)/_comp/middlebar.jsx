'use client';


import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { AiFillCloseCircle } from "react-icons/ai";

import apoointDoctor from "@/public/assets/appointment doctor.jpg";
import healthScrenning from "@/public/assets/health Screnning.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";


export default function MiddleBar() {
  const t = useTranslations("home.middlebar");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="md:flex md:justify-center">
      <div className="flex justify-between md:justify-center backdrop-blur-3xl bg-white/30 md:rounded">
        <Link
          href="/doctors"
          className="md:rounded-l-xl flex flex-col md:flex-row  gap-1 md:gap-2 px-4 py-2.5 md:px-8 md:py-5 hover:bg-white hover:md:bg-blue hover:md:text-white items-center duration-300 ease-linear cursor-pointer text-blue"
        >
          <SearchIcon sx={{ fontSize: "22px" }} />
          <p className="text-sm text-center flex gap-1 md:font-semibold">
            {t("find")} <span className="hidden md:block">{t("doctor")}</span>{" "}
          </p>
        </Link>
        <button
          onClick={handleClickOpen}
          className="flex flex-col md:flex-row  gap-1 md:gap-2 px-4 py-2.5 md:px-8 md:py-5 hover:bg-white hover:md:bg-blue hover:md:text-white items-center duration-300 ease-linear cursor-pointer text-blue"
        >
          <EventAvailableIcon sx={{ fontSize: "22px" }} />
          <p className="text-sm text-center flex gap-1 md:font-semibold">
            {" "}
            <span className="hidden md:block">{t("book")}</span> {t("appointment")}
          </p>
        </button>
        <Link
          href="/send-query"
          className="md:rounded-r-xl flex flex-col md:flex-row  gap-1 md:gap-2 px-4 py-2.5 md:px-8 md:py-5 hover:bg-white hover:md:bg-blue hover:md:text-white items-center duration-300 ease-linear cursor-pointer text-blue"
        >
          <HelpOutlineIcon sx={{ fontSize: "22px" }} />

          <p className="text-sm text-center flex gap-1 md:font-semibold">
            {" "}
            <span className="hidden md:block">{t("send")}</span> {t("query")}
          </p>
        </Link>
        <Link
          href="/my-profile"
          className="md:hidden flex flex-col md:flex-row  gap-1 md:gap-2 px-4 py-2.5 md:px-8 md:py-5 hover:bg-white items-center duration-300 ease-linear cursor-pointer text-blue md:text-white"
        >
          <PersonIcon sx={{ fontSize: "24px" }} />

          <p className="text-sm text-center flex gap-1">{t("account")}</p>
        </Link>
      </div>

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className="relative">
            <div className="flex justify-between">
              <h5 className="font-semibold md:text-xl capitalize">
                {t("chooseType")}
              </h5>
              <button onClick={handleClose}>
                <AiFillCloseCircle className="text-2xl md:text-4xl text-red" />
              </button>
            </div>
            <div className="flex mt-5 gap-2">
              <div  className="relative group">
                <Link href="/check-up">
                  <div className="absolute z-10 top-0 h-[100%] w-full bg-black/20 rounded-lg"></div>
                  <div className="absolute bottom-0 z-30 w-full bg-blue rounded-bl-lg rounded-br-lg">
                    <h2 className="text-white md:font-medium text-sm md:text-xl text-center p-1 md:py-3">
                      {t("healthScreening")}
                    </h2>
                  </div>

                  <Image
                  height={300}
                  width={1000}
                    src={healthScrenning}
                    alt="Bumrungrad International Hospital"
                    srcset=""
                    effect="blur"
                    className="rounded-lg max-sm:h-full h-[350px] w-full"
                  />
                </Link>
              </div>
              <div className="relative">
                <Link href="/our-services/appointment" >
                  <div className="absolute z-10 top-0 h-[100%] w-full bg-black/20 rounded-lg"></div>
                  <div className="absolute bottom-0 z-30 w-full bg-blue rounded-bl-lg rounded-br-lg">
                    <h2 className=" md:font-medium text-white text-sm md:text-xl text-center p-1 md:py-3">
                      {t("doctorSchedule")}
                    </h2>
                  </div>
                  <Image
                  height={400}
                  width={1000}
                    src={apoointDoctor}
                    effect="blur"
                    alt="Bumrungrad International Hospital"
                    srcset=""
                    className="rounded-lg max-sm:h-full  h-[350px] w-full"
                  />
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </section>
  );
}
