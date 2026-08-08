/* =========================================================
   ABTALKS — GLOBAL APP
   ========================================================= */


/* ---------------------------------------------------------
   PAGE NAVIGATION
--------------------------------------------------------- */

function goTo(page) {

    window.location.href = page;
}


/* ---------------------------------------------------------
   BACK
--------------------------------------------------------- */

function goBack() {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        goTo("index.html");
    }
}


/* ---------------------------------------------------------
   BUTTON LOADING STATE
--------------------------------------------------------- */

function setButtonLoading(button, loading = true) {

    if (!button) return;

    if (loading) {

        button.dataset.originalText =
            button.innerHTML;

        button.classList.add("loading");

        button.disabled = true;

    } else {

        button.innerHTML =
            button.dataset.originalText || button.innerHTML;

        button.classList.remove("loading");

        button.disabled = false;
    }
}


/* ---------------------------------------------------------
   FORM VALIDATION
--------------------------------------------------------- */

function validateRequiredFields(form) {

    const inputs =
        form.querySelectorAll(
            "input[required], select[required], textarea[required]"
        );

    let valid = true;

    inputs.forEach(input => {

        if (!input.value.trim()) {

            input.style.borderColor =
                "var(--danger)";

            valid = false;

        } else {

            input.style.borderColor =
                "";
        }
    });

    return valid;
}


/* ---------------------------------------------------------
   URL VALIDATION
--------------------------------------------------------- */

function isValidURL(value) {

    try {

        new URL(value);

        return true;

    } catch {

        return false;
    }
}


/* ---------------------------------------------------------
   NOTIFICATION
--------------------------------------------------------- */

function showNotification(message, type = "success") {

    let notification =
        document.querySelector(".abtalks-notification");

    if (!notification) {

        notification =
            document.createElement("div");

        notification.className =
            "abtalks-notification";

        document.body.appendChild(
            notification
        );
    }

    notification.textContent = message;

    notification.dataset.type = type;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    }, 2800);
}


/* ---------------------------------------------------------
   UPDATE DATA
--------------------------------------------------------- */

function updateAppData(callback) {

    callback(appData);

    saveData(appData);
}


/* ---------------------------------------------------------
   LOGOUT
--------------------------------------------------------- */

function logout() {

    localStorage.removeItem(STORAGE_KEY);

    goTo("index.html");
}


/* ---------------------------------------------------------
   COMMON BACK BUTTONS
--------------------------------------------------------- */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-back]"
            );

        if (!button) return;

        goBack();
    }
);