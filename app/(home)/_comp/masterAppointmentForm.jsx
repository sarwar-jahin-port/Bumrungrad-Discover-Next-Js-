"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

const FieldGroup = ({ title, children }) => (
  <fieldset className="border border-ash/30 rounded-lg p-5">
    <legend className="px-2 font-semibold text-blue">{title}</legend>
    <div className="grid md:grid-cols-2 gap-4 mt-2">{children}</div>
  </fieldset>
);

const Label = ({ children }) => (
  <label className="text-sm font-semibold mb-1 block">{children}</label>
);

const inputClass =
  "w-full border border-ash/40 rounded px-3 py-2 focus:outline-none focus:border-blue bg-white";

const FileField = ({ label, file, onChange }) => (
  <div>
    <Label>{label}</Label>
    <label className="flex items-center gap-2 border border-dashed border-ash/50 rounded px-3 py-2 cursor-pointer hover:bg-cream/50">
      <AiOutlineCloudUpload className="text-blue text-xl shrink-0" />
      <span className="text-sm text-black/70 truncate">
        {file ? file.name : "Choose a file..."}
      </span>
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  </div>
);

const MasterAppointmentForm = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [packages, setPackages] = useState([]);

  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [caseType, setCaseType] = useState("New Case File Entry");
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  const [pkg, setPkg] = useState("");
  const [concern, setConcern] = useState("");
  const [primaryDate, setPrimaryDate] = useState("");
  const [backupDate, setBackupDate] = useState("");
  const [dob, setDob] = useState("");
  const [passport, setPassport] = useState(null);
  const [clinicalRecords, setClinicalRecords] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/specialty")
      .then((res) => res.json())
      .then((data) => setSpecialties(data?.response?.data || []))
      .catch(() => {});

    fetch("http://127.0.0.1:8000/api/get/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data?.response?.data || []))
      .catch(() => {});

    fetch("http://127.0.0.1:8000/api/get/package")
      .then((res) => res.json())
      .then((data) => setPackages(data?.data || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const formData = new FormData();
    formData.append("PataientFirstName", firstName || "");
    formData.append("PataientLastName", lastName || "");
    formData.append("PataientPhone", whatsapp);
    formData.append("PataientEmail", email);
    formData.append("country", countryOfOrigin);
    formData.append("countryOfResidence", countryOfResidence);
    formData.append("oldPataint", caseType);
    formData.append("specialty", specialty);
    formData.append("doctor", doctor);
    formData.append("package", pkg);
    formData.append("medicalDesc", concern);
    formData.append("selectedDate", primaryDate);
    formData.append("selectedDate2", backupDate);
    formData.append("PataientDob", dob);
    if (passport) formData.append("passport", passport);
    if (clinicalRecords) formData.append("medicalReport1", clinicalRecords);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/add/doctor/appointment", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setLoader(false);
      if (data.status === 200) {
        toast.success("Your appointment request has been submitted. Our team will contact you shortly.");
        setFullName("");
        setWhatsapp("");
        setEmail("");
        setCountryOfOrigin("");
        setCountryOfResidence("");
        setCaseType("New Case File Entry");
        setSpecialty("");
        setDoctor("");
        setPkg("");
        setConcern("");
        setPrimaryDate("");
        setBackupDate("");
        setDob("");
        setPassport(null);
        setClinicalRecords(null);
        e.target.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setLoader(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-5 my-10 md:my-20 md:container md:mx-auto">
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-blue mb-3">
        Book Your Appointment
      </h2>
      <p className="text-center text-black/70 mb-10 max-w-2xl mx-auto">
        Tell us about your medical needs and preferred schedule, and our
        international patient coordination team will confirm your
        appointment with Bumrungrad International Hospital.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl mx-auto">
        <FieldGroup title="Your Contact Information">
          <div>
            <Label>Full Name *</Label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>WhatsApp Number *</Label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Email Address *</Label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Country of Origin *</Label>
            <input
              type="text"
              required
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Country of Residence *</Label>
            <input
              type="text"
              required
              value={countryOfResidence}
              onChange={(e) => setCountryOfResidence(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Patient Status *</Label>
            <div className="flex gap-3 mt-1">
              {["New Case File Entry", "Returning Case Record"].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setCaseType(option)}
                  className={`px-3 py-2 rounded text-sm border ${
                    caseType === option
                      ? "bg-blue text-white border-blue"
                      : "bg-white text-black border-ash/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </FieldGroup>

        <FieldGroup title="Medical Details">
          <div>
            <Label>Target Medical Specialty *</Label>
            <select
              required
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className={inputClass}
            >
              <option value="">Select a specialty</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Preferred Physician (optional)</Label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className={inputClass}
            >
              <option value="">No preference</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Intended Screening/Diagnostic Package (optional)</Label>
            <select value={pkg} onChange={(e) => setPkg(e.target.value)} className={inputClass}>
              <option value="">No package selected</option>
              {packages.map((p) => (
                <option key={p.id} value={p.title}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label>Medical Concern / Symptoms *</Label>
            <textarea
              required
              rows={4}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className={inputClass}
            />
          </div>
        </FieldGroup>

        <FieldGroup title="Scheduling">
          <div>
            <Label>Primary Desired Appointment Date *</Label>
            <input
              type="date"
              required
              value={primaryDate}
              onChange={(e) => setPrimaryDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Secondary Backup Appointment Date *</Label>
            <input
              type="date"
              required
              value={backupDate}
              onChange={(e) => setBackupDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Patient Date of Birth *</Label>
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </div>
        </FieldGroup>

        <FieldGroup title="Documents">
          <FileField
            label="Passport Document Scan *"
            file={passport}
            onChange={(e) => setPassport(e.target.files[0])}
          />
          <FileField
            label="Previous Clinical Records *"
            file={clinicalRecords}
            onChange={(e) => setClinicalRecords(e.target.files[0])}
          />
        </FieldGroup>

        <button
          type="submit"
          disabled={loader}
          className="px-6 py-3 bg-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 w-fit mx-auto"
        >
          {loader ? "Submitting..." : "Submit Appointment Request"}
        </button>
      </form>
    </div>
  );
};

export default MasterAppointmentForm;
