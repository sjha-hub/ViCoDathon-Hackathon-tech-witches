/* =========================================================
   ABTALKS — DASHBOARD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const dashboard =
            document.querySelector(
                "[data-dashboard]"
            );

        if (!dashboard) return;


        renderDashboard();
    }
);


/* ---------------------------------------------------------
   RENDER DASHBOARD
--------------------------------------------------------- */

function renderDashboard() {

    const data = appData;


    /* Student name */

    document
        .querySelectorAll(
            "[data-student-name]"
        )
        .forEach(element => {

            element.textContent =
                data.student.name;
        });


    /* Streak */

    document
        .querySelectorAll(
            "[data-streak]"
        )
        .forEach(element => {

            element.textContent =
                data.challenge.streak;
        });


    /* Current day */

    document
        .querySelectorAll(
            "[data-current-day]"
        )
        .forEach(element => {

            element.textContent =
                data.challenge.currentDay;
        });


    /* Completed days */

    document
        .querySelectorAll(
            "[data-completed-days]"
        )
        .forEach(element => {

            element.textContent =
                data.challenge.completedDays;
        });


    /* Challenge progress */

    const progress =
        (
            data.challenge.completedDays /
            data.challenge.totalDays
        ) * 100;


    document
        .querySelectorAll(
            "[data-challenge-progress]"
        )
        .forEach(element => {

            element.style.width =
                `${progress}%`;
        });


    document
        .querySelectorAll(
            "[data-progress-text]"
        )
        .forEach(element => {

            element.textContent =
                `${Math.round(progress)}%`;
        });


    /* Today's task */

    document
        .querySelectorAll(
            "[data-task-title]"
        )
        .forEach(element => {

            element.textContent =
                data.todayTask.title;
        });


    document
        .querySelectorAll(
            "[data-task-description]"
        )
        .forEach(element => {

            element.textContent =
                data.todayTask.description;
        });


    /* Today's task button */

    const challengeButtons =
        document.querySelectorAll(
            "[data-open-challenge]"
        );


    challengeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                goTo(
                    "challenge_day.html"
                );
            }
        );
    });
}