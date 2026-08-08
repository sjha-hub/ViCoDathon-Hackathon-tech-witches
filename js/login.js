/* =========================================================
   ABTALKS — LOGIN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const loginForm =
            document.querySelector("#loginForm");

        if (!loginForm) return;


        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !validateRequiredFields(
                        loginForm
                    )
                ) {

                    showNotification(
                        "Please complete all fields.",
                        "error"
                    );

                    return;
                }


                const button =
                    loginForm.querySelector(
                        'button[type="submit"]'
                    );


                setButtonLoading(
                    button,
                    true
                );


                setTimeout(() => {

                    const email =
                        loginForm.querySelector(
                            '[name="email"]'
                        )?.value;


                    updateAppData(data => {

                        data.student.email =
                            email || data.student.email;
                    });


                    goTo(
                        "modules.html"
                    );

                }, 700);
            }
        );


        /* Password visibility */

        const toggle =
            document.querySelector(
                ".password-toggle"
            );

        const password =
            document.querySelector(
                '[name="password"]'
            );


        if (toggle && password) {

            toggle.addEventListener(
                "click",
                () => {

                    const hidden =
                        password.type === "password";

                    password.type =
                        hidden
                            ? "text"
                            : "password";

                    toggle.textContent =
                        hidden
                            ? "Hide"
                            : "Show";
                }
            );
        }
    }
);