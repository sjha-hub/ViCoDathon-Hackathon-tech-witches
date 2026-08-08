/* =========================================================
   ABTALKS — MODULES
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const moduleCards =
            document.querySelectorAll(
                "[data-module]"
            );

        if (!moduleCards.length) return;


        moduleCards.forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const module =
                        card.dataset.module;


                    if (
                        module ===
                        "coding-profile"
                    ) {

                        goTo(
                            "coding_profiles.html"
                        );

                    }

                    else if (
                        module === "linkedin"
                    ) {

                        goTo(
                            "linkedin.html"
                        );

                    }

                    else if (
                        module === "github"
                    ) {

                        goTo(
                            "github.html"
                        );
                    }
                }
            );
        });
    }
);