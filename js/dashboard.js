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

// ============================================================
// TIMER FUNCTIONALITY
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('taskTimer');
    const startBtn = document.getElementById('startTimerBtn');
    
    let timeRemaining = 60 * 60; // 60 minutes in seconds
    let timerInterval = null;
    let isTimerRunning = false;

    // Format time as MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // Update timer display
    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeRemaining);
        
        // Change color based on time remaining
        timerDisplay.classList.remove('warning', 'danger');
        if (timeRemaining <= 300) { // 5 minutes
            timerDisplay.classList.add('danger');
        } else if (timeRemaining <= 600) { // 10 minutes
            timerDisplay.classList.add('warning');
        }
    }

    // Timer tick
    function tick() {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
        } else {
            // Timer finished
            clearInterval(timerInterval);
            timerInterval = null;
            isTimerRunning = false;
            startBtn.textContent = 'Time\'s Up! ⏰';
            startBtn.classList.remove('timer-active');
            startBtn.disabled = true;
            
            // Optional: Add sound or notification
            if (Notification.permission === 'granted') {
                new Notification('ABTalks Timer', {
                    body: 'Time\'s up! How did you do?',
                    icon: '🧑‍💻'
                });
            }
        }
    }

    // Start/Pause timer
    startBtn.addEventListener('click', function() {
        if (timerInterval) {
            // Pause timer
            clearInterval(timerInterval);
            timerInterval = null;
            isTimerRunning = false;
            startBtn.textContent = 'Resume Timer';
            startBtn.classList.remove('timer-active');
            return;
        }

        // Start timer
        if (timeRemaining <= 0) {
            // Reset if timer finished
            timeRemaining = 60 * 60;
            updateDisplay();
            startBtn.disabled = false;
        }

        timerInterval = setInterval(tick, 1000);
        isTimerRunning = true;
        startBtn.textContent = 'Pause Timer ⏸️';
        startBtn.classList.add('timer-active');
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });

    // Reset timer on page unload (optional)
    window.addEventListener('beforeunload', function() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    });

    // Initialize display
    updateDisplay();
});