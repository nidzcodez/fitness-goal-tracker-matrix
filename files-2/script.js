/* =============================================
   MATRIX – Fitness Goal Tracker
   script.js
   All JavaScript logic lives here.
   Uses localStorage to persist data across page reloads.
============================================= */


/* ==================================================
   UTILITY: Show a toast notification
   Called after any save/update action.
================================================== */
function showToast(message) {
  // Create toast element if it doesn't exist yet
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  // Auto-hide after 2.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}


/* ==================================================
   SECTION 1: FITNESS GOALS TRACKER
   - saveGoals()    : reads goal inputs, saves to localStorage
   - updateProgress(): reads actual inputs, updates bars
   - setBar()       : helper to animate a single bar
   - loadGoals()    : restores saved data on page load
================================================== */

// Save the user's target goals (how many steps, calories, minutes they WANT to hit)
function saveGoals() {
  const steps    = parseInt(document.getElementById('steps-input').value)    || 0;
  const calories = parseInt(document.getElementById('calories-input').value) || 0;
  const workout  = parseInt(document.getElementById('workout-input').value)  || 0;

  // Validate: at least one value must be entered
  if (steps === 0 && calories === 0 && workout === 0) {
    showToast('⚠ Please enter at least one goal!');
    return;
  }

  // Store goals object in localStorage as JSON string
  const goals = { steps, calories, workout };
  localStorage.setItem('matrix_goals', JSON.stringify(goals));

  showToast('✓ Goals Saved');
  // Refresh progress display
  updateProgress();
}


// Update progress bars based on "actual" values entered by the user
function updateProgress() {
  // Load saved goals from localStorage
  const goals = JSON.parse(localStorage.getItem('matrix_goals')) || { steps: 0, calories: 0, workout: 0 };

  // Read actual (achieved) values
  const stepsActual    = parseInt(document.getElementById('steps-actual').value)    || 0;
  const caloriesActual = parseInt(document.getElementById('calories-actual').value) || 0;
  const workoutActual  = parseInt(document.getElementById('workout-actual').value)  || 0;

  // Save actual progress to localStorage
  const actuals = { steps: stepsActual, calories: caloriesActual, workout: workoutActual };
  localStorage.setItem('matrix_actuals', JSON.stringify(actuals));

  // Calculate percentage (capped at 100%)
  const stepsPct    = goals.steps    > 0 ? Math.min((stepsActual / goals.steps) * 100, 100)       : 0;
  const caloriesPct = goals.calories > 0 ? Math.min((caloriesActual / goals.calories) * 100, 100) : 0;
  const workoutPct  = goals.workout  > 0 ? Math.min((workoutActual / goals.workout) * 100, 100)   : 0;

  // Update each progress bar and percentage label
  setBar('steps-bar',    'steps-pct',    stepsPct);
  setBar('calories-bar', 'calories-pct', caloriesPct);
  setBar('workout-bar',  'workout-pct',  workoutPct);

  showToast('✓ Progress Updated');
}


// Helper: animates a progress bar and sets its percentage label
function setBar(barId, labelId, pct) {
  const bar   = document.getElementById(barId);
  const label = document.getElementById(labelId);

  if (bar)   bar.style.width = pct + '%';
  if (label) label.textContent = Math.round(pct) + '%';
}


// Load previously saved goals and actuals when the page opens
function loadGoals() {
  const goals   = JSON.parse(localStorage.getItem('matrix_goals'))   || {};
  const actuals = JSON.parse(localStorage.getItem('matrix_actuals')) || {};

  // Fill goal inputs
  if (goals.steps)    document.getElementById('steps-input').value    = goals.steps;
  if (goals.calories) document.getElementById('calories-input').value = goals.calories;
  if (goals.workout)  document.getElementById('workout-input').value  = goals.workout;

  // Fill actual inputs
  if (actuals.steps)    document.getElementById('steps-actual').value    = actuals.steps;
  if (actuals.calories) document.getElementById('calories-actual').value = actuals.calories;
  if (actuals.workout)  document.getElementById('workout-actual').value  = actuals.workout;

  // Recalculate progress bars silently (without showing toast)
  if (Object.keys(goals).length && Object.keys(actuals).length) {
    const stepsPct    = goals.steps    > 0 ? Math.min((actuals.steps    / goals.steps)    * 100, 100) : 0;
    const caloriesPct = goals.calories > 0 ? Math.min((actuals.calories / goals.calories) * 100, 100) : 0;
    const workoutPct  = goals.workout  > 0 ? Math.min((actuals.workout  / goals.workout)  * 100, 100) : 0;
    // Small delay so CSS transition is visible on load
    setTimeout(() => {
      setBar('steps-bar',    'steps-pct',    stepsPct);
      setBar('calories-bar', 'calories-pct', caloriesPct);
      setBar('workout-bar',  'workout-pct',  workoutPct);
    }, 300);
  }
}


/* ==================================================
   SECTION 2: WATER INTAKE TRACKER
   - renderGlasses() : draws the glass icons
   - addGlass()      : increments count, saves
   - resetWater()    : resets to 0, saves
   - loadWater()     : restores saved count on load
================================================== */

const WATER_GOAL = 8; // Target glasses per day

// Render the 8 glass icons; filled ones are highlighted
function renderGlasses(count) {
  const container = document.getElementById('water-glasses');
  container.innerHTML = ''; // Clear previous

  for (let i = 1; i <= WATER_GOAL; i++) {
    const glass = document.createElement('div');
    glass.className = 'glass' + (i <= count ? ' filled' : '');

    // Inner fill div (shown when glass is filled)
    const fill = document.createElement('div');
    fill.className = 'fill';
    glass.appendChild(fill);

    container.appendChild(glass);
  }

  // Update water progress bar
  const waterPct = (count / WATER_GOAL) * 100;
  const waterBar = document.getElementById('water-bar');
  const waterLabel = document.getElementById('water-pct');

  if (waterBar)   waterBar.style.width = waterPct + '%';
  if (waterLabel) waterLabel.textContent = count + ' / ' + WATER_GOAL + ' glasses';
}


// Add one glass, save to localStorage
function addGlass() {
  let count = parseInt(localStorage.getItem('matrix_water')) || 0;

  if (count >= WATER_GOAL) {
    showToast('🎉 Daily goal reached!');
    return;
  }

  count++;
  localStorage.setItem('matrix_water', count);
  renderGlasses(count);

  if (count === WATER_GOAL) {
    showToast('🎉 Hydration Goal Achieved!');
  } else {
    showToast('💧 Glass Added (' + count + '/' + WATER_GOAL + ')');
  }
}


// Reset water counter
function resetWater() {
  localStorage.setItem('matrix_water', 0);
  renderGlasses(0);
  showToast('🔄 Water Tracker Reset');
}


// Load water count on page open
function loadWater() {
  const count = parseInt(localStorage.getItem('matrix_water')) || 0;
  renderGlasses(count);
}


/* ==================================================
   SECTION 3: BMI CALCULATOR
   - calculateBMI() : reads height & weight, computes BMI,
                      shows result with category and scale
================================================== */

function calculateBMI() {
  const heightCm = parseFloat(document.getElementById('height-input').value);
  const weightKg = parseFloat(document.getElementById('weight-input').value);

  // Basic validation
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    showToast('⚠ Enter valid height and weight!');
    return;
  }

  // BMI Formula: weight (kg) / (height in metres)^2
  const heightM = heightCm / 100;
  const bmi     = weightKg / (heightM * heightM);
  const bmiRounded = bmi.toFixed(1);

  // Determine category and position on scale (0–100%)
  let category    = '';
  let categoryClass = '';
  let scalePercent = 0;

  if (bmi < 18.5) {
    // Underweight: BMI < 18.5
    category      = 'Underweight';
    categoryClass = 'underweight';
    // Map 10–18.5 → 0–25%
    scalePercent  = Math.max(0, ((bmi - 10) / 8.5) * 25);
  } else if (bmi < 25) {
    // Normal: 18.5 – 24.9
    category      = 'Normal Weight';
    categoryClass = 'normal';
    // Map 18.5–25 → 25–55%
    scalePercent  = 25 + ((bmi - 18.5) / 6.5) * 30;
  } else if (bmi < 30) {
    // Overweight: 25 – 29.9
    category      = 'Overweight';
    categoryClass = 'overweight';
    // Map 25–30 → 55–80%
    scalePercent  = 55 + ((bmi - 25) / 5) * 25;
  } else {
    // Obese: BMI >= 30
    category      = 'Obese';
    categoryClass = 'obese';
    // Map 30–45 → 80–100%
    scalePercent  = Math.min(100, 80 + ((bmi - 30) / 15) * 20);
  }

  // Show the result area
  const resultDiv = document.getElementById('bmi-result');
  resultDiv.style.display = 'block';

  // Set BMI number
  document.getElementById('bmi-value').textContent = bmiRounded;

  // Set category text and colour class
  const catEl = document.getElementById('bmi-category');
  catEl.textContent = category;
  catEl.className   = 'bmi-category ' + categoryClass;

  // Move the scale indicator
  setTimeout(() => {
    document.getElementById('scale-indicator').style.left = scalePercent + '%';
  }, 100);

  // Save BMI to localStorage for reference
  localStorage.setItem('matrix_bmi', JSON.stringify({ bmi: bmiRounded, category, heightCm, weightKg }));

  showToast('✓ BMI Calculated: ' + bmiRounded);
}


// Restore BMI inputs if user previously calculated
function loadBMI() {
  const saved = JSON.parse(localStorage.getItem('matrix_bmi'));
  if (!saved) return;

  document.getElementById('height-input').value = saved.heightCm;
  document.getElementById('weight-input').value  = saved.weightKg;
}


/* ==================================================
   PAGE INIT: Run everything when the page loads
================================================== */
document.addEventListener('DOMContentLoaded', function () {
  loadGoals();   // Restore fitness goals & progress
  loadWater();   // Restore water intake
  loadBMI();     // Restore BMI inputs
});
