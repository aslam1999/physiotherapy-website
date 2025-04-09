"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // 1. Appointment Booking System
  const form = document.getElementById("appointmentForm");
  const sortService = document.getElementById("sortService");
  const serviceInput = document.getElementById("serviceInput");
  const serviceDropdown = document.getElementById("serviceDropdown");
  const selectedItemsDiv = document.getElementById("selectedItems");
  const servicePriceInput = document.getElementById("servicePrice");
  const modal = document.getElementById("confirmationModal");
  const confirmBtn = document.getElementById("confirmBtn");
  const editBtn = document.getElementById("editBtn");

  const items = [
    { name: "Physical Therapy", price: 100, type: "service" },
    { name: "Manual and Manipulative Therapy", price: 120, type: "service" },
    { name: "Intramuscular Stimulation (IMS)", price: 110, type: "service" },
    { name: "Acupuncture", price: 90, type: "service" },
    { name: "Radial Shockwave Therapy", price: 130, type: "service" },
    { name: "Worksafe BC", price: 80, type: "service" },
    { name: "ICBC", price: 85, type: "service" },
    { name: "Treatment for TMJ Dysfunction", price: 115, type: "service" },
    { name: "Myofascial Release and Craniosacral Therapy", price: 105, type: "service" },
    { name: "Sports Therapy", price: 125, type: "service" },
    { name: "Athletic Taping/ Bracing", price: 95, type: "service" },
    { name: "Stability Balls", price: 25, type: "product" },
    { name: "Exercise Banding/Tubing", price: 15, type: "product" },
    { name: "Massage and Sports Creams", price: 20, type: "product" },
    { name: "Special Order Items", price: 50, type: "product" },
    { name: "Foam Rollers", price: 30, type: "product" },
    { name: "TENS Machines", price: 150, type: "product" },
    { name: "Rock Tape", price: 10, type: "product" }
  ];

  let selectedItems = [];
  let typingTimeout = null;

  function filterAndSortItems() {
    const inputText = serviceInput.value.trim().toLowerCase();
    const isPrice = !isNaN(parseFloat(inputText)) && isFinite(inputText);

    let filteredItems = items.filter(item => {
      if (isPrice) {
        return String(item.price).startsWith(inputText);
      } else {
        return item.name.toLowerCase().includes(inputText);
      }
    });

    const sortOrder = sortService.value;
    if (sortOrder === "low-to-high") {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    if (!inputText) {
      filteredItems = [...items];
      if (sortOrder === "low-to-high") {
        filteredItems.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "high-to-low") {
        filteredItems.sort((a, b) => b.price - a.price);
      }
    }

    return filteredItems;
  }

  function populateDropdown() {
    const filteredItems = filterAndSortItems();
    serviceDropdown.innerHTML = "";
    filteredItems.forEach(item => {
      const option = document.createElement("div");
      option.textContent = `${item.name} - $${item.price} (${item.type})`;
      option.addEventListener("click", () => {
        addSelectedItem(item);
        serviceInput.value = "";
        serviceDropdown.style.display = "none";
        clearError("serviceError");
        clearError("servicePriceError");
      });
      serviceDropdown.appendChild(option);
    });
    serviceDropdown.style.display = filteredItems.length > 0 ? "block" : "none";
  }

  function addSelectedItem(item) {
    if (!selectedItems.some(selected => selected.name === item.name)) {
      selectedItems.push(item);
      updateSelectedItemsDisplay();
      updateTotalPrice();
    }
  }

  function removeSelectedItem(itemName) {
    selectedItems = selectedItems.filter(item => item.name !== itemName);
    updateSelectedItemsDisplay();
    updateTotalPrice();
  }

  function updateSelectedItemsDisplay() {
    selectedItemsDiv.innerHTML = "";
    selectedItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "selected-item";
      div.innerHTML = `<span>${item.name} - $${item.price} (${item.type})</span>`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => removeSelectedItem(item.name));
      div.appendChild(removeBtn);
      selectedItemsDiv.appendChild(div);
    });
  }

  function updateTotalPrice() {
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    servicePriceInput.value = total > 0 ? `$${total}` : "";
  }

  function updateFromManualInput() {
    const inputText = serviceInput.value.trim().toLowerCase();
    const isPrice = !isNaN(parseFloat(inputText)) && isFinite(inputText);
    let matchedItem = null;

    if (isPrice) {
      matchedItem = items.find(item => item.price === parseFloat(inputText));
    } else {
      matchedItem = items.find(item => item.name.toLowerCase() === inputText);
    }

    if (matchedItem) {
      addSelectedItem(matchedItem);
      serviceInput.value = "";
      clearError("serviceError");
      clearError("servicePriceError");
    }
  }

  if (serviceInput) {
    serviceInput.addEventListener("input", () => {
      clearTimeout(typingTimeout);
      populateDropdown();
      typingTimeout = setTimeout(updateFromManualInput, 500);
    });

    serviceInput.addEventListener("focus", populateDropdown);

    serviceInput.addEventListener("blur", () => {
      setTimeout(() => {
        serviceDropdown.style.display = "none";
        updateFromManualInput();
      }, 200);
    });
  }

  if (sortService) {
    sortService.addEventListener("change", populateDropdown);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        showModal();
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      modal.style.display = "none";
      alert("Appointment booked successfully!");
      form.reset();
      selectedItems = [];
      updateSelectedItemsDisplay();
      servicePriceInput.value = "";
      serviceDropdown.style.display = "none";
      sortService.value = "default";
    });
  }

  if (editBtn) {
    editBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  function validateForm() {
    let isValid = true;

    const name = document.getElementById("name")?.value.trim();
    if (!name) {
      showError("nameError", "Please enter your full name.");
      isValid = false;
    } else {
      clearError("nameError");
    }

    const email = document.getElementById("email")?.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("emailError", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError("emailError");
    }

    const phone = document.getElementById("phone")?.value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      showError("phoneError", "Please enter a valid 10-digit phone number.");
      isValid = false;
    } else {
      clearError("phoneError");
    }

    if (selectedItems.length === 0) {
      showError("serviceError", "Please add at least one service/product.");
      isValid = false;
    } else {
      clearError("serviceError");
    }

    const price = servicePriceInput?.value;
    if (!price) {
      showError("servicePriceError", "Total price not available.");
      isValid = false;
    } else {
      clearError("servicePriceError");
    }

    const date = document.getElementById("date")?.value;
    const today = new Date("2025-04-07");
    const selectedDate = new Date(date);
    if (!date || selectedDate <= today) {
      showError("dateError", "Please select a future date.");
      isValid = false;
    } else {
      clearError("dateError");
    }

    const time = document.getElementById("time")?.value;
    if (!time) {
      showError("timeError", "Please select a time.");
      isValid = false;
    } else {
      clearError("timeError");
    }

    return isValid;
  }

  function showError(id, message) {
    const errorDiv = document.getElementById(id);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }

  function clearError(id) {
    const errorDiv = document.getElementById(id);
    if (errorDiv) {
      errorDiv.textContent = "";
      errorDiv.style.display = "none";
    }
  }

  function showModal() {
    document.getElementById("modalName").textContent = document.getElementById("name").value;
    document.getElementById("modalEmail").textContent = document.getElementById("email").value;
    document.getElementById("modalPhone").textContent = document.getElementById("phone").value;
    document.getElementById("modalService").textContent = selectedItems.map(item => `${item.name} ($${item.price})`).join(", ") || "None";
    document.getElementById("modalPrice").textContent = servicePriceInput.value || "Not available";
    document.getElementById("modalDate").textContent = document.getElementById("date").value;
    document.getElementById("modalTime").textContent = document.getElementById("time").value;
    document.getElementById("modalMessage").textContent = document.getElementById("message").value || "None";
    modal.style.display = "flex";
  }

  // 2. Product and Service Filter/Search Feature
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const servicesTable = document.getElementById("servicesTable");
  const productsTable = document.getElementById("productsTable");

  if (servicesTable && productsTable) {
    const services = Array.from(servicesTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));
    const products = Array.from(productsTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));

    const originalServices = services.map(row => row.cloneNode(true));
    const originalProducts = products.map(row => row.cloneNode(true));

    function filterAndSortItems() {
      const searchText = searchInput.value.toLowerCase().trim();
      const category = categoryFilter.value;
      const sortOrder = sortFilter.value;
      const minPrice = parseFloat(minPriceInput.value) || 0;
      const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

      let filteredServices = services.filter(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const price = parseFloat(row.dataset.price);
        const matchesSearch = name.includes(searchText);
        const matchesCategory = category === "all" || category === "therapy";
        const matchesPrice = price >= minPrice && price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
      });

      let filteredProducts = products.filter(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const price = parseFloat(row.dataset.price);
        const matchesSearch = name.includes(searchText);
        const matchesCategory =
          category === "all" ||
          (category === "equipment" && row.dataset.category?.includes("equipment")) ||
          (category === "products");
        const matchesPrice = price >= minPrice && price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
      });

      if (sortOrder === "low-to-high") {
        filteredServices.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        filteredProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      } else if (sortOrder === "high-to-low") {
        filteredServices.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        filteredProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
      } else {
        filteredServices = originalServices.filter(row => {
          const name = row.cells[0].textContent.toLowerCase();
          const price = parseFloat(row.dataset.price);
          const matchesSearch = name.includes(searchText);
          const matchesCategory = category === "all" || category === "therapy";
          const matchesPrice = price >= minPrice && price <= maxPrice;
          return matchesSearch && matchesCategory && matchesPrice;
        });
        filteredProducts = originalProducts.filter(row => {
          const name = row.cells[0].textContent.toLowerCase();
          const price = parseFloat(row.dataset.price);
          const matchesSearch = name.includes(searchText);
          const matchesCategory =
            category === "all" ||
            (category === "equipment" && row.dataset.category?.includes("equipment")) ||
            (category === "products");
          const matchesPrice = price >= minPrice && price <= maxPrice;
          return matchesSearch && matchesCategory && matchesPrice;
        });
      }

      const servicesTbody = servicesTable.querySelector("tbody");
      const productsTbody = productsTable.querySelector("tbody");
      servicesTbody.innerHTML = "";
      productsTbody.innerHTML = "";
      filteredServices.forEach(row => servicesTbody.appendChild(row.cloneNode(true)));
      filteredProducts.forEach(row => productsTbody.appendChild(row.cloneNode(true)));
    }

    searchInput.addEventListener("input", filterAndSortItems);
    categoryFilter.addEventListener("change", filterAndSortItems);
    sortFilter.addEventListener("change", filterAndSortItems);
    minPriceInput.addEventListener("input", filterAndSortItems);
    maxPriceInput.addEventListener("input", filterAndSortItems);

    filterAndSortItems();
  }

  // 3. Team Collapsible Logic
  // ... (unchanged appointment and product/service logic) ...

// Team Collapsible Logic
const collapsibles = document.getElementsByClassName("collapsible");
for (let i = 0; i < collapsibles.length; i++) {
  collapsibles[i].addEventListener("click", function () {
    const wasActive = this.classList.contains("active");
    const content = this.nextElementSibling;

    // Close all other sections first
    for (let j = 0; j < collapsibles.length; j++) {
      if (collapsibles[j] !== this) {
        collapsibles[j].classList.remove("active");
        collapsibles[j].nextElementSibling.style.maxHeight = null;
      }
    }

    // Toggle the clicked section
    this.classList.toggle("active");
    if (wasActive) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// ... (unchanged mobile navigation logic) ...

  //Mobile Navigation Logic
  const hamburger = document.querySelector(".hamburger");
  const navMobile = document.getElementById("navigation-mobile");

  if (hamburger && navMobile) {
    hamburger.addEventListener("click", function () {
      navMobile.classList.toggle("show-items");
      navMobile.style.width = navMobile.classList.contains("show-items") ? "100%" : "0";
    });

    const navLinks = navMobile.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("show-items");
        navMobile.style.width = "0";
      });
    });
  }
});
