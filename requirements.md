# Non-Linear Life Calendar - Requirements Document

## 1. Project Overview
**Name:** [Project Name - TBD]
**Type:** Single-Page Web App (SPA)
**Goal:** Visualize a human life (DoB to 80 years) as a timeline where the visual space allocated to time shrinks as the user ages, representing the subjective acceleration of time perception.

## 2. Product Vision
- **Aesthetic:** Minimalistic, sleek, high-end "widget" feel.
- **Emotion:** Philosophical, contemplative.
- **Interaction:** Exploratory (Zoom/Drill-down), Passive (No data entry).

## 3. Functional Requirements

### 3.1. Initialization
- [ ] User inputs Date of Birth (DoB).
- [ ] System calculates current age and total life span (default 80 years).
- [ ] **Persistence:** TBD (Likely URL parameters for easy sharing, e.g., `?dob=1990-01-01`).

### 3.2. Data Visualization & Physics
- **The "Shrinking" Effect:**
    - Time units must visually decrease in size as they get closer to 80.
    - **Formula:** Logarithmic Scale.
    - *Concept:* $Size(t) \propto \log(TotalLife) - \log(t)$ or similar decay function.
    - Earlier years/months appear physically larger; later years appear compressed.

### 3.3. Views & Navigation (Hierarchical)
The interface is a "zoomable" progression box.

#### Level 1: Life View (Landing)
- **Scope:** Birth to Age 80.
- **Unit:** **Years**.
- **Layout:** A grid or continuous bar where Year 0 is the largest block, and Year 79 is the smallest.
- **Action:** Clicking a Year block zooms into Level 2.

#### Level 2: Year View
- **Scope:** Selected Year (Jan 1 - Dec 31).
- **Unit:** **Months**.
 **Layout:** 12 Months, also sized non-linearly (Jan is "longer" than Dec. *assumption: keep consistent non-linear effect*).
- **Action:** Clicking a Month block zooms into Level 3.

#### Level 3: Month View
- **Scope:** Selected Month.
- **Unit:** **Days**.
- **Layout:** Calendar grid for that month, also with the non-linear effect.

### 3.3. Interaction
- [ ] **Navigation:** Smooth transitions (zoom in/out animations) between levels.
- [ ] **No Editing:** Users cannot add events or notes. This is a read-only conceptual art piece.

## 4. UI/UX Requirements
- **Visual Style:**
    - "Widget-like" container.
    - Clean lines, monochromatic or subtle gradients.
    - Dark mode support (sleek tech feel).
    - **Typography:** Sans-serif (Inter/SF Pro).
- **Responsiveness:**
    - Must work well on Mobile (vertical stacking?) and Desktop.

## 5. Technical Constraints
- **Stack:** HTML5, CSS (CSS Grid/Flexbox), Vanilla JS.
- **Performance:**
    - DOM complexity is significantly reduced by the hierarchical approach (only rendering ~80 years or ~12 months at a time).
    - Focus on smooth CSS animations for the zoom transition.

## 6. Implementation Plan Draft
1.  **Core Logic:** Implement the Logarithmic sizing function.
2.  **L1 View:** Build the Year Grid.
3.  **L2/L3 Views:** Build the drill-down logic.
4.  **Transitions:** Animate the "Click to Expand" effect.
