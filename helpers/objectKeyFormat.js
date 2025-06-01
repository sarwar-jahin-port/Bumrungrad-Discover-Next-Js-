// Improved key formatting function
export const formatKeys = (obj) => {
  const formattedObj = {};

  for (const key in obj) {
    if (!obj[key]) continue;

    // Custom mapping for specific keys
    const keyMappings = {
      healtePackage: "Preferred Health Package",
      appoinMentDate: "Preferred Appointment Date",
      appoinMentTime: "Preferred Appointment Time",
      prefferdDoctor: "Preferred Doctor",
      HnNumber: "Hospital Number (HN)",
      other_doc: "Other Document",
      hnNum: "Hospital Number (HN)",
    };

    if (keyMappings[key]) {
      formattedObj[keyMappings[key]] = obj[key];
      continue;
    }

    // Generic formatting for other keys
    const formattedKey = key
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handle consecutive caps (e.g. "HNNumber")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    formattedObj[formattedKey] = obj[key];
  }

  return formattedObj;
};

// Specify the keys you want to remove

// const fields = {
//   inquery: '',
//   doctorName: 'Dr. Smith',
//   treatmentInterest: '',
//   question: 'What is the treatment?',
//   hospitalNumber: null,
//   firstName: 'John',
//   lastName: 'Doe',
//   email: '',
//   phoneNumber: undefined,
//   birtDate: '',
//   gender: 'Male',
//   citizenship: '',
//   country: ''
// };

// Function to format keys and remove specific keys
export const formatKeysWithRemoveKeys = (obj, keysToRemove) => {
  const formattedObj = {};

  for (const key in obj) {
    if (!obj[key]) continue;

    // Custom mapping for specific keys
    const keyMappings = {
      shift: "Shift 1",
      shift2: "Shift 2",
      selectedDate: "Selected Date 1",
      selectedDate2: "Selected Date 2",
      hnNumber: "Hospital Number (HN)",
      PataientFirstName: "Patient First Name",
      PataientLastName: "Patient Last Name",
      PataientCitizenship: "Patient Citizenship",
      PataientGender: "Patient Gender",
      PataientPhoneNumber: "Patient Phone Number",
      PataientEmail: "Patient Email",
      PataientDob: "Patient Date of Birth",
      desc: "Medical Concern",
    };

    if (keyMappings[key]) {
      formattedObj[keyMappings[key]] = obj[key];
      continue;
    }

    // Generic formatting for other keys
    const formattedKey = key
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handle consecutive caps (e.g. "HNNumber")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    formattedObj[formattedKey] = obj[key];
  }

  return formattedObj;
};

// Specify the keys you want to remove
// const keysToRemove = ['email', 'birtDate', 'phoneNumber'];

// const formattedFields = formatKeys(fields, keysToRemove);
