# Design System Strategy: The Gentle Garden

## 1. Overview & Creative North Star
**Creative North Star: "Hokkori Modernism"**
This design system moves beyond the "cute" aesthetic to embrace a sophisticated, high-end interpretation of Japanese naturalism. We are not just building an app; we are cultivating a digital garden. The goal is "Hokkori"—a Japanese term for a warm, fluffy, and relieved feeling. 

To break the "standard template" look, this system rejects the rigid, boxy layouts of traditional material design. Instead, we utilize **intentional asymmetry**, **organic layering**, and **tonal depth**. Elements should feel like smooth river stones or soft linen pages stacked on a wooden desk. We achieve a premium feel by prioritizing extreme negative space (breathing room) over structural lines.

## 2. Colors & Surface Philosophy
The palette is rooted in the earth, the sky, and the sun. It is designed to feel "analog" and tactile.

### The Color Tokens
*   **Primary (`#326a35`) & Primary Container (`#7cb87a`):** Our Sage Green. Used for growth, action, and success.
*   **Secondary (`#705b3e`):** Sand Beige/Wood tones. Used for grounding elements.
*   **Tertiary (`#875218`):** Warm Amber. Used for accents that need to "pop" without feeling aggressive.
*   **Surface Hierarchy:**
    *   `surface` (`#fff8f4`): The base canvas.
    *   `surface-container-low` (`#fff1e6`): For subtle content grouping.
    *   `surface-container-highest` (`#f2dfce`): For high-importance interaction areas.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` card sitting on a `surface` background creates a natural, soft boundary that feels premium and "integrated" rather than "constructed."

### The Glass & Gradient Rule
To add visual "soul," avoid flat blocks of color for large hero areas.
*   **Signature Gradients:** Use a subtle linear gradient from `primary-container` to `primary` (top-left to bottom-right) for primary CTAs. This creates a "plump," 3D feel.
*   **Glassmorphism:** For floating navigation bars or overlays, use `surface-container-lowest` with an 80% opacity and a `backdrop-blur-md`. This allows the "garden" colors below to bleed through softly.

## 3. Typography: The Friendly Authority
We use a dual-font approach to balance cheerfulness with professional clarity.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Statement" pieces. Use **Bold** and **Extrabold** weights. The wide apertures and rounded terminals of Plus Jakarta Sans echo the "rounded-3xl" shape language of our components.
*   **Body & Titles (Be Vietnam Pro):** A highly legible sans-serif that maintains a modern, clean edge. It prevents the UI from looking "childish" by providing a structured, editorial contrast to the playful headlines.
*   **Hierarchy Note:** Use `display-lg` for hero moments with wide letter-spacing (-0.02em) to create an expensive, curated magazine feel.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often a "cheap" way to create depth. In this system, we use **Tonal Layering** first.

### The Layering Principle
Think of the UI as a series of nested trays. 
1.  **Level 0 (Base):** `surface`
2.  **Level 1 (Section):** `surface-container-low`
3.  **Level 2 (Interaction):** `surface-container-highest` or `surface-container-lowest` (for cards).

### Ambient Colored Shadows
When a physical "lift" is required (like a floating action button), use **Ambient Shadows**. Instead of grey, use a tinted version of the surface it sits on or the component's own color.
*   **Green Button Shadow:** `0 20px 40px -12px rgba(124, 184, 122, 0.3)`
*   **General Card Shadow:** `0 12px 30px -10px rgba(61, 50, 38, 0.08)` (A 8% opacity Warm Charcoal).

### The "Ghost Border" Fallback
If accessibility requires a border (e.g., in high-contrast modes), use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

## 5. Components & Primitives

### Buttons (The "Plump" Style)
*   **Primary:** `primary-container` background with `on-primary-container` text. Radius: `xl` (3rem). 
*   **Interaction:** On hover, the button should scale slightly (`scale-105`) and the shadow should deepen. Avoid color changes; prioritize "physical" feedback.
*   **Sizing:** Padding should be generous (e.g., `px-6 py-3`).

### Input Fields
*   **Style:** `surface-container-highest` background, no border.
*   **Shape:** `rounded-lg` (2rem).
*   **Focus State:** A 2px "Ghost Border" using `primary` at 40% opacity and a soft inner glow.

### Cards & Lists
*   **Constraint:** **Forbid divider lines.** 
*   **Execution:** Separate list items using `spacing-3` (1rem) of vertical white space or by alternating background tints between `surface` and `surface-container-low`.
*   **Shape:** Cards must always use `rounded-xl` (3rem) for a friendly, approachable silhouette.

### Signature Component: The "Leaf Navigation"
Instead of a standard bottom nav, use a floating dock with a `backdrop-blur` and `rounded-full` shape. Use `lucide-react` icons with a stroke width of `2.5px` to match the boldness of the typography.

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Place an image slightly off-center or let a card overlap two different background sections.
*   **Use Natural Spacing:** Use `spacing-12` or `spacing-16` between major sections. Generous white space is the hallmark of luxury.
*   **Tone-on-Tone:** Use `on-surface-variant` for secondary text to keep the contrast soft and "gentle" on the eyes.

### Don’t:
*   **No Pure Black:** Never use `#000000`. Always use `on-background` (`#231a0f`) for text to maintain the "Warm Charcoal" feel.
*   **No Sharp Corners:** Avoid `rounded-none` or `rounded-sm`. Everything should feel safe to touch.
*   **No "Flashy" Animations:** Transitions should be `ease-out` and slightly slower (300ms-400ms) to mimic the slow pace of a garden.

---
**Director's Final Note:** 
This system succeeds when the user feels they can "breathe" while using the app. Every click should feel soft, and every screen should feel like a fresh start. Design for the soul, not just the task.