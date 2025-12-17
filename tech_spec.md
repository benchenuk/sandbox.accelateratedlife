# Non-Linear Life Calendar - Technical Specification

## 1. System Architecture
- **Type:** Single-Page Application (SPA)
- **Hosting:** Static hosting (GitHub Pages / Netlify / Vercel)
- **Core Stack:**
  - **HTML:** Semantic structure, accessible landmarks.
  - **CSS:** Vanilla CSS with Custom Properties (Variables) for theming and dynamic sizing.
  - **JS:** Vanilla JavaScript (ES6+) for logic, DOM manipulation, and state management. No build step required (initially), but can use Vite if a bundler is preferred for module management. *Decision: Use Vite + Vanilla JS for better dev experience.*

## 2. Directory Structure
```
/
├── index.html          # Entry point
├── src/
│   ├── main.js        # App initialization and router
│   ├── state.js       # Global state management (DoB, Current View)
│   ├── render.js      # DOM manipulation functions
│   ├── math.js        # Non-linear scaling algorithms
│   └── styles/
│       ├── main.css   # Reset and global styles
│       ├── grid.css   # Grid layouts for Years/Months/Days
│       └── theme.css  # Dark/Light mode tokens
└── public/
    └── assets/        # Icons, fonts
```

## 3. Data Model & State
The application state is minimal and can be managed with a simple reactive object or module.

### 3.1. State Object
```javascript
const state = {
  dob: null,          // Date object
  maxAge: 80,         // Constant, default 80
  viewMode: 'LIFE',   // Enum: 'LIFE' | 'YEAR' | 'MONTH'
  selectedDate: {     // Context for current drill-down
    year: null,
    month: null
  },
  theme: 'dark'       // 'dark' | 'light'
};
```

### 3.2. URL Routing (Pseudo-routing)
We will use URL Hash or Query Parameters to allow sharing and back-button navigation.
- **Root:** `/?dob=1990-01-01` -> Shows Life View
- **Drill-down:** `/?dob=1990-01-01&view=year&y=30` -> Shows 30th year relative to birth
- **Deep-drill:** `/?dob=1990-01-01&view=month&y=30&m=5` -> Shows 5th month of 30th year

## 4. Algorithms: The Non-Linear Engine

### 4.1. The "Subjective Time" Formula
We need a function `getSize(index, totalItems)` that returns a relative weight for an item.
User requested **Logarithmic** scaling.

**Concept:** The strict infinite logarithmic decay might be too aggressive (Year 0 vs Year 80 is drastic). We will use a tuned power law or logarithmic decay.

**Proposed Function:**
$$Weight(t) = \frac{1}{\log(t + k)}$$
Where $t$ is the time unit index (1-based) and $k$ is an offset to prevent division by zero or huge initial values.

**Implementation:**
We will normalize the weights so they sum to 100% (or 1.0) of the container.

```javascript
/**
 * Calculates relative size of each item in a sequence of N items
 * @param {number} totalItems - Total number of units (e.g., 80 years)
 * @param {string} method - 'log' | 'linear'
 * @returns {number[]} - Array of weights summing to 1
 */
function calculateWeights(totalItems) {
    let rawWeights = [];
    for (let t = 1; t <= totalItems; t++) {
        // Logarithmic decay: Early items are large, late items are small
        // Using (t + offset) to smooth the curve
        const weight = 1 / Math.log(t + 2); 
        rawWeights.push(weight);
    }
    
    const totalWeight = rawWeights.reduce((a, b) => a + b, 0);
    return rawWeights.map(w => w / totalWeight); // Normalize
}
```

### 4.2. Application to Views
- **Life View:** `totalItems = 80` (Years).
- **Year View:** `totalItems = 12` (Months). *Note: The scaling here is subtle but present.*
- **Month View:** `totalItems = daysInMonth` (28-31).

## 5. UI/Rendering Specification

### 5.1. The Container "Widget"
A fixed aspect ratio or max-width container centered on screen.
- **Desktop:** `max-width: 800px`, `aspect-ratio: 3/4` (Vertical widget) or flexible.
- **Mobile:** Full width, vertical scroll if needed.

### 5.2. Flexbox/Grid Strategy
We cannot easily use standard CSS Grid `fr` units if every single track has a unique size (CSS Grid limits track definitions).
**Better Approach:** Flexbox or Absolute positioning (percentages).
**Chosen Approach: Flexbox with `flex-grow`**
- Set `flex-grow: [calculated_weight]` on each child element.
- This allows CSS to handle the precise pixel fitting automatically.

Example:
```css
.year-block {
    /* Set via JS based on calc */
    flex-grow: 1.5; 
    /* Base size */
    flex-basis: 0;
}
```
*Correction: `flex-grow` sums might be tricky to tune exactly to the visual weight we want. Using `width: %` calculated in JS might be more precise and stable.*

**Refined Approach:** JS calculates exact % width/height and applying it as inline styles. 
- **Life View:** A "Flex Wrap" container? No, a grid is better for "Years".
    - If we want a linear flow (Year 0 -> Year 79), a wrapped flex container works best.
    - Year 0 (big) might take 50% of row 1.
    - Year 79 (small) might be a tiny dot at the end.

### 5.3. Themes
css
:root {
    --bg-color: #0F0F0F;
    --item-bg: #2A2A2A;
    --item-hover: #404040;
    --text-primary: #EDEDED;
    --text-secondary: #808080;
    --accent: #D4D4D4;
}


## 6. Implementation Stages
1.  **Stage 1: The Math Shell**
    - Set up project.
    - Implement `calculateWeights`.
    - Console log outputs to verify the "curve" feels right.
2.  **Stage 2: Life View (Level 1)**
    - Render 80 blocks using the weights.
    - Apply Flexbox wrapping.
    - Verify the visual effect of "shrinking time".
3.  **Stage 3: Navigation & Drill-down**
    - Click event -> Update State -> Re-render view.
    - Implement "Back" button (breadcrumb).
4.  **Stage 4: Polish**
    - CSS Animations (View transitions).
    - Date of Birth Input modal/overlay.
