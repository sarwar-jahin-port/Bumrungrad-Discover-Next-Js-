export const metadata = {
  title: "Patient Stories | Bumrungrad Discover",
  description:
    "Read real stories from patients who traveled for care at Bumrungrad International Hospital, and share your own experience.",
};

import React from "react";
import PatientStories from "./PatientStories";

const PatientStoriesPage = () => {
  return (
    <div>
      <PatientStories />
    </div>
  );
};

export default PatientStoriesPage;
