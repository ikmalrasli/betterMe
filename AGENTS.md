# Master Product Requirements Document (PRD) & Engineering Blueprint
## Project Title: "betterME" (Working Title)
## Document Status: BASELINE MASTER PLAN
## Last Updated: 2026-06-14

---

## 1. Executive Summary & Philosophy
"The One Thing" is a hyper-focused iOS habit tracking application built using React Native. Unlike traditional productivity trackers that encourage users to manage multiple habits simultaneously—leading to cognitive overload and fragmented focus—this app strictly enforces a **single-habit constraint**. 

Inspired by James Clear’s *Atomic Habits*, the fundamental product philosophy is built on identity transformation: **"Who do you want to become?"** rather than **"What task do you want to complete?"**

### Core Pillars:
1. **Absolute Monotasking:** The user can track exactly **one** habit at a time. The entire application experience revolves around this choice.
2. **Identity-Driven UX:** The habit is framed as a self-identity (e.g., *"I am becoming a Non-Smoker"*).
3. **Friction-Based Behavioral Loops:** Quitting or changing a habit introduces structural and psychological friction, forcing the user to commit or consciously accept failure.

---

## 2. Core Architecture & Product Roadmap

The application development is split into a multi-phased roadmap. This master document outlines the full product specification, while explicitly separating the initial **Minimum Viable Product (MVP)** from the **v2.0 Production Release**.

```

```
                       [ APP ARCHITECTURE OVERVIEW ]
                                     │
           ┌─────────────────────────┼────────────────────────┐
           ▼                         ▼                        ▼
    [ HOME SCREEN ]          [ STATS SCREEN ]        [ SETTINGS SCREEN ]
   (The Daily Grind)        (The Big Picture)         (The System Control)
           │                         │                        │
   ┌───────┴───────┐                 │                ┌───────┴───────┐
   ▼               ▼                 ▼                ▼               ▼

```

[Identity]       [Calendar]       [Monthly Cards]   [Mastered]      [Graveyard]
[Badges]         [MicroStats]     [Trend Indices]   [Graduation]    [Surrender]

```

### 2.1 The Positive vs. Negative Habit Mechanic
The application approaches behavior design through two discrete lenses, adapting its terminology and color psychology dynamically:
* **Good Habit (Building):** Focuses on positive reinforcement and behavioral consistency (e.g., *"Reading"*). Tapping a date logs a **DONE** state (🟢 Green) or a **MISSED** state (🔴 Red/Blank).
* **Bad Habit (Breaking):** Focuses on abstinence, impulse control, and addiction metrics (e.g., *"Smoking"*). Tapping a date logs an **AVOIDED/SOBER** state (🟢 Green) or a **RELAPSED/FAILED** state (🔴 Red).

---

## 3. Comprehensive Target Features (v1.0 & v2.0)

### 3.1 Onboarding Flow (First-Time Experience)
* **Screen 1: The Identity Query:** A minimalist typography-focused screen asking: *"Who do you want to become?"* Includes a text input field (e.g., "A Reader", "A Runner", "A Non-Smoker").
* **Screen 2: Behavior Type Selection:** A simple segmented control or binary toggle option:
    * `[ Build 🟢 ]` (Positive Reinforcement)
    * `[ Break 🔴 ]` (Abstinence Tracking)
* **Screen 3: Initializing Commitment:** Displays an affirmative summary: *"Awesome. Your 66-day journey starts today."* with a large call-to-action button `[ START JOURNEY ]`.

### 3.2 Tab 1: Home Screen (The Daily Grind Tracker)
The central operational nexus of the application.
* **Identity Header:** Bold typography stating the current active identity, e.g., `"I am becoming a Non-Smoker"`.
* **Progress Track (v2.0):** A horizontal loading track tracking progression towards the 66-day habit maturity limit.
* **Milestone Badges (v2.0):** Five small translucent ghost icons reflecting continuous survival durations: `3 Days`, `7 Days`, `14 Days`, `30 Days`, and `66 Days`. They permanently light up via a soft glow when their conditions are achieved.
* **Interactive Current Month Calendar:** A clean, borderless 7-column grid showing only the dates belonging to the current month.
    * *Tap Action:* Tapping the cell matching today's date cycles the entry state: `Unmarked` ➡️ `Success (Green)` ➡️ `Failure (Red)`.
    * *Haptic Integration:* Incorporates native device iOS haptic engines (`Taptic Engine`) to trigger sharp tactile feedback upon marking a success.
* **Micro-Stats Dashboard:** A horizontal grid showing real-time calculations:
    * **Win Rate:** `(Successful Days / Days Elapsed in Current Month) * 100` represented as a percentage.
    * **Current Streak:** Number of consecutive success days directly preceding the current date.
    * **Longest Streak (v2.0):** The historical maximum streak recorded during this specific habit’s active lifecycle.

### 3.3 Tab 2: Stats Screen (The Big Picture - v2.0 Only)
A dedicated historical dashboard accessible via bottom tabs to track long-term behavior modification.
* **Trend Indicator:** Text-based analytical summary comparison, e.g., *"You are 12% more consistent this month than last month."*
* **Monthly Aggregation Cards:** A scrollable vertical column showing summary metrics for previous months:
    ```text
    ┌──────────────────────────────────────────────┐
    │ June 2026                                    │
    │ 88% Success Rate   │   14 Day Max Streak     │
    └──────────────────────────────────────────────┘
    ```

### 3.4 Tab 3: Settings & Systems Control
The control deck for administering habit states.
* **The Graduation Matrix (v2.0):** Tracks the structural requirements remaining to achieve total "Maturity" and unlock a new slot.
    * *Maturity Equation:* A habit is considered "Mastered" when `Total Days Tracking >= 66` AND `Lifetime Win Rate >= 85%` AND `Current Streak >= 14 Days`.
* **The Vault Records (v2.0):**
    * **Mastered Identities Menu:** Links to an archive celebrating successfully completed habit cycles ("Identity Capital").
    * **The Graveyard Menu:** Links to a dark, greyed-out log tracking aborted or abandoned habit cycles, acting as a historical psychological penalty tool.
* **The Surrender Protocol (v2.0 Structural Friction):** A red-themed terminal interface used to abandon a habit prematurely. It forces a 3-second long-press validation gesture alongside a modal prompt confirming entry into the permanent Graveyard.

---

## 4. The Minimum Viable Product (MVP) Scope

To enable rapid deployment and validate the core interactive feedback loop, the app will launch with a stripped-down, highly focused MVP footprint. **All features marked as (v2.0) above are completely excluded from the MVP scope.**

### 4.1 MVP Feature Checklist
1. **Streamlined Local Onboarding:** Single screen setup capturing `Habit Name` and `Habit Type` (Good/Bad).
2. **Single Habit Execution State:** System locks into tracking only that single habit.
3. **Home Screen Grid Interface:** Displays active identity header, current calendar grid, and basic calculations.
4. **Interactive Toggling:** Users can tap today's cell to switch between `Success (Green)` and `Failure (Red)`.
5. **Basic Micro-Stats Bar:** Dynamic tracking of `Win Rate %` and `Current Streak` based purely on the current active tracking data.
6. **2-Tab Layout Navigation:** Bottom Navigation bar containing only `Home` and `Settings`.
7. **Manual Control Release:** Settings contains a simple, direct `[ Reset / Change Habit ]` button that purges the active habit database cache, sending the user back to Onboarding (completely bypassing the automated 66-day progression rule and Graveyard mechanics for MVP speed).

---

## 5. Technical Specifications & Implementation Plan

### 5.1 Tech Stack Architecture
* **Framework:** React Native (Core / Native Components)
* **Navigation Routing:** `@react-navigation/native` with `@react-navigation/bottom-tabs`
* **Data Persistence:** `@react-native-async-storage/async-storage`
* **Device Feedback:** Native platform haptics hooks

### 5.2 Proposed Data Model Schema (`AsyncStorage`)
The entire application operates over a flat local JSON payload keyed under a single namespace token (e.g., `@the_one_thing_storage`), maximizing runtime performance and zero-dependency efficiency.

```json
{
  "activeHabit": {
    "name": "Non-Smoker",
    "type": "negative",
    "startDate": "2026-06-14",
    "history": {
      "2026-06-12": "success",
      "2026-06-13": "failed",
      "2026-06-14": "success"
    }
  },
  "archive": []
}

```

### 5.3 MVP State Engine & Mathematical Logic

AI Coding agents must evaluate tracking computations at every render cycle using the following pseudocode guidelines:

* **Win Rate calculation:**

$$\text{Win Rate} = \left( \frac{\text{Count of 'success' in history}}{\text{Total entries recorded in history}} \right) \times 100$$


* **Current Streak calculation:**
Iterate backwards starting from today (`YYYY-MM-DD`). Count consecutive keys containing the value `"success"`. Break the iteration loop immediately upon encountering a `"failed"` string or an unrecorded day gap.

---

## 6. MVP Step-by-Step Execution Blueprints for AI Agents

When executing the codebase builds, AI agents must complete these implementation blocks sequentially:

### Step 1: Framework Scaffolding & Navigation Routing

* Initialize clean React Native structure.
* Configure `@react-navigation/native` with a bottom tab layout comprising two tabs: `Home` and `Settings`.
* Implement a conditional landing controller checking if a valid habit payload exists inside storage. If empty, mount the `Onboarding` modal view layer; else, mount the functional root tab stack.

### Step 2: Storage Architecture & Onboarding UI

* Construct the text inputs and state buttons for the onboarding template.
* Tie the submission event to a storage write operation mapping out the standard baseline JSON configuration.
* Connect a local state listener forcing app re-routing immediately upon storage confirmation.

### Step 3: Current Month Calendar Rendering

* Build a lightweight 7-column calendar engine using standard native views (`View`, `Text`, `TouchableOpacity`).
* Resolve current calendar month configurations (calculate days in month, starting day index offset).
* Parse the tracking `history` data payload. Inject corresponding hexadecimal styling values (e.g., Success = vibrant green, Failure = muted deep red) into cell components depending on status parameters.

### Step 4: UI Interaction, State Updates & Calculations

* Bind an `onPress` callback handler to today's date block.
* Code the cycle logic: `null` ➡️ `"success"` ➡️ `"failed"`. Save results straight to local storage arrays.
* Write pure utility functions executing streak updates and percentage divisions to automatically update text vectors embedded inside the micro-stats panels.