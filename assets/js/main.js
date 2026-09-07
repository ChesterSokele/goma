document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var header = document.querySelector(".site-header");

  function syncNavOffset() {
    if (header && nav) {
      nav.style.top = header.getBoundingClientRect().height + "px";
    }
  }
  syncNavOffset();
  window.addEventListener("resize", syncNavOffset);

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(contactForm);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString()
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Submission failed");
          contactForm.reset();
          formStatus.textContent = "Thank you — your message has been sent. We'll be in touch shortly.";
          formStatus.className = "form-status is-success";
          formStatus.hidden = false;
        })
        .catch(function () {
          formStatus.textContent = "Something went wrong sending your message. Please try again or email us directly.";
          formStatus.className = "form-status is-error";
          formStatus.hidden = false;
        });
    });
  }
});
