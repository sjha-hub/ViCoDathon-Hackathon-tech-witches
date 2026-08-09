# ABTalks Redesign - 60-Day Coding Challenge

A mobile-first redesign of the ABTalks 60-day coding challenge platform for Indian college students.

## Route Map
/
/student_dashboard
/challenge_day

## Live Deployment
https://s3-tech-witches.netlify.app/

## Repository
https://github.com/sjha-hub/ViCoDathon-Hackathon-tech-witches.git

---

## Project Overview
Students use this platform to:
- Build something every day for 60 days
- Submit a GitHub commit and LinkedIn post
- Build consistency and get noticed by recruiters

## Key Features
- **Mobile-first** (390px viewport)
- **Dark theme** (for late-night studying)
- **Gamified achievements** (Day 7, 21, 42, 60)
- **Smart empty states** (Day 0, missed days)

## Tech Stack
- Vanilla HTML/CSS/JS
- Mock JSON data
- Deployed on Netlify

## Project Structure
```
/
├── css/
│ ├── components.css
│ ├── friends.css
│ ├── landing.css
│ ├── sidebar.css
│ └── style.css
├── js/
│ ├── app.js
│ ├── challenge.js
│ ├── dashboard.js
│ ├── data.js
│ ├── friends.js
│ ├── github.js
│ ├── linkedin.js
│ ├── login.js
│ ├── modules.js
│ ├── profiles.js
│ ├── settings.js
│ └── sidebar.js
├── index.html
├── student_dashboard.html
├── challenge_day.html
├── login.html
├── friends.html
├── github.html
├── linkedin.html
├── modules.html
├── settings.html
├── coding_profiles.html
├── README.md
└── prompts.md
```

## Edge Cases Handled
- Day 0 with no streak
- Missed a day
- Empty profile

## Acknowledgments
Built using:
- ChatGPT (Design brainstorming)
- Nano Banana (UI/UX design)
- Claude (Initial code generation)
- DeepSeek (Refactoring & features)