import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const AirtTcket = () => {
  //loader
  const [loader, setLoader] = useState();
  //Input field states
  const [flydate, setFlydate] = useState("");
  const [returndate, setReturndate] = useState("");
  const [passport, setPassport] = useState("");
  const [country, setCountry] = useState("");
  const [destination, setDestination] = useState("");

  //data state
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("countries.json")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const handaleAirTicket = (event) => {
    setLoader(true);
    event.preventDefault();
    const form = event.target;

    const formData = new FormData();
    formData.append("booking_date", flydate);
    formData.append("return_date", returndate);
    formData.append("doc", passport);
    formData.append("country", country);
    formData.append("destination", destination);

    fetch("http://127.0.0.1:8000/api/add/air/ticket", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLoader(false);
          window.location.reload();
          alert(
            "Air Ticket request sent! Our support team will contact you soon."
          );
        }
      })
      .catch((error) => console.error(error));

    form.reset();
  };
  return (
    <div>
      <form
        onSubmit={handaleAirTicket}
        className="mb-2 md:w-full max-w-screen-lg sm:w-96"
      >
        <div className="mb-2 flex flex-col gap-3">
          <div>
            <p className="mb-2.5 font-semibold text-sm">Enter Your Fly Date</p>
            <TextField
              type="date"
              onChange={(e) => setFlydate(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div>
            <p className="mb-2.5 font-semibold text-sm">
              Enter Your Return Date
            </p>
            <TextField
              type="date"
              onChange={(e) => setReturndate(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div>
            <p className="mb-1.5 font-semibold text-sm">
              Attach Your Passport Copy
            </p>
            <TextField
              type="file"
              onChange={(e) => setPassport(e.target.files[0])}
              fullWidth
              required
            />
          </div>
          <div>
            <p className="mb-1.5 font-semibold text-sm">From Country</p>
            <TextField
              id="filled-select-currency-native"
              select
              fullWidth
              onChange={(e) => setCountry(e.target.value)}
              required
              SelectProps={{
                native: true,
              }}
              helperText="Please select your country"
            >
              {countries.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </div>

          <div>
            <p className="mb-1.5 font-semibold text-sm">To Country</p>
            <TextField
              id="filled-select-currency-native"
              select
              fullWidth
              onChange={(e) => setDestination(e.target.value)}
              required
              SelectProps={{
                native: true,
              }}
              helperText="Please select your country"
            >
              {countries.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue text-white px-3 py-1 rounded float-left mt-3"
            >
              {loader ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <p className="font-semibold text-blue text-center">
            If you need Hotel Accomodation please contact us via WhatsApp
          </p>
          <a
            href="http://wa.me/+8801847284867"
            target="_blank"
            rel="noopener noreferrer"
            alt="whatsApp"
          >
            <div className="flex items-center p-2.5 shadow w-fit justify-center gap-2 mt-2">
              <WhatsAppIcon className="text-green" />
              <p className="font-semibold">Click Here</p>
            </div>
          </a>
        </div>
      </form>
    </div>
  );
};

export default AirtTcket;
