// =====================
// Main JS Functionality
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Carousel Auto Sliding
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  function showSlide(index) {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  if (carousel && slides.length > 0) {
    showSlide(currentIndex);
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 3000);
  }

  // Toast Notification Utility
  function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `popup-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Contact Form
  const contactForm = document.querySelector(".contact-form");
  contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !subject || !message) {
      showToast("Please fill in all contact fields.", "error");
      return;
    }

    contactForm.reset();
    showToast("Message sent successfully!", "success");
  });

  // Symptom Checker
  const symptomForm = document.querySelector(".symptom-form");
  const outputBox = document.getElementById("ai-output");
  const suggestionsList = document.getElementById("suggestions");

  symptomForm?.addEventListener("submit", e => {
    e.preventDefault();
    const symptomsInput = document.getElementById("symptoms").value.trim();

    if (!symptomsInput) {
      showToast("Please enter your symptoms.", "error");
      return;
    }

    const dummyConditions = [
      "Common Cold",
      "Seasonal Flu",
      "COVID-19",
      "Migraine",
      "Sinus Infection"
    ];

    suggestionsList.innerHTML = "";
    dummyConditions.forEach(condition => {
      const li = document.createElement("li");
      li.textContent = condition;
      suggestionsList.appendChild(li);
    });

    outputBox.classList.remove("hidden");
    showToast("Symptoms analyzed successfully!", "success");
  });

  // Medicine Reminder
  const reminderForm = document.querySelector(".reminder-form");
  const reminderList = document.getElementById("reminders");
  const reminderBox = document.getElementById("reminder-list");

  reminderForm?.addEventListener("submit", e => {
    e.preventDefault();
    const medName = document.getElementById("med-name").value.trim();
    const dosage = document.getElementById("dosage").value.trim();
    const time = document.getElementById("time").value;

    if (!medName || !dosage || !time) {
      showToast("Please fill in all reminder fields.", "error");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `<strong>${medName} (${dosage})</strong> at ${time}`;
    reminderList.appendChild(li);

    reminderForm.reset();
    reminderBox.classList.remove("hidden");
    showToast("Reminder added successfully!", "success");
  });

  // Appointment Form
  const appointmentForm = document.querySelector(".appointment-form");
  const confirmationBox = document.getElementById("confirmation");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split("T")[0];
    dateInput.setAttribute("min", minDate);
  }

  appointmentForm?.addEventListener("submit", e => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const speciality = document.getElementById("speciality").value;
    const date = dateInput.value;
    const time = timeInput.value;

    if (!fullname || !email || !speciality || !date || !time) {
      showToast("Please complete all appointment fields.", "error");
      return;
    }

    const selectedDate = new Date(date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (selectedDate <= now) {
      showToast("Please select a future date for the appointment.", "error");
      return;
    }

    confirmationBox.classList.remove("hidden");
    appointmentForm.reset();
    showToast("Appointment booked successfully!", "success");
  });

  // Date & Time Picker Activation Fix
  if (typeof dateInput?.showPicker === "function") {
    dateInput.addEventListener("mousedown", e => {
      e.preventDefault();
      dateInput.showPicker();
    });
  }

  if (typeof timeInput?.showPicker === "function") {
    timeInput.addEventListener("mousedown", e => {
      e.preventDefault();
      timeInput.showPicker();
    });
  }
});

