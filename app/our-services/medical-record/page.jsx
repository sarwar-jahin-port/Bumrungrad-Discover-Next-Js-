import React from "react";
import MedicalRecords from "./_comp/medicalRecords";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export const metadata = {
  title: "Bumrungrad Hospital: Explore The Accreditation & Awards",
  description:
    "Discover Bumrungrad International Hospital's Accolades. Elevate your health journey with excellence at our hospital. Explore now! #BumrungradHospital",
  alternates: {
    canonical: "https://discoverinternationalmedicalservice.com/medical-record",
  },
  charset: "utf-8",
};

const page = () => {
  return (
    <ProtectedRoute>
      <MedicalRecords />
    </ProtectedRoute>
  );
};

export default page;
