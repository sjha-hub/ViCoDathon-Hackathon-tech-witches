# ABTalks - 60-Day Coding Challenge Platform

ABTalks is a mobile-first 60-day coding challenge platform designed for Indian college students to build daily coding consistency, generate verified proof of work (GitHub commits & LinkedIn posts), and gain recruiter visibility.

## 🚀 Key Features

- **Mobile-First UX (390px Target Viewport)**: Fully responsive, glassmorphic UI engineered specifically for mobile viewing.
- **Dark Purple & Violet Design System**: Unified dark theme featuring glowing violet accents, glassmorphic cards (`backdrop-filter`), smooth hover micro-animations, and clean typography.
- **Complete Cohesive User Flow**:
  1. **Landing Page** (`/` -> `index.html`) - Overview & call to action.
  2. **Sign In Page** (`/login` -> `login.html`) - Simulated auth flow.
  3. **Developer Modules** (`/modules` -> `modules.html`) - Platform hubs overview.
  4. **Coding Profiles Setup** (`/coding-profiles` -> `coding_profiles.html`) - Manage handles across LeetCode, CodeChef, GeeksforGeeks, etc.
  5. **LinkedIn Setup** (`/linkedin` -> `linkedin.html`) - Profile metrics (Posts, Certifications, Skills, Followers).
  6. **GitHub Setup** (`/github` -> `github.html`) - Repository commit tracking & activity visualizer.
  7. **Student Dashboard** (`/dashboard` -> `student_dashboard.html`) - Primary evaluation screen featuring streak tracking, student standing, rank, achievements, and edge cases simulation bar.
  8. **Challenge Day** (`/day/12` -> `challenge_day.html`) - Primary evaluation screen with task hierarchy, requirements checklist, GitHub & LinkedIn proof submission, and day completion workflow.
- **Thoughtful UX Feature**: *"Tonight's Quick Check"* late-night checklist for college students to track completion before ending the day.
- **Interactive Edge Cases Switcher**: Instant evaluation toolbar to test First Day (0 Streak), Missed Yesterday, Empty Profile, and Completed Day states.

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with full accessibility standards (`aria-labels`, responsive viewports).
- **CSS3**: Pure CSS custom properties (variables), modern glassmorphism, flexbox/grid layout, and subtle micro-animations.
- **Vanilla JavaScript**: State management backed by `localStorage`, toast notifications, and dynamic client-side interactivity without external frameworks.

## 📍 Required Evaluation Routes

- `/` → `index.html`
- `/dashboard` → `student_dashboard.html`
- `/day/12` → `challenge_day.html`

## 📁 File Structure

```
ABTalks/
├── assets/
│   └── images/
│       ├── abtalks_logo.jpg
│       └── student_avatar.jpg
├── css/
│   ├── style.css
│   └── dashboard.css
├── js/
│   ├── data.js
│   ├── main.js
│   ├── dashboard.js
│   └── challenge.js
├── index.html
├── login.html
├── modules.html
├── coding_profiles.html
├── linkedin.html
├── github.html
├── student_dashboard.html
├── challenge_day.html
├── vercel.json
└── README.md
```

## 🌐 Local Development & Preview

Serve the static directory using any HTTP server:

```bash
# Using python
python -m http.server 8000

# Or npx serve
npx serve .
```

Open `http://localhost:8000` in your browser and inspect at **390px mobile viewport**.