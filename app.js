"use strict";

// 1. Dynamic Appointment Booking System (With Confirmation Message)
// LocalStorage on page load for appointment.html
window.onload = function () {
  const savedData = JSON.parse(localStorage.getItem("appointmentData")) || {};
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const dateField = document.getElementById("date");
  const timeField = document.getElementById("time");
  const messageField = document.getElementById("message");

  // Only set values if elements exist
  if (nameField) nameField.value = savedData.name || "";
  if (emailField) emailField.value = savedData.email || "";
  if (phoneField) phoneField.value = savedData.phone || "";
  if (dateField) dateField.value = savedData.date || "";
  if (timeField) timeField.value = savedData.time || "";
  if (messageField) messageField.value = savedData.message || "";
};

// Appointment Form Handling
const form = document.getElementById("appointmentForm");
const modal = document.getElementById("confirmationModal");
const confirmBtn = document.getElementById("confirmBtn");
const editBtn = document.getElementById("editBtn");

// Validation function
function validateField(input) {
  const errorElement = document.getElementById(`${input.id}Error`);
  let isValid = true;

  if (!errorElement) return true;

  if (input.required && !input.value.trim()) {
    errorElement.textContent = `Please enter your ${input.name}.`;
    errorElement.style.display = "block";
    input.classList.add("input-error");
    isValid = false;
  } else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
    errorElement.textContent = "Please enter a valid email address.";
    errorElement.style.display = "block";
    input.classList.add("input-error");
    isValid = false;
  } else if (input.type === "tel" && !/^\d{10}$/.test(input.value.replace(/\D/g, ""))) {
    errorElement.textContent = "Please enter a 10-digit phone number.";
    errorElement.style.display = "block";
    input.classList.add("input-error");
    isValid = false;
  } else if (input.type === "date") {
    const selectedDate = new Date(input.value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!input.value || selectedDate < today) {
      errorElement.textContent = "Please select a future date.";
      errorElement.style.display = "block";
      input.classList.add("input-error");
      isValid = false;
    } else {
      errorElement.style.display = "none";
      input.classList.remove("input-error");
    }
  } else {
    errorElement.style.display = "none";
    input.classList.remove("input-error");
  }
  return isValid;
}

// Only run appointment logic if form exists
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");

    let isFormValid = true;
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false;
        console.log(`Validation failed for ${input.id}`);
      }
    });

    if (isFormValid) {
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        message: document.getElementById("message").value,
      };

      localStorage.setItem("appointmentData", JSON.stringify(formData));

      document.getElementById("modalName").textContent = formData.name;
      document.getElementById("modalEmail").textContent = formData.email;
      document.getElementById("modalPhone").textContent = formData.phone;
      document.getElementById("modalDate").textContent = formData.date;
      document.getElementById("modalTime").textContent = formData.time;
      document.getElementById("modalMessage").textContent = formData.message || "None";

      if (modal) modal.style.display = "flex";
    }
  });

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      alert("Appointment confirmed! We’ll contact you soon.");
      if (modal) modal.style.display = "none";
      form.reset();
      localStorage.removeItem("appointmentData");
    });
  }

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = document.getElementById(`${input.id}Error`);
      if (errorElement && errorElement.style.display === "block") {
        validateField(input);
      }
    });
  });
}

// 2. Dynamic Product and Service Filter/Search Feature
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const servicesList = document.getElementById("servicesList");
  const productsList = document.getElementById("productsList");
  const servicesSection = document.querySelector(".services");
  const productsSection = document.querySelector(".products");

  if (searchInput && categoryFilter && servicesList && productsList && servicesSection && productsSection) {
    function filterItems() {
      const searchText = searchInput.value.toLowerCase().trim();
      const selectedCategory = categoryFilter.value;

      // Filter Services
      const serviceItems = servicesList.querySelectorAll("li");
      let servicesVisible = false;
      serviceItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const matchesSearch = text.includes(searchText);
        const matchesCategory = selectedCategory === "all" || selectedCategory === "therapy";

        if (matchesSearch && matchesCategory) {
          item.style.display = "block";
          servicesVisible = true;
        } else {
          item.style.display = "none";
        }
      });
      servicesSection.style.display = servicesVisible ? "block" : "none";

      // Filter Products
      const productItems = productsList.querySelectorAll("li");
      let productsVisible = false;
      productItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const itemCategory = item.getAttribute("data-category");
        const matchesSearch = text.includes(searchText);
        const matchesCategory =
          selectedCategory === "all" ||
          selectedCategory === "products" ||
          (selectedCategory === "equipment" && itemCategory === "equipment");

        if (matchesSearch && matchesCategory) {
          item.style.display = "block";
          productsVisible = true;
        } else {
          item.style.display = "none";
        }
      });
      productsSection.style.display = productsVisible ? "block" : "none";
    }

    searchInput.addEventListener("input", filterItems);
    categoryFilter.addEventListener("change", filterItems);
    filterItems();
  }
});

