/**
 * SafeBite Desktop Controller
 * Handles desktop navigation, sidebar states, recipe filtering,
 * weekly planner split-view, grocery list, and desktop modal dialogs.
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  const state = {
    buddyName: "Buddy's Kitchen",
    allergens: ["Paneer", "Curd / Dahi", "Brinjal / Baingan"],
    activeScreen: "screenHome",
    activeCategory: "all",
    activeDay: "monday",
    savedRecipeIds: new Set(),
    selectedRecipeForModal: null,
    weeklyPlan: {
      monday: { breakfast: "r1", lunch: "r5", snack: "r9", dinner: "r12" },
      tuesday: { breakfast: "r2", lunch: "r6", snack: "r10", dinner: "r13" },
      wednesday: { breakfast: "r3", lunch: "r7", snack: "r11", dinner: "r14" },
      thursday: { breakfast: "r4", lunch: "r8", snack: "r9", dinner: "r15" },
      friday: { breakfast: "r1", lunch: "r5", snack: "r10", dinner: "r16" },
      saturday: { breakfast: "r2", lunch: "r6", snack: "r11", dinner: "r12" },
      sunday: { breakfast: "r4", lunch: "r7", snack: "r9", dinner: "r14" }
    }
  };

  const DAYS = [
    { id: "monday", label: "Monday", short: "Mon" },
    { id: "tuesday", label: "Tuesday", short: "Tue" },
    { id: "wednesday", label: "Wednesday", short: "Wed" },
    { id: "thursday", label: "Thursday", short: "Thu" },
    { id: "friday", label: "Friday", short: "Fri" },
    { id: "saturday", label: "Saturday", short: "Sat" },
    { id: "sunday", label: "Sunday", short: "Sun" }
  ];

  const SLOTS = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "snack", label: "Snack" },
    { id: "dinner", label: "Dinner" }
  ];

  // Load from LocalStorage
  try {
    const saved = localStorage.getItem("safebite_desktop_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.buddyName) state.buddyName = parsed.buddyName;
      if (parsed.allergens) state.allergens = parsed.allergens;
      if (parsed.weeklyPlan) state.weeklyPlan = parsed.weeklyPlan;
      if (parsed.savedRecipeIds) state.savedRecipeIds = new Set(parsed.savedRecipeIds);
    }
  } catch (e) {
    console.warn("Storage load error:", e);
  }

  function persist() {
    try {
      localStorage.setItem("safebite_desktop_v1", JSON.stringify({
        buddyName: state.buddyName,
        allergens: state.allergens,
        weeklyPlan: state.weeklyPlan,
        savedRecipeIds: Array.from(state.savedRecipeIds)
      }));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }

  // DOM Elements
  const screens = document.querySelectorAll(".desktop-screen");
  const sidebarNavItems = document.querySelectorAll(".sidebar-nav-item[data-screen]");
  const sideNavGrocery = document.getElementById("sideNavGrocery");
  const btnSidebarQuickPlan = document.getElementById("btnSidebarQuickPlan");

  // Home Screen
  const homeSearchInput = document.getElementById("homeSearchInput");
  const catPills = document.querySelectorAll(".cat-pill");
  const recipesGrid = document.getElementById("recipesGrid");

  // Planner Screen
  const dayPillsRow = document.getElementById("dayPillsRow");
  const plannerDayHeading = document.getElementById("plannerDayHeading");
  const dayMealCards = document.getElementById("dayMealCards");
  const btnShuffleDay = document.getElementById("btnShuffleDay");
  const btnAutoPlanAll = document.getElementById("btnAutoPlanAll");
  const btnOpenGroceryFromPlanner = document.getElementById("btnOpenGroceryFromPlanner");
  const btnQuickOpenGrocery = document.getElementById("btnQuickOpenGrocery");

  // Profile Screen
  const buddyProfileName = document.getElementById("buddyProfileName");
  const profileAllergenTags = document.getElementById("profileAllergenTags");
  const addExtraAllergenForm = document.getElementById("addExtraAllergenForm");
  const extraAllergenInput = document.getElementById("extraAllergenInput");

  // Recipe Detail Modal
  const recipeModal = document.getElementById("recipeModal");
  const btnModalBack = document.getElementById("btnModalBack");
  const btnModalClose = document.getElementById("btnModalClose");
  const modalRecipeImage = document.getElementById("modalRecipeImage");
  const modalRecipeTitle = document.getElementById("modalRecipeTitle");
  const modalRecipeSafeNote = document.getElementById("modalRecipeSafeNote");
  const modalStatTime = document.getElementById("modalStatTime");
  const modalStatServings = document.getElementById("modalStatServings");
  const modalStatCalories = document.getElementById("modalStatCalories");
  const modalIngredientsList = document.getElementById("modalIngredientsList");
  const modalStepsList = document.getElementById("modalStepsList");
  const btnAddRecipeToPlan = document.getElementById("btnAddRecipeToPlan");

  // Grocery Modal
  const groceryModal = document.getElementById("groceryModal");
  const btnCloseGroceryModal = document.getElementById("btnCloseGroceryModal");
  const groceryListContainer = document.getElementById("groceryListContainer");
  const btnCopyGrocery = document.getElementById("btnCopyGrocery");

  // Toast
  const miniToast = document.getElementById("miniToast");
  function showToast(msg) {
    miniToast.textContent = msg;
    miniToast.classList.add("show");
    setTimeout(() => miniToast.classList.remove("show"), 2600);
  }

  // ==========================================================================
  // Screen Switching (Desktop Navigation)
  // ==========================================================================
  function switchScreen(screenId) {
    state.activeScreen = screenId;

    screens.forEach(s => s.classList.toggle("active", s.id === screenId));

    sidebarNavItems.forEach(item => {
      const match = item.dataset.screen === screenId;
      item.classList.toggle("active", match);
    });

    if (screenId === "screenPlanner") {
      renderPlannerDay();
    } else if (screenId === "screenProfile") {
      renderProfile();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  sidebarNavItems.forEach(item => {
    item.addEventListener("click", () => {
      switchScreen(item.dataset.screen);
    });
  });

  btnSidebarQuickPlan.addEventListener("click", () => {
    autoPlanFullWeek();
    switchScreen("screenPlanner");
    showToast("Filled entire week with allergen-safe dishes!");
  });

  sideNavGrocery.addEventListener("click", () => {
    openGroceryModal();
  });

  // ==========================================================================
  // Home Screen: Multi-Column Recipe Grid & Search
  // ==========================================================================
  function renderRecipes() {
    const query = homeSearchInput.value.toLowerCase().trim();
    const filtered = RECIPES.filter(r => {
      if (state.activeCategory !== "all" && r.category !== state.activeCategory) {
        return false;
      }
      if (query && !r.title.toLowerCase().includes(query) && !r.ingredients.join(" ").toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });

    recipesGrid.innerHTML = "";

    if (filtered.length === 0) {
      recipesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #7A746E;">
          <h3>No safe dishes match your search</h3>
          <p style="margin-top: 8px;">Try searching for "tofu", "chana", "rice", or select "All Dishes".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(recipe => {
      const isSaved = state.savedRecipeIds.has(recipe.id);
      const card = document.createElement("div");
      card.className = "recipe-card-clean";
      card.dataset.id = recipe.id;

      card.innerHTML = `
        <div class="recipe-card-img-wrap">
          <img src="${recipe.image}" alt="${recipe.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80';" />
          <button class="btn-bookmark-card ${isSaved ? 'saved' : ''}" data-id="${recipe.id}" title="Save recipe">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? '#FFFFFF' : 'none'}" stroke="currentColor" stroke-width="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
        <h3 class="recipe-card-title">${recipe.title}</h3>
        <div class="recipe-card-meta">
          <span>${recipe.prepTime} • ${recipe.calories} kcal</span>
          <span class="meta-tag">✓ 100% Safe</span>
        </div>
      `;

      // Open Modal on Card Click
      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-bookmark-card")) return;
        openRecipeModal(recipe);
      });

      // Bookmark / Save
      const bookmarkBtn = card.querySelector(".btn-bookmark-card");
      bookmarkBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.savedRecipeIds.has(recipe.id)) {
          state.savedRecipeIds.delete(recipe.id);
          showToast(`Removed "${recipe.title}" from saved list.`);
        } else {
          state.savedRecipeIds.add(recipe.id);
          showToast(`Saved "${recipe.title}" to favorites!`);
        }
        persist();
        renderRecipes();
      });

      recipesGrid.appendChild(card);
    });
  }

  homeSearchInput.addEventListener("input", renderRecipes);

  catPills.forEach(pill => {
    pill.addEventListener("click", () => {
      catPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.dataset.category;
      renderRecipes();
    });
  });

  // ==========================================================================
  // Recipe Detail Desktop Modal
  // ==========================================================================
  function openRecipeModal(recipe) {
    state.selectedRecipeForModal = recipe;
    modalRecipeImage.src = recipe.image;
    modalRecipeTitle.textContent = recipe.title;
    modalRecipeSafeNote.textContent = `🛡️ ${recipe.safeNote}`;
    modalStatTime.textContent = recipe.prepTime;
    modalStatServings.textContent = recipe.servings;
    modalStatCalories.textContent = recipe.calories;

    // Ingredients
    modalIngredientsList.innerHTML = recipe.ingredients.map(ing => `
      <li>
        <input type="checkbox" />
        <span>${ing}</span>
      </li>
    `).join("");

    // Steps
    modalStepsList.innerHTML = recipe.steps.map((st, i) => `
      <div class="clean-step-item">
        <strong>Step ${i + 1}</strong>
        ${st}
      </div>
    `).join("");

    recipeModal.classList.add("active");
    recipeModal.setAttribute("aria-hidden", "false");
  }

  function closeRecipeModal() {
    recipeModal.classList.remove("active");
    recipeModal.setAttribute("aria-hidden", "true");
  }

  btnModalBack.addEventListener("click", closeRecipeModal);
  btnModalClose.addEventListener("click", closeRecipeModal);
  recipeModal.addEventListener("click", (e) => {
    if (e.target === recipeModal) closeRecipeModal();
  });

  btnAddRecipeToPlan.addEventListener("click", () => {
    if (!state.selectedRecipeForModal) return;
    const cat = state.selectedRecipeForModal.category;
    if (!state.weeklyPlan[state.activeDay]) {
      state.weeklyPlan[state.activeDay] = {};
    }
    state.weeklyPlan[state.activeDay][cat] = state.selectedRecipeForModal.id;
    persist();
    closeRecipeModal();
    showToast(`Added "${state.selectedRecipeForModal.title}" to ${state.activeDay.toUpperCase()} ${cat}!`);
  });

  // ==========================================================================
  // Weekly Planner Screen (Desktop Split View)
  // ==========================================================================
  function renderPlannerDaysBar() {
    dayPillsRow.innerHTML = "";
    DAYS.forEach(day => {
      const btn = document.createElement("button");
      btn.className = `day-bubble ${day.id === state.activeDay ? 'active' : ''}`;
      btn.textContent = day.label;
      btn.addEventListener("click", () => {
        state.activeDay = day.id;
        renderPlannerDaysBar();
        renderPlannerDay();
      });
      dayPillsRow.appendChild(btn);
    });
  }

  function renderPlannerDay() {
    const fullName = {
      monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
      thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday"
    }[state.activeDay] || "Monday";

    plannerDayHeading.textContent = `${fullName}'s Balanced Menu`;

    const dayPlan = state.weeklyPlan[state.activeDay] || {};
    dayMealCards.innerHTML = "";

    SLOTS.forEach(slot => {
      const recipeId = dayPlan[slot.id];
      const recipe = RECIPES.find(r => r.id === recipeId) || RECIPES.find(r => r.category === slot.id);

      const card = document.createElement("div");
      card.className = "meal-slot-item";

      if (recipe) {
        card.innerHTML = `
          <img src="${recipe.image}" class="meal-slot-thumb" alt="${recipe.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80';" />
          <div class="meal-slot-info">
            <span class="meal-slot-type">${slot.label}</span>
            <h4 class="meal-slot-title">${recipe.title}</h4>
            <span class="meal-slot-safe-tag">✓ ${recipe.safeNote}</span>
          </div>
          <button class="btn-slot-swap" data-slot="${slot.id}" title="Swap with next safe dish">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
          </button>
        `;

        card.querySelector(".meal-slot-info").addEventListener("click", () => {
          openRecipeModal(recipe);
        });

        card.querySelector(".meal-slot-thumb").addEventListener("click", () => {
          openRecipeModal(recipe);
        });

        card.querySelector(".btn-slot-swap").addEventListener("click", (e) => {
          e.stopPropagation();
          swapMealSlot(state.activeDay, slot.id);
        });
      }

      dayMealCards.appendChild(card);
    });
  }

  function swapMealSlot(dayId, slotId) {
    const slotRecipes = RECIPES.filter(r => r.category === slotId);
    if (slotRecipes.length <= 1) return;
    const currentId = state.weeklyPlan[dayId]?.[slotId];
    const currentIndex = slotRecipes.findIndex(r => r.id === currentId);
    const nextIndex = (currentIndex + 1) % slotRecipes.length;
    const nextRecipe = slotRecipes[nextIndex];

    if (!state.weeklyPlan[dayId]) state.weeklyPlan[dayId] = {};
    state.weeklyPlan[dayId][slotId] = nextRecipe.id;
    persist();
    renderPlannerDay();
    showToast(`Swapped ${slotId} to "${nextRecipe.title}"`);
  }

  function autoPlanFullWeek() {
    const bfs = RECIPES.filter(r => r.category === "breakfast");
    const lus = RECIPES.filter(r => r.category === "lunch");
    const sns = RECIPES.filter(r => r.category === "snack");
    const dis = RECIPES.filter(r => r.category === "dinner");

    DAYS.forEach((day, i) => {
      state.weeklyPlan[day.id] = {
        breakfast: bfs[i % bfs.length]?.id,
        lunch: lus[i % lus.length]?.id,
        snack: sns[i % sns.length]?.id,
        dinner: dis[i % dis.length]?.id
      };
    });
    persist();
    renderPlannerDay();
  }

  btnShuffleDay.addEventListener("click", () => {
    SLOTS.forEach(slot => {
      swapMealSlot(state.activeDay, slot.id);
    });
  });

  btnAutoPlanAll.addEventListener("click", () => {
    autoPlanFullWeek();
    showToast("Auto-planned entire week with safe dishes!");
  });

  btnOpenGroceryFromPlanner.addEventListener("click", openGroceryModal);
  btnQuickOpenGrocery.addEventListener("click", openGroceryModal);

  // ==========================================================================
  // Grocery Modal
  // ==========================================================================
  function openGroceryModal() {
    renderGroceryList();
    groceryModal.classList.add("active");
    groceryModal.setAttribute("aria-hidden", "false");
  }

  function renderGroceryList() {
    const rawIngs = new Set();
    Object.values(state.weeklyPlan).forEach(day => {
      Object.values(day).forEach(recId => {
        const recipe = RECIPES.find(r => r.id === recId);
        if (recipe) {
          recipe.ingredients.forEach(ing => rawIngs.add(ing));
        }
      });
    });

    groceryListContainer.innerHTML = "";
    if (rawIngs.size === 0) {
      groceryListContainer.innerHTML = `<li><span>No ingredients planned yet.</span></li>`;
      return;
    }

    Array.from(rawIngs).sort().forEach(ing => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${ing}</span>
        <input type="checkbox" />
      `;
      li.querySelector("input").addEventListener("change", (e) => {
        li.classList.toggle("checked", e.target.checked);
      });
      groceryListContainer.appendChild(li);
    });
  }

  btnCloseGroceryModal.addEventListener("click", () => {
    groceryModal.classList.remove("active");
    groceryModal.setAttribute("aria-hidden", "true");
  });

  groceryModal.addEventListener("click", (e) => {
    if (e.target === groceryModal) {
      groceryModal.classList.remove("active");
    }
  });

  btnCopyGrocery.addEventListener("click", () => {
    const items = Array.from(groceryListContainer.querySelectorAll("li span")).map(s => `• ${s.textContent}`).join("\n");
    const text = `🛒 *${state.buddyName}'s Weekly Grocery Shopping List*\n*100% Paneer, Curd & Brinjal Free*\n\n${items}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast("Copied grocery list to clipboard!");
    }).catch(() => {
      showToast("Ready to print or send!");
    });
  });

  // ==========================================================================
  // Profile Screen: Allergens & Buddy Name
  // ==========================================================================
  function renderProfile() {
    buddyProfileName.value = state.buddyName;

    profileAllergenTags.innerHTML = "";
    state.allergens.forEach(allergen => {
      const chip = document.createElement("span");
      chip.className = "allergen-bubble";
      chip.innerHTML = `
        🚫 ${allergen}
        <button class="btn-del-tag" data-tag="${allergen}">&times;</button>
      `;
      profileAllergenTags.appendChild(chip);
    });
  }

  buddyProfileName.addEventListener("change", (e) => {
    state.buddyName = e.target.value.trim() || "Buddy's Kitchen";
    persist();
    showToast(`Updated name to ${state.buddyName}`);
  });

  addExtraAllergenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = extraAllergenInput.value.trim();
    if (val && !state.allergens.includes(val)) {
      state.allergens.push(val);
      extraAllergenInput.value = "";
      persist();
      renderProfile();
      showToast(`Added "${val}" to allergen blocklist.`);
    }
  });

  profileAllergenTags.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-del-tag");
    if (!btn) return;
    const tag = btn.dataset.tag;
    state.allergens = state.allergens.filter(a => a !== tag);
    persist();
    renderProfile();
    showToast(`Removed "${tag}".`);
  });

  // Keyboard shortcut to close modals with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeRecipeModal();
      groceryModal.classList.remove("active");
    }
  });

  // Initial Boot
  renderRecipes();
  renderPlannerDaysBar();
  renderPlannerDay();
});
