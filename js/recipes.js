/**
 * SafePlate Recipes
 * Hand-picked recipes guaranteed free from:
 * - Paneer (Cottage Cheese)
 * - Curd / Dahi (Yogurt)
 * - Brinjal / Baingan (Eggplant)
 */

const RECIPES = [
  {
    id: "r1",
    title: "Avocado & Chickpea Toast",
    category: "breakfast",
    prepTime: "10 min",
    servings: 2,
    calories: 280,
    protein: "12g",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
    safeNote: "100% Paneer & Dairy Free",
    ingredients: [
      "2 slices Whole grain sourdough bread",
      "1 ripe Hass avocado, mashed with lime & salt",
      "1/2 cup Boiled chickpeas, toasted with paprika",
      "1 tbsp Toasted pumpkin seeds",
      "Pinch of chili flakes & sea salt"
    ],
    steps: [
      "Toast bread slices until golden brown and crisp.",
      "Mash avocado with lime juice and spread evenly over toast.",
      "Top with crisp paprika chickpeas and pumpkin seeds."
    ]
  },
  {
    id: "r2",
    title: "Moong Dal Chilla Crepes",
    category: "breakfast",
    prepTime: "15 min",
    servings: 2,
    calories: 260,
    protein: "14g",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    safeNote: "Naturally curd-free & paneer-free",
    ingredients: [
      "1 cup Yellow moong dal (soaked & blended smooth)",
      "1 inch Ginger & 1 green chili, minced",
      "1/4 cup Finely diced onions & bell peppers",
      "1/4 tsp Turmeric & salt to taste",
      "Lemon-mint dip (no curd)"
    ],
    steps: [
      "Whisk blended moong dal batter with onions, ginger, and spices.",
      "Pour a ladle of batter onto a hot lightly oiled tawa and spread thin.",
      "Cook for 2-3 minutes until golden crisp on both sides. Serve with mint dip."
    ]
  },
  {
    id: "r3",
    title: "Classic Indori Poha",
    category: "breakfast",
    prepTime: "12 min",
    servings: 2,
    calories: 240,
    protein: "6g",
    image: "https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=600&auto=format&fit=crop&q=80",
    safeNote: "100% Allergen Free",
    ingredients: [
      "2 cups Flattened rice (poha), rinsed & drained",
      "1/4 cup Roasted peanuts",
      "1 Onion, finely chopped",
      "1/2 tsp Mustard seeds & curry leaves",
      "1/2 tsp Turmeric & fresh lime juice"
    ],
    steps: [
      "Heat 1 tsp oil, crackle mustard seeds, curry leaves, and peanuts.",
      "Add onions and sauté until translucent. Add turmeric and salt.",
      "Fold in rinsed poha, cover and steam for 2 minutes. Finish with fresh lime."
    ]
  },
  {
    id: "r4",
    title: "Steamed Idli with Sambar",
    category: "breakfast",
    prepTime: "15 min",
    servings: 2,
    calories: 290,
    protein: "9g",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    safeNote: "Sambar made with pumpkin & drumstick (zero brinjal)",
    ingredients: [
      "6 Steamed rice-lentil idlis",
      "3/4 cup Toor dal boiled with turmeric",
      "1 cup Diced pumpkin, carrots & drumstick (no brinjal)",
      "1 tbsp Sambar masala & tamarind pulp",
      "Coconut chutney (water & coconut, zero curd)"
    ],
    steps: [
      "Simmer vegetables in tamarind water and sambar masala until tender.",
      "Whisk in boiled toor dal and temper with mustard seeds and curry leaves.",
      "Serve warm idlis dunked in allergen-free sambar."
    ]
  },
  {
    id: "r5",
    title: "Creamy Palak Tofu",
    category: "lunch",
    prepTime: "20 min",
    servings: 3,
    calories: 340,
    protein: "19g",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    safeNote: "Tofu replaces Paneer; Cashew cream replaces dairy",
    ingredients: [
      "200g Firm organic tofu, cubed & pan-seared",
      "1 large bunch Fresh spinach, blanched and pureed",
      "2 tbsp Soaked cashew paste (dairy-free cream)",
      "1 Onion & 1 Tomato, pureed with ginger-garlic",
      "1 tsp Garam masala & cumin"
    ],
    steps: [
      "Pan-sear tofu cubes until golden; set aside.",
      "Sauté onions, ginger-garlic, and spices until fragrant.",
      "Add spinach puree and cashew cream; simmer 4 minutes.",
      "Fold in seared tofu cubes and serve with warm rotis or rice."
    ]
  },
  {
    id: "r6",
    title: "Amritsari Chana Masala",
    category: "lunch",
    prepTime: "25 min",
    servings: 3,
    calories: 360,
    protein: "16g",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    safeNote: "Naturally paneer-free & curd-free",
    ingredients: [
      "2 cups Boiled chickpeas (Kabuli Chana)",
      "2 Onions & 2 Tomatoes, finely minced",
      "1 tbsp Chana masala & dry mango powder (amchur)",
      "1 inch Fresh ginger juliennes",
      "2 Phulkas (whole wheat rotis)"
    ],
    steps: [
      "Sauté onions until deep golden brown.",
      "Add ginger-garlic, tomatoes, and chana masala; cook until oil surfaces.",
      "Add boiled chickpeas with broth, simmer for 15 minutes to thicken.",
      "Garnish with ginger juliennes and serve with hot phulkas."
    ]
  },
  {
    id: "r7",
    title: "Kashmiri Rajma Bowl",
    category: "lunch",
    prepTime: "25 min",
    servings: 3,
    calories: 380,
    protein: "17g",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    safeNote: "Traditional curd-free slow cooked recipe",
    ingredients: [
      "2 cups Red kidney beans, boiled soft",
      "2 Tomatoes pureed with ginger & fennel",
      "1 tsp Kashmiri red chili & cumin seeds",
      "1.5 cups Steamed basmati rice",
      "Fresh coriander & cucumber salad"
    ],
    steps: [
      "Sauté cumin, grated ginger, and pureed tomatoes with Kashmiri chili.",
      "Add boiled rajma beans and simmer gently for 20 minutes.",
      "Serve piping hot over fragrant steamed basmati rice."
    ]
  },
  {
    id: "r8",
    title: "Crispy Bhindi Do Pyaza",
    category: "lunch",
    prepTime: "18 min",
    servings: 2,
    calories: 290,
    protein: "8g",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    safeNote: "Zero brinjal • Zero curd • Zero paneer",
    ingredients: [
      "250g Fresh okra (bhindi), wiped dry & sliced",
      "2 Red onions (one sliced thin, one in petals)",
      "1 tsp Amchur (mango powder) & coriander powder",
      "1/2 tsp Cumin & turmeric",
      "Yellow dal tadka on the side"
    ],
    steps: [
      "Sauté okra on medium-high heat until non-sticky and slightly charred; remove.",
      "Sauté onion petals and spices in the pan.",
      "Toss okra back with onions for 3 minutes. Serve with rotis and dal."
    ]
  },
  {
    id: "r9",
    title: "Roasted Makhana Crunch",
    category: "snack",
    prepTime: "8 min",
    servings: 2,
    calories: 160,
    protein: "5g",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80",
    safeNote: "Light & healthy allergen-free snack",
    ingredients: [
      "2 cups Phool makhana (fox nuts)",
      "1 tsp Olive or coconut oil",
      "1/2 tsp Chaat masala or peri-peri spice",
      "Himalayan pink salt to taste"
    ],
    steps: [
      "Heat 1 tsp oil in a wide pan over low heat.",
      "Roast makhana for 6-8 minutes until crunchy.",
      "Toss with chaat masala and salt while warm."
    ]
  },
  {
    id: "r10",
    title: "Sweet Potato Wedges & Guac",
    category: "snack",
    prepTime: "20 min",
    servings: 2,
    calories: 220,
    protein: "4g",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80",
    safeNote: "Dairy-free avocado dip instead of curd dips",
    ingredients: [
      "2 Sweet potatoes, cut into finger wedges",
      "1 tsp Smoked paprika & sea salt",
      "1 tsp Olive oil",
      "Fresh guacamole (mashed avocado, lime, onion, cilantro)"
    ],
    steps: [
      "Toss sweet potato wedges with olive oil, paprika, and salt.",
      "Bake or air-fry at 200°C for 16 minutes until crisp.",
      "Serve warm with freshly mashed lime guacamole."
    ]
  },
  {
    id: "r11",
    title: "Sweet Corn & Pepper Chaat",
    category: "snack",
    prepTime: "8 min",
    servings: 2,
    calories: 180,
    protein: "5g",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&auto=format&fit=crop&q=80",
    safeNote: "Curd-free street style chaat",
    ingredients: [
      "1.5 cups Steamed sweet corn",
      "1/2 cup Diced bell peppers & red onion",
      "1 tsp Chaat masala & black salt",
      "Juice of 1/2 lemon & fresh cilantro"
    ],
    steps: [
      "In a bowl, toss warm steamed corn with diced peppers and onions.",
      "Add chaat masala, black salt, and freshly squeezed lemon juice.",
      "Garnish with chopped cilantro and enjoy warm."
    ]
  },
  {
    id: "r12",
    title: "Velvet Dal Makhani",
    category: "dinner",
    prepTime: "30 min",
    servings: 3,
    calories: 390,
    protein: "18g",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    safeNote: "Cashew cream replaces butter, cream & dahi",
    ingredients: [
      "1 cup Black lentils & kidney beans, pressure cooked soft",
      "1.5 cups Tomato puree with ginger-garlic",
      "3 tbsp Cashew paste (soaked & blended smooth)",
      "1 tsp Kasuri methi (fenugreek) & garam masala",
      "Whole wheat rotis or jeera rice"
    ],
    steps: [
      "Cook tomato puree with ginger-garlic and mild spices until thick.",
      "Add cooked black lentils with broth and simmer on low for 20 minutes.",
      "Stir in smooth cashew cream and kasuri methi for rich velvety texture.",
      "Serve with warm phulkas or steamed rice."
    ]
  },
  {
    id: "r13",
    title: "Matar Tofu Curry",
    category: "dinner",
    prepTime: "20 min",
    servings: 3,
    calories: 340,
    protein: "18g",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80",
    safeNote: "Classic Matar Paneer reimagined with Tofu",
    ingredients: [
      "200g Firm tofu, cut into cubes",
      "1 cup Sweet green peas",
      "2 Tomatoes & 1 onion blended with 8 cashews",
      "1 tsp Ginger-garlic, turmeric & coriander",
      "2 Whole wheat rotis"
    ],
    steps: [
      "Lightly sear tofu cubes in a pan; set aside.",
      "Cook onion-tomato-cashew paste until fragrant.",
      "Add green peas and 1/2 cup water; simmer for 6 minutes.",
      "Fold in tofu cubes, simmer 2 minutes, and serve with rotis."
    ]
  },
  {
    id: "r14",
    title: "Thai Red Coconut Curry",
    category: "dinner",
    prepTime: "20 min",
    servings: 2,
    calories: 420,
    protein: "15g",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop&q=80",
    safeNote: "Tender zucchini replaces eggplant; pure coconut milk",
    ingredients: [
      "1 can (400ml) Light coconut milk",
      "150g Tofu cubes & 1 medium zucchini, sliced (no eggplant)",
      "1 Bell pepper & fresh basil leaves",
      "2 tbsp Vegan Thai red curry paste",
      "Steamed jasmine rice"
    ],
    steps: [
      "Simmer curry paste in 2 tbsp coconut milk until fragrant.",
      "Add remaining coconut milk, zucchini slices, and bell peppers.",
      "Simmer for 8 minutes until zucchini is tender-crisp.",
      "Fold in tofu cubes, fresh basil leaves, and serve with jasmine rice."
    ]
  },
  {
    id: "r15",
    title: "Sesame Garlic Soba Noodles",
    category: "dinner",
    prepTime: "15 min",
    servings: 2,
    calories: 380,
    protein: "16g",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    safeNote: "Naturally dairy-free & nightshade-free",
    ingredients: [
      "150g Soba noodles (cooked & rinsed)",
      "150g Crispy pan-seared tofu cubes",
      "1 cup Bok choy or baby spinach",
      "2 tbsp Tamari / soy sauce & 1 tsp sesame oil",
      "Toasted sesame seeds & red pepper flakes"
    ],
    steps: [
      "Sauté garlic, ginger, and bok choy in sesame oil for 2 minutes.",
      "Toss in cooked soba noodles and savory tamari sauce.",
      "Fold in crispy tofu, sprinkle sesame seeds, and serve hot."
    ]
  },
  {
    id: "r16",
    title: "Golden Lauki Kofta Curry",
    category: "dinner",
    prepTime: "25 min",
    servings: 3,
    calories: 320,
    protein: "11g",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    safeNote: "Bottle gourd (lauki) replaces eggplant kofta",
    ingredients: [
      "2 cups Grated lauki (bottle gourd), squeezed dry",
      "1/2 cup Gram flour (besan) & cumin for dumplings",
      "2 Tomatoes & 1 onion, pureed with spices",
      "1/2 tsp Garam masala & coriander",
      "2 Warm rotis"
    ],
    steps: [
      "Mix grated lauki with besan and spices, roll into balls and shallow-fry.",
      "Cook onion-tomato masala until aromatic.",
      "Drop the golden koftas into simmering gravy 3 minutes before serving."
    ]
  }
];
