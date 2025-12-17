# Non-Linear Life Calendar - Requirements Document

## 1. Project Overview
**Name:** [Project Name - TBD]
**Type:** Single-Page Web App (SPA)
**Goal:** Visualize a human life (DoB to 80 years) as a timeline where the visual space allocated to time shrinks as the user ages, representing the subjective acceleration of time perception.

## 2. Product Vision
- **Aesthetic:** Minimalistic, sleek, high-end "widget" feel.
- **Emotion:** Philosophical, contemplative.
- **Interaction:** One-click drill-down (Life -> Year).

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
- **Life View (Layer 1):** 
    - Rendered as rounded blocks (80px height) in a stacked card.
    - **Adaptive Typography:** Year numbers scale their font size dynamically based on the available width of the block.
    - **Highlighting:** The block representing the user's current year is clickable.
- **Year View (Layer 2):**
    - Toggles immediately below Layer 1 as a separate rounded card.
    - **Visualization:** A dense "barcode" of ~365 days.
    - **Color Logic:** Interpolates the gradient of the selected year into 365 steps.
    - **Past Days:** Darkened to represent elapsed time.
    - **Future Days:** Standard gradient.
- **Day View (Layer 3):**
    - Toggles immediately below Layer 2 as a separate rounded card.
    - **Visualization:** 24 weighted bars representing hours.
    - **Interaction:** Triggered by selecting a specific day in Layer 2.

## 4. UI/UX Requirements
- **Visual Style:**
    - Stacked "Card" layout: Independent rounded bars (border-radius 12px) with small vertical separation.
    - High-end dark mode aesthetic.
- **Responsiveness:**
    - Fluid layout that adapts to container width.

## 5. Technical Constraints
- **Stack:** HTML5, CSS (Flexbox), Vanilla JS.
- **Performance:**
    - DOM complexity managed by only rendering current views.
    - Smooth entry animations for Layer 2.

## 6. Implementation Plan Draft
1.  [x] **Core Logic:** Implement the Logarithmic sizing function.
2.  [x] **L1 View:** Build the Life View Grid (Stacked Card).
3.  [x] **L2 View:** Build the Year View (Day Barcode).
4.  [x] **L3 View:** 24-Hour View.
5.  [ ] **Polish:** Mobile responsiveness tweaks.
