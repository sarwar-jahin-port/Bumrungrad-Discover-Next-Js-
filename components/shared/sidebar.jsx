"use client";

import React from "react";
import whatsapp from "@/public/assets/Bumrungrad  Hospital_whatsapp.png";
import telegram from "@/public/assets/Bumrungrad  Hospital_telegram.png";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SideBar() {
  const t = useTranslations("sidebar");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid white",
    borderRadius: "8px",
    boxShadow: 24,
    p: 2,
  };
  return (
    <div>
      <a
        href={`https://t.me/${encodeURIComponent("+66948283651")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          height={40}
          width={40}
          src={telegram}
          alt="Bumrungrad International Hospital"
          className="h-[40px] mt-1"
        />
      </a>
      <button onClick={handleOpen}>
        <Image
          height={40}
          width={40}
          src={whatsapp}
          alt="Bumrungrad International Hospital"
          className="h-[40px] mt-1"
        />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <a
            href="http://wa.me/+66948283651"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded flex gap-4 my-2 items-center p-2 hover:shadow-lg duration-300 ease-linear"
          >
            <Image
              height={40}
              width={40}
              src={whatsapp}
              alt="Bumrungrad International Hospital"
              className="h-[40px]"
            />
            <span className="text-blue font-semibold">{t("appointmentBooking")}</span>
          </a>
          <a
            href="http://wa.me/+66948283651"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded flex gap-4 my-2 items-center p-2 hover:shadow-lg duration-300 ease-linear"
          >
            <Image
              height={40}
              width={40}
              src={whatsapp}
              alt="Bumrungrad International Hospital"
              className="h-[40px]"
            />
            <span className="text-blue font-semibold">
              {t("medicalProcedureBooking")}
            </span>
          </a>
          <a
            href="http://wa.me/+66948283651"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded flex gap-4 my-2 items-center p-2 hover:shadow-lg duration-300 ease-linear"
          >
            <Image
              height={40}
              width={40}
              src={whatsapp}
              alt="Bumrungrad International Hospital"
              className="h-[40px]"
            />
            <span className="text-blue font-semibold">
              {t("medicalPackageBooking")}
            </span>
          </a>
          <a
            href="http://wa.me/+8801847284864"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded flex gap-4 my-2 items-center p-2 hover:shadow-lg duration-300 ease-linear"
          >
            <Image
              height={40}
              width={40}
              src={whatsapp}
              alt="Bumrungrad International Hospital"
              className="h-[40px]"
            />
            <span className="text-blue font-semibold">
              {t("talkWithVisaAdviser")}
            </span>
          </a>
        </Box>
      </Modal>
    </div>
  );
}
