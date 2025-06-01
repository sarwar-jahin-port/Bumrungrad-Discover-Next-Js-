import React, { useState } from "react";

import { TextField } from "@mui/material";
const AirAmbulanceForm = () => {
  //loader
  const [loader, setLoader] = useState();

  const [date, setDate] = useState("");
  const [passport, setPassport] = useState("");
  const [caseSummary, setCaseSummary] = useState("");
  const [briflyDiscusion, setbriflyDiscusion] = useState("");

  const addPatient = (event) => {
    setLoader(true);
    event.preventDefault();
    const form = event.target;

    const formData = new FormData();
    formData.append("entry_date", date);
    formData.append("passport_copy", passport);
    formData.append("summary", caseSummary);
    formData.append("description", briflyDiscusion);

    fetch(
      "https://api.discoverinternationalmedicalservice.com/api/add/air/ambulance",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLoader(false);
          window.location.reload();
          alert(
            "Air Ambulance request sent! Our support team will contact you soon."
          );
        }
      })
      .catch((error) => console.error(error));

    form.reset();
  };
  return (
    <div>
      <form
        onSubmit={addPatient}
        className="mt-3 mb-2 md:w-full max-w-screen-lg sm:w-96"
      >
        <div className="mb-2 flex flex-col gap-6">
          <div className="">
            <p className="mb-2 font-semibold text-sm">Enter Date</p>
            <TextField
              type="date"
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="mt-1">
            <p className="mb-1 font-semibold text-sm">
              Attach Your Passport Copy
            </p>
            <TextField
              type="file"
              onChange={(e) => setPassport(e.target.files[0])}
              fullWidth
              required
            />
          </div>
          <div className="mt-1">
            <p className="mb-2 font-semibold text-sm">Upload Case Summary</p>
            <TextField
              multiline
              onChange={(e) => setCaseSummary(e.target.value)}
              rows={2}
              fullWidth
            />
          </div>
          <div className="mt-1">
            <p className="mb-2 font-semibold text-sm">Write In Briefly</p>
            <TextField
              multiline
              onChange={(e) => setbriflyDiscusion(e.target.value)}
              rows={2}
              fullWidth
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue text-white px-3 py-1 rounded float-left mt-3"
        >
          {loader ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AirAmbulanceForm;
