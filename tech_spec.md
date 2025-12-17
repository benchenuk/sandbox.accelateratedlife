# Non-Linear Life Calendar - Technical Specification

## 1. System Architecture
- **Type:** Single-Page Application (SPA)
- **Hosting:** Static hosting (HTML/JS/CSS)
- **Core Stack:**
  - **HTML:** Semantic structure.
  - **CSS:** Vanilla CSS with independent rounded "Bar" components for layers.
  - **JS:** Vanilla JavaScript (ES Modules).

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
The application state is managed via a simple reactive object in `prototype.html`.

### 3.1. State Object
```javascript
const state = {
  dob: null,          // Date object
  steepness: 1,       // Decay factor
  hue: 220,           // Theme hue
  selectedYearIndex: null // Index of the currently drilled-down year (null if none)
};
```

### 3.2. Navigation
- **Layer 1 (Life View):** Always visible.
- **Layer 2 (Year View):** Toggles visibility below Layer 1 when the current age block is clicked.

## 4. Algorithms: The Non-Linear Engine

### 4.1. The "Subjective Time" Formula
$$Weight(t) = \frac{1}{\log(t + k)}$$
We use normalized logarithmic decay to determine the width of time blocks.

### 4.2. Application to Views
- **Life View (Layer 1):** `totalItems = 80` (Years).
  - Visualization: Weighted horizontal blocks.
- **Year View (Layer 2):** `totalItems = ~365` (Days).
  - Visualization: A continuous, dense "barcode" of daily stripes.
  - **Color Interpolation:** The gradient of the entire Year View (365 days) is interpolated strictly between the `startColor` and `endColor` of that specific year's block in Layer 1, ensuring perfect visual continuity.

## 5. UI/Rendering Specification

### 5.1. The "Stacked Bar" Layout
The interface consists of vertically stacked, independent "Cards" or "Bars".
- **Container:** No outer chrome or border. Just accurate stacking.
- **Layer Cards:** 
  - `border-radius: 12px` (All 4 corners rounded).
  - `margin-bottom: 8px` (Visual separation).
  - `border: 1px solid var(--border)`.

### 5.2. Layer 1: Life View
- **Layout:** Flex-wrap container.
- **Blocks:** Fixed height (80px), variable %.
- **Interaction:** Clicking the Current Year toggles Layer 2.

### 5.3. Layer 2: Year View
- **Layout:** Flex container (no wrap) representing a timeline of the year.
- **Visuals:** A dense strip of 365 weighted bars.
- **Status:**
  - **Past Days:** Darkened/Dimmed.
  - **Present Day:** Bright White Highlight.
  - **Future Days:** Standard non-linear gradient.

## 6. Implementation Status
- [x] **Math Shell:** `calculateWeights` implemented.
- [x] **Layer 1:** Life view with non-linear blocks and adaptive fonts.
- [x] **Layer 2:** Year view visualizing 365 days in a "Barcode" style, stacked immediately below Layer 1.
- [x] **Transition:** Gradient continuity and toggle interaction working.
- [ ] **Layer 3:** 24-Hour view (Future Feature).
