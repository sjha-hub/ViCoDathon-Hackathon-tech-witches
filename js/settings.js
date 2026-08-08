/* =========================================================
   ABTALKS — SETTINGS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSettingsProfile();

        loadConnectedProfiles();

        setupPreferences();

        setupActions();

    }
);


/* ---------------------------------------------------------
   PROFILE
--------------------------------------------------------- */

function loadSettingsProfile() {

    const name =
        document.querySelector(
            "[data-student-name]"
        );

    const email =
        document.querySelector(
            "[data-student-email]"
        );


    if (name) {

        name.textContent =
            appData.student.name;
    }


    if (email) {

        email.textContent =
            appData.student.email;
    }
}


/* ---------------------------------------------------------
   CONNECTED PROFILES
--------------------------------------------------------- */

function loadConnectedProfiles() {

    const githubStatus =
        document.querySelector(
            "[data-github-status]"
        );

    const githubAction =
        document.querySelector(
            "[data-github-action]"
        );


    if (
        appData.github &&
        appData.github.connected
    ) {

        if (githubStatus) {

            githubStatus.textContent =
                `@${appData.github.username}`;
        }

        if (githubAction) {

            githubAction.textContent =
                "Manage";
        }
    }


    const linkedinStatus =
        document.querySelector(
            "[data-linkedin-status]"
        );

    const linkedinAction =
        document.querySelector(
            "[data-linkedin-action]"
        );


    if (
        appData.linkedin &&
        appData.linkedin.connected
    ) {

        if (linkedinStatus) {

            linkedinStatus.textContent =
                "Connected";
        }

        if (linkedinAction) {

            linkedinAction.textContent =
                "Manage";
        }
    }
}


/* ---------------------------------------------------------
   PREFERENCES
--------------------------------------------------------- */

function setupPreferences() {

    const reminder =
        document.querySelector(
            "#reminderToggle"
        );

    const streak =
        document.querySelector(
            "#streakToggle"
        );


    if (reminder) {

        const saved =
            localStorage.getItem(
                "abtalks_reminders"
            );

        if (saved !== null) {

            reminder.checked =
                saved === "true";
        }


        reminder.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "abtalks_reminders",
                    reminder.checked
                );

                showNotification(
                    reminder.checked
                        ? "Daily reminders enabled."
                        : "Daily reminders disabled."
                );
            }
        );
    }


    if (streak) {

        const saved =
            localStorage.getItem(
                "abtalks_streak_notifications"
            );

        if (saved !== null) {

            streak.checked =
                saved === "true";
        }


        streak.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "abtalks_streak_notifications",
                    streak.checked
                );

                showNotification(
                    streak.checked
                        ? "Streak notifications enabled."
                        : "Streak notifications disabled."
                );
            }
        );
    }
}


/* ---------------------------------------------------------
   ACTIONS
--------------------------------------------------------- */

function setupActions() {

    const github =
        document.querySelector(
            "[data-github-action]"
        );


    if (github) {

        github.addEventListener(
            "click",
            () => {

                goTo(
                    "github.html"
                );
            }
        );
    }


    const linkedin =
        document.querySelector(
            "[data-linkedin-action]"
        );


    if (linkedin) {

        linkedin.addEventListener(
            "click",
            () => {

                goTo(
                    "linkedin.html"
                );
            }
        );
    }


    const editProfile =
        document.querySelector(
            "[data-edit-profile]"
        );


    if (editProfile) {

        editProfile.addEventListener(
            "click",
            () => {

                goTo(
                    "coding_profiles.html"
                );
            }
        );
    }


    const logout =
        document.querySelector(
            "[data-logout]"
        );


    if (logout) {

        logout.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to log out?"
                    );


                if (confirmed) {

                    logout();
                }
            }
        );
    }
}