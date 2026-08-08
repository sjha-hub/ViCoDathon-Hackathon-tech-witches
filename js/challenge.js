/* =========================================================
   ABTALKS — CHALLENGE DAY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const challengePage =
            document.querySelector(
                "[data-challenge-page]"
            );

        if (!challengePage) return;


        renderChallenge();


        const form =
            document.querySelector(
                "#submissionForm"
            );


        if (!form) return;


        form.addEventListener(
            "submit",
            handleSubmission
        );
    }
);


/* ---------------------------------------------------------
   RENDER CHALLENGE
--------------------------------------------------------- */

function renderChallenge() {

    const challenge =
        appData.challenge;

    const task =
        appData.todayTask;


    document
        .querySelectorAll(
            "[data-day]"
        )
        .forEach(element => {

            element.textContent =
                challenge.currentDay;
        });


    document
        .querySelectorAll(
            "[data-total-days]"
        )
        .forEach(element => {

            element.textContent =
                challenge.totalDays;
        });


    document
        .querySelectorAll(
            "[data-task-title]"
        )
        .forEach(element => {

            element.textContent =
                task.title;
        });


    document
        .querySelectorAll(
            "[data-task-description]"
        )
        .forEach(element => {

            element.textContent =
                task.description;
        });


    document
        .querySelectorAll(
            "[data-task-difficulty]"
        )
        .forEach(element => {

            element.textContent =
                task.difficulty;
        });


    document
        .querySelectorAll(
            "[data-task-time]"
        )
        .forEach(element => {

            element.textContent =
                task.estimatedTime;
        });
}


/* ---------------------------------------------------------
   SUBMISSION
--------------------------------------------------------- */

function handleSubmission(event) {

    event.preventDefault();


    const form =
        event.target;


    if (
        !validateRequiredFields(
            form
        )
    ) {

        showNotification(
            "Please provide both proof links.",
            "error"
        );

        return;
    }


    const github =
        form.querySelector(
            '[name="githubProof"]'
        )?.value.trim();


    const linkedin =
        form.querySelector(
            '[name="linkedinProof"]'
        )?.value.trim();


    if (
        !isValidURL(github) ||
        !isValidURL(linkedin)
    ) {

        showNotification(
            "Please enter valid URLs.",
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

            data.submissions = {

                github,

                linkedin,

                submitted: true
            };


            if (
                data.challenge.completedDays <
                data.challenge.currentDay
            ) {

                data.challenge.completedDays =
                    data.challenge.currentDay;

                data.challenge.streak++;
            }
        });


        setButtonLoading(
            button,
            false
        );


        showCompletionState();


        showNotification(
            "Day submitted successfully!"
        );

    }, 900);
}


/* ---------------------------------------------------------
   COMPLETION
--------------------------------------------------------- */

function showCompletionState() {

    const form =
        document.querySelector(
            "#submissionForm"
        );

    const completion =
        document.querySelector(
            "#completionState"
        );


    if (form) {

        form.classList.add(
            "hidden"
        );
    }


    if (completion) {

        completion.classList.remove(
            "hidden"
        );
    }
}