/**
 * SafePlate Planner Engine
 * Handles State Management, Auto-Scheduling, Allergen Enforcement,
 * Nutritional Calculation, and Grocery Aggregation.
 */

const DAYS_OF_WEEK = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" }
];

const MEAL_SLOTS = [
  { id: "breakfast", label: "Breakfast", icon: "🌅", time: "8:00 AM - 9:30 AM" },
  { id: "lunch", label: "Lunch", icon: "☀️", time: "1:00 PM - 2:00 PM" },
  { id: "snack", label: "Evening Snack", icon: "☕", time: "5:00 PM - 6:00 PM" },
  { id: "dinner", label: "Dinner", icon: "🌙", time: "8:00 PM - 9:30 PM" }
];

class PlannerEngine {
  constructor() {
    this.buddyName = "My Buddy";
    this.coreAllergens = ["Paneer", "Curd / Dahi", "Brinjal / Baingan"];
    this.customAllergens = [];
    this.activeDay = "monday";
    this.weeklyPlan = {};
    this.groceryList = [];

    this.loadFromStorage();

    // If weekly plan is empty, generate initial safe plan
    if (Object.keys(this.weeklyPlan).length === 0) {
      this.autoPlanWeek();
    }
  }

  // Active allergen list
  getAllActiveAllergens() {
    return [...this.coreAllergens, ...this.customAllergens];
  }

  addCustomAllergen(allergenName) {
    const clean = allergenName.trim();
    if (!clean) return false;
    
    // Check if already in list
    if (this.getAllActiveAllergens().some(a => a.toLowerCase() === clean.toLowerCase())) {
      return false;
    }
    
    this.customAllergens.push(clean);
    this.saveToStorage();
    return true;
  }

  removeCustomAllergen(allergenName) {
    this.customAllergens = this.customAllergens.filter(a => a.toLowerCase() !== allergenName.toLowerCase());
    this.saveToStorage();
  }

  toggleCoreAllergen(allergenName) {
    const idx = this.coreAllergens.findIndex(a => a.toLowerCase() === allergenName.toLowerCase());
    if (idx > -1) {
      this.coreAllergens.splice(idx, 1);
    } else {
      this.coreAllergens.push(allergenName);
    }
    this.saveToStorage();
  }

  // Filter recipes by safety against active allergens
  getSafeRecipes(category = null) {
    const active = this.getAllActiveAllergens();
    return RECIPE_DATABASE.filter(recipe => {
      if (category && recipe.category !== category) return false;
      const evalResult = evaluateRecipeSafety(recipe, active);
      return evalResult.isSafe;
    });
  }

  // Get recipe by ID
  getRecipeById(id) {
    return RECIPE_DATABASE.find(r => r.id === id) || null;
  }

  // Auto-generate full safe week plan
  autoPlanWeek() {
    const safeBf = this.getSafeRecipes("breakfast");
    const safeLu = this.getSafeRecipes("lunch");
    const safeSn = this.getSafeRecipes("snack");
    const safeDi = this.getSafeRecipes("dinner");

    DAYS_OF_WEEK.forEach((day, dayIndex) => {
      this.weeklyPlan[day.id] = {
        breakfast: safeBf[dayIndex % safeBf.length]?.id || safeBf[0]?.id,
        lunch: safeLu[dayIndex % safeLu.length]?.id || safeLu[0]?.id,
        snack: safeSn[dayIndex % safeSn.length]?.id || safeSn[0]?.id,
        dinner: safeDi[dayIndex % safeDi.length]?.id || safeDi[0]?.id
      };
    });

    this.saveToStorage();
    this.syncGroceryList();
  }

  // Swap a specific meal slot
  setMeal(dayId, slotId, recipeId) {
    if (!this.weeklyPlan[dayId]) {
      this.weeklyPlan[dayId] = {};
    }
    this.weeklyPlan[dayId][slotId] = recipeId;
    this.saveToStorage();
  }

  // Shuffle a single day or entire week
  shufflePlan(dayId = null) {
    const safeBf = this.getSafeRecipes("breakfast");
    const safeLu = this.getSafeRecipes("lunch");
    const safeSn = this.getSafeRecipes("snack");
    const safeDi = this.getSafeRecipes("dinner");

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]?.id;

    if (dayId) {
      this.weeklyPlan[dayId] = {
        breakfast: getRandom(safeBf),
        lunch: getRandom(safeLu),
        snack: getRandom(safeSn),
        dinner: getRandom(safeDi)
      };
    } else {
      DAYS_OF_WEEK.forEach(day => {
        this.weeklyPlan[day.id] = {
          breakfast: getRandom(safeBf),
          lunch: getRandom(safeLu),
          snack: getRandom(safeSn),
          dinner: getRandom(safeDi)
        };
      });
    }

    this.saveToStorage();
    this.syncGroceryList();
  }

  // Calculate day macros
  getDayMacros(dayId) {
    const plan = this.weeklyPlan[dayId] || {};
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    MEAL_SLOTS.forEach(slot => {
      const recId = plan[slot.id];
      if (recId) {
        const recipe = this.getRecipeById(recId);
        if (recipe) {
          calories += recipe.calories || 0;
          protein += recipe.protein || 0;
          carbs += recipe.carbs || 0;
          fat += recipe.fat || 0;
        }
      }
    });

    return { calories, protein, carbs, fat };
  }

  // Calculate week averages
  getWeekAverages() {
    let totalCal = 0;
    let totalProt = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    const daysCount = DAYS_OF_WEEK.length;

    DAYS_OF_WEEK.forEach(d => {
      const m = this.getDayMacros(d.id);
      totalCal += m.calories;
      totalProt += m.protein;
      totalCarbs += m.carbs;
      totalFat += m.fat;
    });

    return {
      avgCalories: Math.round(totalCal / daysCount),
      avgProtein: Math.round((totalProt / daysCount) * 10) / 10,
      avgCarbs: Math.round(totalCarbs / daysCount),
      avgFat: Math.round(totalFat / daysCount)
    };
  }

  // Helper to normalize and consolidate ingredients cleanly
  normalizeIngredient(rawIng) {
    if (!rawIng) return "";
    let str = rawIng.split("(")[0].trim();
    // Remove quantity numbers, fractions and units from start
    str = str.replace(/^[\d\s\/\.\-]+(cups?|tbsp|tsp|pinch|cans?|cloves?|sprigs?|bunch|slices?|heads?|pieces?|g|kg|inch|medium|large|small)?\s*(of)?\s*/i, "").trim();
    // Remove common preparation adjectives from start
    str = str.replace(/^(fresh|warm|cold-pressed|finely\s+chopped|chopped|minced|diced|grated|raw|boiled|sliced|roasted|toasted|steamed|crushed)\s+/i, "").trim();
    // Strip trailing commas or notes
    str = str.replace(/,.*$/, "").trim();
    
    if (str.length > 1) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }

  // Synchronize Grocery List from weekly plan
  syncGroceryList() {
    const categoryMap = {
      "Produce": [
        "spinach", "palak", "onion", "tomato", "ginger", "garlic", "coriander", 
        "lemon", "lime", "bhindi", "okra", "avocado", "bell pepper", "capsicum", 
        "peas", "beetroot", "carrots", "corn", "methi", "cucumber", "pomegranate", 
        "zucchini", "lauki", "bottle gourd", "cauliflower", "mint", "curry leaves",
        "bok choy", "mushroom", "sweet potato"
      ],
      "Proteins & Pulses": [
        "tofu", "chickpeas", "chana", "rajma", "moong dal", "toor dal", 
        "urad dal", "soya chunks", "peanuts", "cashews", "besan", "pumpkin seeds",
        "almonds", "walnuts", "falafel"
      ],
      "Grains & Bread": [
        "poha", "rice", "basmati", "bread", "sourdough", "wheat flour", "atta", 
        "idli", "phulkas", "sev", "breadcrumbs", "soba", "quinoa", "semolina", "rava", "ragi"
      ],
      "Safe Dairy Alts": [
        "cashew paste", "cashew cream", "coconut milk", "almond milk", "coconut yogurt", "tahini"
      ],
      "Pantry & Spices": [
        "turmeric", "cumin", "jeera", "mustard seeds", "hing", "garam masala", 
        "chili powder", "kasuri methi", "oil", "tamarind", "chaat masala", "salt", 
        "sesame", "ajwain", "saffron", "thai red curry", "soy sauce", "papad", "anardana",
        "amchur", "saunf", "saunth", "pepper", "kadhai masala"
      ]
    };

    // Keep existing manually added custom items
    const manualItems = this.groceryList.filter(item => !item.fromPlan);

    const ingredientCounts = {};

    DAYS_OF_WEEK.forEach(day => {
      const plan = this.weeklyPlan[day.id] || {};
      MEAL_SLOTS.forEach(slot => {
        const recId = plan[slot.id];
        if (recId) {
          const rec = this.getRecipeById(recId);
          if (rec && rec.ingredients) {
            rec.ingredients.forEach(rawIng => {
              const clean = this.normalizeIngredient(rawIng);
              if (clean && clean.length > 2) {
                ingredientCounts[clean] = (ingredientCounts[clean] || 0) + 1;
              }
            });
          }
        }
      });
    });

    const newPlanItems = [];
    Object.keys(ingredientCounts).sort().forEach(ingName => {
      let matchedCategory = "Pantry & Spices";
      const lower = ingName.toLowerCase();

      for (const [cat, keywords] of Object.entries(categoryMap)) {
        if (keywords.some(k => lower.includes(k))) {
          matchedCategory = cat;
          break;
        }
      }

      newPlanItems.push({
        id: "ing_" + btoa(unescape(encodeURIComponent(ingName))).substring(0, 10),
        name: ingName,
        category: matchedCategory,
        frequency: ingredientCounts[ingName],
        checked: false,
        fromPlan: true
      });
    });

    this.groceryList = [...newPlanItems, ...manualItems];
    this.saveToStorage();
  }

  addManualGroceryItem(name, category = "General") {
    if (!name.trim()) return;
    this.groceryList.push({
      id: "manual_" + Date.now(),
      name: name.trim(),
      category: category,
      frequency: 1,
      checked: false,
      fromPlan: false
    });
    this.saveToStorage();
  }

  toggleGroceryItem(id) {
    const item = this.groceryList.find(i => i.id === id);
    if (item) {
      item.checked = !item.checked;
      this.saveToStorage();
    }
  }

  removeGroceryItem(id) {
    this.groceryList = this.groceryList.filter(i => i.id !== id);
    this.saveToStorage();
  }

  // Persistence
  saveToStorage() {
    try {
      const state = {
        buddyName: this.buddyName,
        coreAllergens: this.coreAllergens,
        customAllergens: this.customAllergens,
        weeklyPlan: this.weeklyPlan,
        groceryList: this.groceryList,
        activeDay: this.activeDay
      };
      localStorage.setItem("safeplate_buddy_state_v1", JSON.stringify(state));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem("safeplate_buddy_state_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.buddyName) this.buddyName = parsed.buddyName;
        if (parsed.coreAllergens) this.coreAllergens = parsed.coreAllergens;
        if (parsed.customAllergens) this.customAllergens = parsed.customAllergens;
        if (parsed.weeklyPlan) this.weeklyPlan = parsed.weeklyPlan;
        if (parsed.groceryList) this.groceryList = parsed.groceryList;
        if (parsed.activeDay) this.activeDay = parsed.activeDay;
      }
    } catch (e) {
      console.warn("Storage load failed:", e);
    }
  }
}
