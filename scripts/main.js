function openModal(modalId) {
  console.log("Opening modal:", modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  } else {
    console.error("Modal not found:", modalId);
  }
}Ё

// Закрытие модального окна при клике на крестик
document.querySelectorAll(".close-modal").forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".modal").style.display = "none";
    document.body.classList.remove("modal-open");
  });
});

// Закрытие модального окна при клике вне его области
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

// Предотвращение закрытия модального окна при клике на его содержимое
document.querySelectorAll(".modal-content").forEach((content) => {
  content.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

// For integration with back-end part
// Listen for the "Więcej" button click to set the event name
document.querySelectorAll(".btn-outline").forEach((button) => {
  button.addEventListener("click", function () {
    const eventName = this.closest(".event-card").querySelector("h3").textContent;
    document.querySelector(".registration-form").setAttribute("data-event-name", eventName);
    openModal("modal-1"); // Open the form modal
  });
});

// Form Submission Functionality
document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.querySelector(".registration-form");

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission

      // Collect form data, including the event name
      const formData = {
        event_name: registrationForm.getAttribute("data-event-name") || "Unknown Event",
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone")?.value || null, // Optional field
        interest: document.getElementById("program")?.value || null // Optional field
      };

      // Send data to the back-end API
      fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert("Registration successful: " + data.message);
          } else if (data.error) {
            alert("Error: " + data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while submitting the form.");
        });
    });
  }
});

