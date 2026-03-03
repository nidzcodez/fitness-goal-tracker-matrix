===============================================================
  MATRIX – Fitness Goal Tracker
  A Front-End Web Application
===============================================================

PROJECT OVERVIEW
-----------------
Matrix is a browser-based fitness tracking dashboard built using
only HTML, CSS, and Vanilla JavaScript. No frameworks or backend
required. All user data is stored in the browser's localStorage.

TECH STACK
----------
- HTML5         : Page structure and semantic markup
- CSS3          : Dark theme, animations, responsive layout
- JavaScript    : App logic, localStorage, DOM manipulation
- Google Fonts  : Orbitron (display), Rajdhani (body)

FILE STRUCTURE
--------------
index.html   → Main HTML structure, sections, and layout
style.css    → All styles including dark theme, animations, responsive design
script.js    → All JavaScript logic (goals, water, BMI, localStorage)
README.txt   → This file

FEATURES
---------

1. DAILY FITNESS GOALS TRACKER
   - Set goals for steps, calories, and workout minutes
   - Update today's actual progress
   - Animated progress bars show percentage complete
   - Data saved with localStorage

2. WATER INTAKE TRACKER
   - 8-glass daily goal
   - Visual glass icons fill as you log water
   - Animated progress bar shows hydration level
   - Reset button to start fresh
   - Progress saved with localStorage

3. BMI CALCULATOR
   - Enter height (cm) and weight (kg)
   - Instantly calculates BMI
   - Displays category: Underweight / Normal / Overweight / Obese
   - Color-coded animated scale indicator
   - Last calculation saved to localStorage

HOW TO RUN
-----------
1. Download all three files (index.html, style.css, script.js)
   into the SAME folder on your computer.
2. Double-click index.html, or right-click → Open With → Browser
3. The app will load and restore any previously saved data.

DESIGN NOTES
------------
- Dark theme with neon green Matrix-inspired accents
- Scan-line background texture for atmosphere
- Orbitron monospace font for the tech aesthetic
- Smooth CSS animations on cards, bars, and buttons
- Fully responsive for mobile and desktop

LOCALSTORAGE KEYS USED
------------------------
matrix_goals    → { steps, calories, workout } target goals
matrix_actuals  → { steps, calories, workout } progress values
matrix_water    → Number of glasses logged today
matrix_bmi      → { bmi, category, heightCm, weightKg }

CONCEPTS DEMONSTRATED
----------------------
- HTML semantic structure (header, main, section, footer)
- CSS Variables (custom properties) for theming
- CSS animations (@keyframes) and transitions
- CSS Grid and Flexbox for responsive layouts
- JavaScript DOM manipulation (getElementById, innerHTML)
- JSON.parse / JSON.stringify for localStorage
- Event handling with onclick
- Input validation and user feedback (toast notifications)

===============================================================
  Submitted as a College Project | Built with HTML, CSS & JS
===============================================================
