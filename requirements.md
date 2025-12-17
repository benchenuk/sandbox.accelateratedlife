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
- [x] User inputs Date of Birth (DoB) via date picker.
- [x] System calculates current age and highlights the current year in the timeline.
- [x] System renders a total life span (default 80 years, adjustable).

### 3.2. Data Visualization & Physics
- **The "Subjective Life Stream":**
    - A 1D continuous flow of year blocks that wrap naturally within the container.
    - **Formula:** Logarithmic decay $1 / \log(t + steepness)$, where `steepness` defaults to 1 for a natural but noticeable acceleration.
    - **Visual Weight:** Year 1 is significantly larger than Year 80.
    - **Color Gradient:** Each block's color deepens and saturates as the user ages (progresses through the list).

### 3.3. Views & Interaction
- **Life View:** 
    - Rendered as blocks with a fixed height (e.g., 90px) and variable widths.
    - **Adaptive Typography:** Year numbers scale their font size dynamically based on the available width of the block.
    - **Highlighting:** The block representing the user's current year is visually distinct (glow effect, "YOU" badge).
- **Atmosphere (Theming):** 
    - Users can select from predefined "Atmospheres" (Ocean Blue, Royal Violet, Emerald Forest, etc.) which reskin the entire canvas.

## 4. UI/UX Requirements
- **Visual Style:**
    - High-end dark mode aesthetic with glassmorphism effects.
    - Smooth transitions on hover and state changes.
    - No complex data entry; focus on visual impact.
- **Responsiveness:**
    - Fluid layout that adapts to container width, recalculating font sizes on window resize.

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
