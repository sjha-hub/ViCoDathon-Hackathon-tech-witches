/* =========================================================
   ABTALKS — MOCK DATA
   ========================================================= */

const ABTalksData = {

    student: {
        name: "Alex",
        email: "alex@example.com",
        avatar: "A"
    },

    challenge: {
        totalDays: 60,
        currentDay: 12,
        completedDays: 11,
        streak: 11,
        missedDays: 0
    },

    todayTask: {
        day: 12,
        title: "Build a Responsive Landing Page",
        description:
            "Create a clean responsive landing page using HTML and CSS. Focus on structure, spacing, typography and responsive behavior.",
        difficulty: "Intermediate",
        estimatedTime: "2–3 hours",
        points: 100
    },

    codingProfiles: [],

    linkedin: {
        connected: false,
        url: "",
        posts: 0,
        certifications: 0,
        skills: 0,
        followers: 0
    },

    github: {
        connected: false,
        username: "",
        repositories: 0,
        commits: 0,
        contributions: 0
    },

    submissions: {
        github: "",
        linkedin: "",
        submitted: false
    },

    achievements: [
        {
            title: "First Step",
            description: "Completed your first challenge day.",
            icon: "01"
        },
        {
            title: "7 Day Streak",
            description: "Maintained a 7 day learning streak.",
            icon: "07"
        }
    ]
};


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

const STORAGE_KEY = "abtalks_data";


function loadData() {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return ABTalksData;
    }

    try {

        const parsedData = JSON.parse(savedData);

        return {
            ...ABTalksData,
            ...parsedData
        };

    } catch (error) {

        console.error(
            "Could not load ABTalks data:",
            error
        );

        return ABTalksData;
    }
}


function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


let appData = loadData();