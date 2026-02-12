// FORM & ELEMENTS
const form = document.getElementById("userForm");

const inputs = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  email: document.getElementById("email"),
  age: document.getElementById("age"),
  description: document.getElementById("description"),
};

//HELPERS
const getSelectedValues = (name) => {
  const nodes = document.querySelectorAll(`input[name="${name}"]:checked`);
  const array = Array.from(nodes);
  return array.map((element) => element.value);
};
// SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.clear();

  const errors = [];

  // Collect all trimmed values dynamically
  const values = {};
  for (let key in inputs) {
    values[key] = getTrimValue(inputs[key]);
  }

  const { firstName, lastName, email, age, description } = values;

  const selectedSubjects = getSelectedValues("subject");
  const selectedGender = getSelectedValues("gender")[0];

  // Field validation rules (for repeated pattern checks)
  const fieldValidations = [
    {
      value: firstName,
      name: "First Name",
      pattern: /^[A-Za-z0-9 ]+$/,
    },
    {
      value: lastName,
      name: "Last Name",
      pattern: /^[A-Za-z][A-Za-z0-9 ]*$/,
    },
    {
      value: email,
      name: "Email",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  ];

  // Loop validation
  fieldValidations.forEach((field) => {
    if (!field.value) {
      errors.push(`${field.name} is required`);
    } else if (!field.pattern.test(field.value)) {
      errors.push(`${field.name} is not valid`);
    }
  });

  //  Special validations
  if (!age) {
    errors.push("Age is required");
  } else if (isNaN(age) || age <= 18 || age > 100) {
    errors.push("Age is not valid");
  }

  if (selectedSubjects.length < 3) {
    errors.push("Select at least 3 subjects");
  }

  if (!selectedGender) {
    errors.push("Select gender");
  }

  if (description && (description.length < 10 || description.length > 100)) {
    errors.push("Description must be between 10 and 100 characters");
  }

  //  RESULT 
  if (errors.length) {
    errors.forEach((error) => console.log(error));
    return;
  }

  const user = {
    ...values,
    age: Number(age),
    subjectsCount: selectedSubjects.length,
    selectedSubjects,
    gender: selectedGender,
    description: description || "N/A",
  };

  console.log("Validation Passed");
  console.log("User Object:", user);
});
