/* Copperleaf Electrical - Part 3 JavaScript
   Service search, form validation, FAQ accordion, gallery lightbox */

document.addEventListener("DOMContentLoaded", function () {

    // ========== Service Search (Services page) ==========
    const searchInput = document.getElementById("serviceSearch");
    const clearSearchButton = document.getElementById("clearSearch");
    const servicesGrid = document.getElementById("servicesGrid");
    const searchMessage = document.getElementById("searchMessage");
    const noServicesMessage = document.getElementById("noServicesMessage");

    if (searchInput && servicesGrid && searchMessage && noServicesMessage) {
        const serviceCards = servicesGrid.querySelectorAll(".service-card");

        function searchServices() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            let visibleServices = 0;

            serviceCards.forEach(function (card) {
                const serviceText = card.textContent.toLowerCase();
                const matches = serviceText.includes(searchTerm);
                card.hidden = !matches;
                if (matches) {
                    visibleServices++;
                }
            });

            if (visibleServices === 0) {
                noServicesMessage.hidden = false;
                searchMessage.textContent = "Showing 0 services.";
            } else {
                noServicesMessage.hidden = true;
                searchMessage.textContent =
                    "Showing " + visibleServices + " of " +
                    serviceCards.length + " services.";
            }
        }

        searchInput.addEventListener("input", searchServices);

        if (clearSearchButton) {
            clearSearchButton.addEventListener("click", function () {
                searchInput.value = "";
                searchServices();
                searchInput.focus();
            });
        }
    }

    // ========== Enquiry Form Validation ==========
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        const fields = {
            name: document.getElementById("name"),
            email: document.getElementById("email"),
            phone: document.getElementById("phone"),
            service: document.getElementById("service"),
            message: document.getElementById("message")
        };

        const formFeedback = document.getElementById("formFeedback");

        function showError(field, message) {
            const errorElement = document.getElementById(field.id + "Error");
            if (errorElement) {
                errorElement.textContent = message;
            }
            field.setAttribute("aria-invalid", "true");
        }

        function clearError(field) {
            const errorElement = document.getElementById(field.id + "Error");
            if (errorElement) {
                errorElement.textContent = "";
            }
            field.removeAttribute("aria-invalid");
        }

        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;
            Object.values(fields).forEach(clearError);
            formFeedback.textContent = "";
            formFeedback.style.color = "";

            if (fields.name.value.trim().length < 2) {
                showError(fields.name, "Please enter your full name (at least 2 characters).");
                isValid = false;
            }

            if (!fields.email.validity.valid || fields.email.value.trim() === "") {
                showError(fields.email, "Please enter a valid email address.");
                isValid = false;
            }

            const phoneDigits = fields.phone.value.replace(/\D/g, "");
            if (
                !fields.phone.validity.valid ||
                phoneDigits.length < 9 ||
                phoneDigits.length > 15
            ) {
                showError(fields.phone, "Please enter a valid phone number (9–15 digits).");
                isValid = false;
            }

            if (fields.service.value === "") {
                showError(fields.service, "Please select a service.");
                isValid = false;
            }

            if (fields.message.value.trim().length < 10) {
                showError(
                    fields.message,
                    "Please describe your enquiry using at least 10 characters."
                );
                isValid = false;
            }

            if (!isValid) {
                formFeedback.textContent =
                    "Please correct the errors above before continuing.";
                formFeedback.style.color = "red";

                const firstInvalidField = enquiryForm.querySelector(
                    '[aria-invalid="true"]'
                );
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                return;
            }

            // Client-side only: show success message.
            // Real backends or Formspree / Netlify Forms would be needed for actual delivery.
            formFeedback.textContent =
                "Thank you! Your enquiry has been validated successfully. " +
                "We will contact you shortly regarding availability and pricing.";
            formFeedback.style.color = "green";

            enquiryForm.reset();
            Object.values(fields).forEach(clearError);
        });

        Object.values(fields).forEach(function (field) {
            if (field) {
                field.addEventListener("input", function () {
                    clearError(field);
                });
                field.addEventListener("change", function () {
                    clearError(field);
                });
            }
        });
    }

    // ========== Contact Form Validation ==========
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const contactFields = {
            name: document.getElementById("contact-name"),
            email: document.getElementById("contact-email"),
            phone: document.getElementById("contact-phone"),
            subject: document.getElementById("contact-subject"),
            message: document.getElementById("contact-message")
        };

        // Create feedback element if it does not exist
        let contactFeedback = document.getElementById("contactFormFeedback");
        if (!contactFeedback) {
            contactFeedback = document.createElement("p");
            contactFeedback.id = "contactFormFeedback";
            contactFeedback.setAttribute("role", "status");
            contactFeedback.setAttribute("aria-live", "polite");
            contactForm.appendChild(contactFeedback);
        }

        function showContactError(field, message) {
            let errorEl = document.getElementById(field.id + "Error");
            if (!errorEl) {
                errorEl = document.createElement("small");
                errorEl.id = field.id + "Error";
                errorEl.className = "error-message";
                field.insertAdjacentElement("afterend", errorEl);
            }
            errorEl.textContent = message;
            field.setAttribute("aria-invalid", "true");
        }

        function clearContactError(field) {
            const errorEl = document.getElementById(field.id + "Error");
            if (errorEl) {
                errorEl.textContent = "";
            }
            field.removeAttribute("aria-invalid");
        }

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;
            Object.values(contactFields).forEach(function (f) {
                if (f) clearContactError(f);
            });
            contactFeedback.textContent = "";
            contactFeedback.style.color = "";

            if (!contactFields.name || contactFields.name.value.trim().length < 2) {
                if (contactFields.name) {
                    showContactError(contactFields.name, "Please enter your full name.");
                }
                isValid = false;
            }

            if (
                !contactFields.email ||
                !contactFields.email.validity.valid ||
                contactFields.email.value.trim() === ""
            ) {
                if (contactFields.email) {
                    showContactError(contactFields.email, "Please enter a valid email address.");
                }
                isValid = false;
            }

            if (contactFields.phone) {
                const phoneDigits = contactFields.phone.value.replace(/\D/g, "");
                if (phoneDigits.length > 0 && (phoneDigits.length < 9 || phoneDigits.length > 15)) {
                    showContactError(contactFields.phone, "Please enter a valid phone number.");
                    isValid = false;
                }
            }

            if (contactFields.subject && contactFields.subject.value === "") {
                showContactError(contactFields.subject, "Please select a message type.");
                isValid = false;
            }

            if (
                !contactFields.message ||
                contactFields.message.value.trim().length < 10
            ) {
                if (contactFields.message) {
                    showContactError(
                        contactFields.message,
                        "Please write a message of at least 10 characters."
                    );
                }
                isValid = false;
            }

            if (!isValid) {
                contactFeedback.textContent =
                    "Please correct the errors above before sending.";
                contactFeedback.style.color = "red";
                const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Build a mailto link so the user can send the email from their own client.
            // This is a practical client-side approach when no backend is available.
            const recipient = "malokathakgalang6@gmail.com"; // update if needed
            const subjectText = contactFields.subject
                ? contactFields.subject.options[contactFields.subject.selectedIndex].text
                : "Website Contact Message";
            const body =
                "Name: " + contactFields.name.value.trim() + "\n" +
                "Email: " + contactFields.email.value.trim() + "\n" +
                (contactFields.phone ? "Phone: " + contactFields.phone.value.trim() + "\n" : "") +
                "Message type: " + subjectText + "\n\n" +
                contactFields.message.value.trim();

            const mailto =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent("Copperleaf Contact: " + subjectText) +
                "&body=" + encodeURIComponent(body);

            contactFeedback.textContent =
                "Validation successful. Opening your email client so you can send the message...";
            contactFeedback.style.color = "green";

            // Open the user's email client
            window.location.href = mailto;

            // Reset after a short delay so the user sees the success message
            setTimeout(function () {
                contactForm.reset();
                Object.values(contactFields).forEach(function (f) {
                    if (f) clearContactError(f);
                });
            }, 1500);
        });

        Object.values(contactFields).forEach(function (field) {
            if (field) {
                field.addEventListener("input", function () {
                    clearContactError(field);
                });
                field.addEventListener("change", function () {
                    clearContactError(field);
                });
            }
        });
    }

    // ========== FAQ Accordion ==========
    const faqQuestions = document.querySelectorAll(".faq-question");

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(function (button) {
            button.addEventListener("click", function () {
                const answer = button.nextElementSibling;
                const isExpanded = button.getAttribute("aria-expanded") === "true";

                // Close all other items (optional – single open accordion)
                faqQuestions.forEach(function (otherButton) {
                    if (otherButton !== button) {
                        otherButton.setAttribute("aria-expanded", "false");
                        const otherAnswer = otherButton.nextElementSibling;
                        if (otherAnswer) {
                            otherAnswer.hidden = true;
                        }
                        const icon = otherButton.querySelector("span");
                        if (icon) icon.textContent = "+";
                    }
                });

                // Toggle current item
                button.setAttribute("aria-expanded", !isExpanded);
                if (answer) {
                    answer.hidden = isExpanded;
                }
                const icon = button.querySelector("span");
                if (icon) {
                    icon.textContent = isExpanded ? "+" : "−";
                }
            });
        });
    }

    // ========== Gallery Lightbox ==========
    const galleryButtons = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightboxButton = document.getElementById("closeLightbox");

    if (lightbox && lightboxImage && closeLightboxButton) {
        galleryButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const image = button.querySelector("img");
                if (!image) return;

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt || "Enlarged gallery image";

                if (!lightbox.open) {
                    lightbox.showModal();
                }
            });
        });

        closeLightboxButton.addEventListener("click", function () {
            lightbox.close();
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.close();
            }
        });

        // Close with Escape key (native dialog behaviour usually handles this,
        // but we keep an explicit handler for older browsers)
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && lightbox.open) {
                lightbox.close();
            }
        });
    }

});
