/* =========================================================
   ABTALKS — GITHUB
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.querySelector(
                "#githubForm"
            );

        if (!form) return;


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
                        "Please complete the required fields.",
                        "error"
                    );

                    return;
                }


                const username =
                    form.querySelector(
                        '[name="githubUsername"]'
                    )?.value.trim();


                if (!username) {

                    showNotification(
                        "Enter your GitHub username.",
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


                setTimeout(() => {

                    updateAppData(data => {

                        data.github = {

                            connected: true,

                            username,

                            repositories:
                                Math.floor(
                                    Math.random() * 15
                                ) + 3,

                            commits:
                                Math.floor(
                                    Math.random() * 150
                                ) + 20,

                            contributions:
                                Math.floor(
                                    Math.random() * 300
                                ) + 50
                        };
                    });


                    setButtonLoading(
                        button,
                        false
                    );


                    renderGithubResult();


                    showNotification(
                        "GitHub profile connected."
                    );

                }, 900);
            }
        );


        if (
            appData.github.connected
        ) {

            renderGithubResult();
        }
    }
);


/* ---------------------------------------------------------
   RENDER
--------------------------------------------------------- */

function renderGithubResult() {

    const result =
        document.querySelector(
            "#githubResult"
        );

    if (!result) return;


    result.classList.remove(
        "hidden"
    );


    result.innerHTML = `

        <div class="activity-card">

            <div class="activity-header">

                <div>

                    <h3>
                        @${appData.github.username}
                    </h3>

                    <p>
                        GitHub account
                    </p>

                </div>

                <span class="activity-status">
                    ● Connected
                </span>

            </div>


            <div class="stats-grid">

                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.github.repositories}
                    </span>

                    <span class="stat-label">
                        Repositories
                    </span>

                </div>


                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.github.commits}
                    </span>

                    <span class="stat-label">
                        Commits
                    </span>

                </div>


                <div class="stat-card">

                    <span class="stat-value">
                        ${appData.github.contributions}
                    </span>

                    <span class="stat-label">
                        Contributions
                    </span>

                </div>

            </div>

        </div>
    `;
}