/* =========================================================
   ABTALKS — LINKEDIN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.querySelector(
                "#linkedinForm"
            );

        if (!form) return;


        /* -----------------------------------------
           Existing profile
        ----------------------------------------- */

        if (
            appData.linkedin.connected &&
            appData.linkedin.url
        ) {

            renderLinkedInResult();
        }


        /* -----------------------------------------
           Submit URL
        ----------------------------------------- */

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const url =
                    form.querySelector(
                        '[name="linkedinUrl"]'
                    )?.value.trim();


                if (!url) {

                    showNotification(
                        "Enter your LinkedIn URL.",
                        "error"
                    );

                    return;
                }


                if (
                    !url.includes(
                        "linkedin.com"
                    )
                ) {

                    showNotification(
                        "Please enter a valid LinkedIn URL.",
                        "error"
                    );

                    return;
                }


                const button =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                setButtonLoading(
                    button,
                    true
                );


                /*
                   Simulated fetch
                */

                setTimeout(() => {

                    updateAppData(data => {

                        data.linkedin = {

                            connected: true,

                            url: url,

                            posts:
                                Math.floor(
                                    Math.random() * 80
                                ) + 10,

                            certifications:
                                Math.floor(
                                    Math.random() * 8
                                ),

                            skills:
                                Math.floor(
                                    Math.random() * 20
                                ) + 5,

                            followers:
                                Math.floor(
                                    Math.random() * 900
                                ) + 100
                        };
                    });


                    setButtonLoading(
                        button,
                        false
                    );


                    renderLinkedInResult();


                    showNotification(
                        "LinkedIn profile connected."
                    );

                }, 900);
            }
        );
    }
);


/* ---------------------------------------------------------
   RENDER RESULT
--------------------------------------------------------- */

function renderLinkedInResult() {

    const result =
        document.querySelector(
            "#linkedinResult"
        );

    if (!result) return;


    result.classList.remove(
        "hidden"
    );


    result.innerHTML = `

        <div class="linkedin-profile-card">

            <div class="profile-summary">

                <div class="large-avatar">
                    ${appData.student.avatar}
                </div>

                <div>

                    <h3>
                        ${appData.student.name}
                    </h3>

                    <p>
                        LinkedIn profile
                    </p>

                    <span class="verified-status">
                        ● Connected
                    </span>

                </div>

            </div>


            <div class="stats-grid">

                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.linkedin.posts}
                    </span>

                    <span class="stat-label">
                        Posts
                    </span>

                </div>


                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.linkedin.certifications}
                    </span>

                    <span class="stat-label">
                        Certifications
                    </span>

                </div>


                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.linkedin.skills}
                    </span>

                    <span class="stat-label">
                        Skills
                    </span>

                </div>


                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.linkedin.followers}
                    </span>

                    <span class="stat-label">
                        Followers
                    </span>

                </div>

            </div>

        </div>
    `;
}