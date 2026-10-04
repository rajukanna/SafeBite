# 🥗 SafeBite Desktop — Allergen-Safe Smart Meal Planner

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

---

## What I Built

**SafeBite** is a full-featured, zero-anxiety desktop meal planner built specifically for my friend **Buddy**, who suffers from severe dietary triggers and allergies to three of the most pervasive staples in Indian and vegetarian cuisine:
1. 🚫 **Paneer (Indian Cottage Cheese)**
2. 🚫 **Curd / Dahi (Yogurt)**
3. 🚫 **Brinjal / Baingan (Eggplant / Aubergine)**

### The Problem It Solves
For someone with these specific intolerances, deciding what to eat every single day is a stressful minefield. In traditional home cooking and restaurant menus, paneer, curd, and brinjal are frequently hidden — blended into makhani gravies, used to tenderize marinades, whisked into chaats, or roasted into mixed vegetable curries. 

My friend was experiencing chronic decision fatigue, repeated accidental exposures, and the frustration of repetitive, bland meals.

### The Solution: SafeBite
SafeBite transforms daily meal planning from a chore into a joy:
- **100% Active Allergen Guard:** Every single recipe and suggested meal plan is mathematically and culinarily audited to ensure zero trace of Paneer, Curd, or Brinjal.
- **One-Click Auto-Plan Safe Week:** Automatically populates 28 balanced meal slots (Breakfast, Lunch, Snack, Dinner across Monday–Sunday) in one click with zero allergen overlap.
- **Culinary Substitution Playbook:** Embedded guidance on how to substitute textures and flavours without feeling like you're missing out (e.g., golden pan-seared turmeric tofu for paneer, tangy blended cashew-lemon cream for curd, and roasted tender zucchini for brinjal).
- **Consolidated Grocery List & 1-Click WhatsApp Export:** Aggregates weekly ingredients into a categorized shopping list that can be copied directly into WhatsApp or printed for a hassle-free market run.
- **Warm, Calming Desktop Aesthetic:** Crafted with warm cream, apricot, and deep forest teal accents with high-res food photography, instant slot swapping, and persistent offline storage.

---

## Demo

- **Live Repository:** [github.com/rajukanna/SafeBite](https://github.com/rajukanna/SafeBite)
- **Zero-Setup Double Click:** Open [`[index.html](https://rajukanna.github.io/SafeBite/)`](index.html) directly in any modern browser (Chrome, Edge, Brave, Firefox, Safari).
- **Windows Desktop App (PWA):** SafeBite includes a complete `manifest.json` — open in Edge or Chrome and click **"Install SafeBite"** to run it as a standalone, borderless Windows desktop application with taskbar pinning.
- **Native Desktop Window (Electron):** Run `npm start` to launch SafeBite as an independent 1280×820 desktop window.

---

## Code

The complete source code is hosted on GitHub:

👉 **[https://github.com/rajukanna/SafeBite](https://github.com/rajukanna/SafeBite)**

```
rajukanna/SafeBite
├── index.html        # Desktop workspace layout (Sidebar, Recipe Grid, Planner, Profile, Modals)
├── css/
│   └── styles.css    # Responsive design system, warm apricot/cream palette, glassmorphism
├── js/
│   ├── recipes.js    # Curated allergen-safe recipe database with macro stats & instructions
│   ├── app.js        # Screen navigation, LocalStorage persistence, modal controllers
│   └── planner.js    # Weekly scheduling engine, grocery aggregation & WhatsApp formatter
├── main.js           # Electron desktop wrapper
├── manifest.json     # PWA desktop installation manifest
└── package.json      # Dependencies and desktop startup scripts
```

---

## How I Built It

SafeBite was engineered using an agentic AI pair programming workflow alongside modern, standards-based web technologies:

1. **AI-Assisted Culinary Knowledge Engineering:**
   - Designed a safe recipe matrix auditing Indian and global comfort dishes against the three allergen triggers.
   - Built algorithmic swap logic that pairs dishes with culinary replacements preserving authentic taste and mouthfeel (e.g., using cashew cream and tamarind in Velvet Dal Makhani instead of butter and cream, or pumpkin and drumstick in Idli Sambar instead of eggplant).
2. **Vanilla Web Architecture (Zero Runtime Bloat):**
   - Built with pure Semantic HTML5, Vanilla JavaScript (ES6+), and CSS custom properties.
   - Zero heavy framework overhead — loads instantly with 0ms compilation delays.
3. **Local-First & Offline Resilience:**
   - Full state persistence (`localStorage`) saves weekly schedules, bookmarked recipes, and custom allergen profiles locally on the device.
   - Native fallback image handlers (`onerror`) ensure that recipe visuals load seamlessly under any network condition.
4. **Desktop-Grade UX:**
   - Left-hand persistent navigation sidebar with live Allergen Guard status.
   - Split-screen weekly planner with interactive meal swapping.
   - Recipe inspection modal with 3 warm stat pills (*Prep Time, Servings, Calories*), ingredient checklists, and step-by-step cooking methods.

---

## Why Does Open Innovation Matter?

Dietary restrictions, food allergies, and health concerns are deeply personal. When healthcare or wellness tools are locked behind closed proprietary APIs or costly subscription paywalls:
1. **Privacy is Compromised:** Users are forced to upload personal medical and dietary data to remote corporate servers.
2. **One-Size-Fits-All Fails:** Closed commercial apps cater only to generic Western diet categories (e.g., "Keto", "Gluten-Free") and completely ignore cultural, regional dietary sensitivities like Paneer, Curd, or Baingan.
3. **Open Innovation Empowers Communities:** By making SafeBite open-source, anyone in the community can fork this project to protect their own family members or friends — whether they need an onion/garlic-free Jain meal planner, a nut-free kid's lunchbox scheduler, or a nightshade-free autoimmune diet manager.

Open innovation proves that software built with love for one friend can instantly become a template that helps thousands.

---

## My Agent Session

Developed iteratively with **Google DeepMind Antigravity AI**, moving from visual design mockups to a full desktop layout, allergen safety verification, culinary substitution playbook, and instant grocery exports.

---

## Prize Categories

- **Hacktoberfest Weekend Challenge: Build for a Friend**
- **Most Helpful & Life-Impact Project**
- **Best Open-Source Desktop & Web Tool**

---

## 📖 Complete Feature Guide

### 1. 🛡️ 100% Active Allergen Shield
Persistent protection against:
- 🚫 **Paneer:** 0% paneer used across all recipes; replaced with high-protein organic tofu or boiled chickpeas.
- 🚫 **Curd / Dahi:** 0% yogurt or curd marinades; replaced with tangy cashew-lemon puree or coconut cream.
- 🚫 **Brinjal / Baingan:** 0% eggplant; replaced with tender roasted zucchini, lauki (bottle gourd), or mushrooms.

### 2. 🍲 Curated Recipe Discovery (16 Custom Dishes)
Filter dishes by meal time:
- **Breakfast:** Avocado Chickpea Toast, Moong Dal Chilla Crepes, Classic Indori Poha, Steamed Idli with Drumstick Sambar.
- **Lunch:** Creamy Palak Tofu, Amritsari Chana Masala, Kashmiri Rajma Bowl, Crispy Bhindi Do Pyaza.
- **Snacks:** Roasted Makhana Crunch, **Sweet Potato Wedges & Guac**, Sweet Corn & Pepper Chaat.
- **Dinner:** Velvet Dal Makhani (Cashew Cream), Matar Tofu Curry, Thai Red Coconut Curry, Sesame Garlic Soba Noodles, Golden Lauki Kofta Curry.

### 3. 📅 Interactive Weekly Planner (Split-View)
- Switch between days (Mon–Sun) with instant slot updates.
- One-click **"⚡ Auto-Fill Full Week"** to generate 28 verified meals.
- Quick **"Swap"** button on any slot to cycle through safe alternatives.
- **"Shuffle Today's Meals"** for fast daily variety.

### 4. 📚 Culinary Substitution Playbook
Quick-reference guide built into the Buddy Profile:
| Trigger | Safe Culinary Alternative | Why It Works |
| :--- | :--- | :--- |
| **Paneer** | Pan-Seared Firm Tofu or Kabuli Chana | Identical texture, absorbs gravies like sponge, rich in protein |
| **Curd / Dahi** | Cashew Paste + Lemon Juice or Coconut Milk | Provides velvety thickness and lactic-style tang with zero dairy |
| **Brinjal** | Sliced Zucchini or Bottle Gourd (Lauki) | Perfect moisture balance and tenderness without solanine/nightshade irritants |

### 5. 🛒 Consolidated Grocery Aggregator & WhatsApp Share
- Consolidates all ingredients across the 7-day plan.
- Removes duplicate items and formats quantities clearly.
- **1-Click WhatsApp Copy:** Formats a clean shopping list ready to paste directly into WhatsApp or messaging apps:
  ```text
  🛒 SafeBite Grocery List for Buddy
  🛡️ 100% Free of Paneer, Curd & Brinjal

  Produce:
  • 2 Sweet potatoes
  • 1 Avocado & 2 Limes
  • 1 bunch Fresh spinach
  • 1 Zucchini

  Pantry & Protein:
  • 200g Firm Tofu
  • 1 cup Chickpeas (Kabuli Chana)
  • 1/2 cup Cashews (for dairy-free cream)
  ```

---

## 🚀 Running Locally

### Option 1: Browser (Zero Setup)
Simply double-click or open [index.html](index.html) in your favorite browser.

### Option 2: Progressive Web App (PWA)
1. Open [index.html](index.html) in Microsoft Edge or Google Chrome.
2. Click the **Install** icon in the address bar.
3. SafeBite will launch in a clean, standalone desktop window.

### Option 3: Electron Desktop Window
If you have Node.js installed:
```bash
git clone https://github.com/rajukanna/SafeBite.git
cd SafeBite
npm install
npm start
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE). Built with ❤️ for Buddy during Hacktoberfest.
