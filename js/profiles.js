/* =========================================================
   ABTALKS — CODING PROFILES
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.querySelector(
                "#codingProfileForm"
            );

        if (!form) return;


        /* -----------------------------------------
           Platform selection
        ----------------------------------------- */

        const platformCards =
            document.querySelectorAll(
                ".platform-card"
            );


        platformCards.forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    platformCards.forEach(
                        item =>
                            item.classList.remove(
                                "selected"
                            )
                    );

                    card.classList.add(
                        "selected"
                    );


                    const platform =
                        card.dataset.platform;


                    const hiddenInput =
                        form.querySelector(
                            '[name="platform"]'
                        );


                    if (hiddenInput) {

                        hiddenInput.value =
                            platform;
                    }
                }
            );
        });


        /* -----------------------------------------
           Submit
        ----------------------------------------- */

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !validateRequiredFields(
                        form
                    )
                ) {

                    showNotification(
                        "Please fill in the required details.",
                        "error"
                    );

                    return;
                }


                const formData =
                    new FormData(form);


                const profile = {

                    platform:
                        formData.get("platform"),

                    username:
                        formData.get("username"),

                    url:
                        formData.get("url")
                };


                updateAppData(data => {

                    const existing =
                        data.codingProfiles.find(
                            item =>
                                item.platform ===
                                profile.platform
                        );


                    if (existing) {

                        Object.assign(
                            existing,
                            profile
                        );

                    } else {

                        data.codingProfiles.push(
                            profile
                        );
                    }
                });


                showNotification(
                    "Coding profile saved."
                );


                setTimeout(() => {

                    goTo(
                        "linkedin.html"
                    );

                }, 600);
            }
        );


        renderSavedProfiles();
    }
);


/* ---------------------------------------------------------
   RENDER SAVED PROFILES
--------------------------------------------------------- */

function renderSavedProfiles() {

    const container =
        document.querySelector(
            "#savedProfiles"
        );

    if (!container) return;


    if (
        !appData.codingProfiles.length
    ) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    —
                </div>

                <h3>
                    No coding profiles yet
                </h3>

                <p>
                    Add your first coding profile
                    to continue.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML =
        appData.codingProfiles
            .map(profile => {

                return `
                    <div class="activity-item">

                        <div class="activity-dot"></div>

                        <div>

                            <strong>
                                ${profile.platform}
                            </strong>

                            <p>
                                ${profile.username}
                            </p>

                        </div>

                    </div>
                `;

            })
            .join("");
}