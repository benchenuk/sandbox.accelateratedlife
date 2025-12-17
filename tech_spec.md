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
├── index.html          # Placeholder/Root
├── prototype.html      # Current functional prototype
├── src/
│   ├── math.js        # Non-linear scaling core
├── tests/
│   └── math.test.js   # Logic validation
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
 * Calculates normalized weights for a sequence of N items
 * @param {number} totalItems - Total units (e.g., 80)
 * @param {number} steepness - Curvature control (Default: 1)
 * @returns {number[]} - Normalized weights [0...1] summing to 1.0
 */
export function calculateWeights(totalItems, steepness = 1) {
    let rawWeights = [];
    for (let t = 1; t <= totalItems; t++) {
        // Logarithmic decay
        const w = 1 / Math.log(t + steepness);
        rawWeights.push(w);
    }
    const totalWeight = rawWeights.reduce((a, b) => a + b, 0);
    return rawWeights.map(w => w / totalWeight);
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

### 5.2. Layout Strategy: 1D Flex-Wrap
Standard CSS Grid tracks are too rigid for 80+ unique track sizes. Instead, we use a Flexbox container with calculated percentage widths.

- **Container:** `display: flex; flex-wrap: wrap;`
- **Blocks:** `width: (weight * 100)%; height: 90px;`
- **Adaptive Font Size:** `fontSize = Math.max(min, Math.min(max, pixelWidth / factor))` calculated in JS on render/resize.

### 5.3. Themes (Current)
Using HSL variables to allow "Atmosphere" shifting:
```css
:root {
    --bg: #0a0a0a;
    --panel-bg: #161616;
    --border: #262626;
    --text: #ffffff;
    --accent-hue: 220; /* Dynamically shifted based on selection */
}
```


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
