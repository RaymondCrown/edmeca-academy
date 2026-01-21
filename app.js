// Food Database with nutritional information per 100g
const foodDatabase = [
    // Fruits
    { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, category: "Fruits" },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, category: "Fruits" },
    { name: "Orange", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, category: "Fruits" },
    { name: "Strawberries", calories: 32, protein: 0.7, carbs: 8, fat: 0.3, fiber: 2, category: "Fruits" },
    { name: "Grapes", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9, category: "Fruits" },
    { name: "Watermelon", calories: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4, category: "Fruits" },
    { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, category: "Fruits" },
    { name: "Pineapple", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4, category: "Fruits" },
    { name: "Blueberries", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, category: "Fruits" },
    { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, category: "Fruits" },

    // Vegetables
    { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, category: "Vegetables" },
    { name: "Carrot", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, category: "Vegetables" },
    { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, category: "Vegetables" },
    { name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, category: "Vegetables" },
    { name: "Cucumber", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, category: "Vegetables" },
    { name: "Lettuce", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, category: "Vegetables" },
    { name: "Bell Pepper", calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, category: "Vegetables" },
    { name: "Onion", calories: 40, protein: 1.1, carbs: 9, fat: 0.1, fiber: 1.7, category: "Vegetables" },
    { name: "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, category: "Vegetables" },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, category: "Vegetables" },

    // Proteins
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, category: "Proteins" },
    { name: "Beef Steak", calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0, category: "Proteins" },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, category: "Proteins" },
    { name: "Tuna", calories: 132, protein: 28, carbs: 0, fat: 1.3, fiber: 0, category: "Proteins" },
    { name: "Egg", calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, category: "Proteins" },
    { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, category: "Proteins" },
    { name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0, category: "Proteins" },
    { name: "Pork Chop", calories: 231, protein: 25, carbs: 0, fat: 14, fiber: 0, category: "Proteins" },
    { name: "Shrimp", calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, category: "Proteins" },
    { name: "Ground Beef", calories: 254, protein: 17, carbs: 0, fat: 20, fiber: 0, category: "Proteins" },

    // Dairy
    { name: "Milk (Whole)", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, category: "Dairy" },
    { name: "Milk (Skim)", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, fiber: 0, category: "Dairy" },
    { name: "Cheese (Cheddar)", calories: 403, protein: 25, carbs: 1.3, fat: 33, fiber: 0, category: "Dairy" },
    { name: "Yogurt (Plain)", calories: 59, protein: 10, carbs: 3.6, fat: 0.7, fiber: 0, category: "Dairy" },
    { name: "Greek Yogurt", calories: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, category: "Dairy" },
    { name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, category: "Dairy" },
    { name: "Butter", calories: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, category: "Dairy" },
    { name: "Cream Cheese", calories: 342, protein: 6, carbs: 4, fat: 34, fiber: 0, category: "Dairy" },

    // Grains & Carbs
    { name: "White Rice (Cooked)", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, category: "Grains" },
    { name: "Brown Rice (Cooked)", calories: 112, protein: 2.6, carbs: 24, fat: 0.9, fiber: 1.8, category: "Grains" },
    { name: "Pasta (Cooked)", calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8, category: "Grains" },
    { name: "Bread (White)", calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, category: "Grains" },
    { name: "Bread (Whole Wheat)", calories: 247, protein: 13, carbs: 41, fat: 4.2, fiber: 7, category: "Grains" },
    { name: "Oatmeal", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, fiber: 1.7, category: "Grains" },
    { name: "Quinoa (Cooked)", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8, category: "Grains" },
    { name: "Cereal (Corn Flakes)", calories: 357, protein: 8, carbs: 84, fat: 0.4, fiber: 3.3, category: "Grains" },

    // Legumes & Nuts
    { name: "Black Beans", calories: 132, protein: 8.9, carbs: 24, fat: 0.5, fiber: 8.7, category: "Legumes" },
    { name: "Lentils", calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, category: "Legumes" },
    { name: "Chickpeas", calories: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, category: "Legumes" },
    { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, category: "Nuts" },
    { name: "Peanuts", calories: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5, category: "Nuts" },
    { name: "Walnuts", calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, category: "Nuts" },
    { name: "Peanut Butter", calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6, category: "Nuts" },

    // Common Meals & Fast Food
    { name: "Pizza (Cheese)", calories: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, category: "Fast Food" },
    { name: "Hamburger", calories: 295, protein: 17, carbs: 24, fat: 14, fiber: 1.3, category: "Fast Food" },
    { name: "French Fries", calories: 312, protein: 3.4, carbs: 41, fat: 15, fiber: 3.8, category: "Fast Food" },
    { name: "Hot Dog", calories: 290, protein: 10, carbs: 24, fat: 18, fiber: 0.8, category: "Fast Food" },
    { name: "Fried Chicken", calories: 246, protein: 19, carbs: 10, fat: 15, fiber: 0.3, category: "Fast Food" },
    { name: "Burrito", calories: 206, protein: 9, carbs: 29, fat: 7, fiber: 3, category: "Fast Food" },
    { name: "Taco", calories: 226, protein: 9, carbs: 20, fat: 13, fiber: 3.5, category: "Fast Food" },

    // Beverages
    { name: "Orange Juice", calories: 45, protein: 0.7, carbs: 10, fat: 0.2, fiber: 0.2, category: "Beverages" },
    { name: "Cola", calories: 42, protein: 0, carbs: 11, fat: 0, fiber: 0, category: "Beverages" },
    { name: "Coffee (Black)", calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, category: "Beverages" },
    { name: "Beer", calories: 43, protein: 0.5, carbs: 3.6, fat: 0, fiber: 0, category: "Beverages" },
    { name: "Wine (Red)", calories: 85, protein: 0.1, carbs: 2.6, fat: 0, fiber: 0, category: "Beverages" },
    { name: "Smoothie (Fruit)", calories: 50, protein: 0.5, carbs: 12, fat: 0.2, fiber: 0.5, category: "Beverages" },

    // Snacks & Sweets
    { name: "Chocolate (Dark)", calories: 546, protein: 5, carbs: 60, fat: 31, fiber: 7, category: "Snacks" },
    { name: "Chocolate (Milk)", calories: 535, protein: 8, carbs: 59, fat: 30, fiber: 3.4, category: "Snacks" },
    { name: "Ice Cream", calories: 207, protein: 3.5, carbs: 24, fat: 11, fiber: 0.7, category: "Snacks" },
    { name: "Chips (Potato)", calories: 536, protein: 7, carbs: 53, fat: 35, fiber: 4.8, category: "Snacks" },
    { name: "Cookies", calories: 488, protein: 5.5, carbs: 68, fat: 23, fiber: 2.4, category: "Snacks" },
    { name: "Cake (Chocolate)", calories: 371, protein: 5, carbs: 51, fat: 17, fiber: 2.2, category: "Snacks" },
    { name: "Donut", calories: 452, protein: 5, carbs: 51, fat: 25, fiber: 1.7, category: "Snacks" },
    { name: "Popcorn", calories: 387, protein: 13, carbs: 78, fat: 4.5, fiber: 15, category: "Snacks" },
    { name: "Granola Bar", calories: 471, protein: 10, carbs: 64, fat: 20, fiber: 5, category: "Snacks" },

    // Breakfast Items
    { name: "Pancakes", calories: 227, protein: 6, carbs: 28, fat: 10, fiber: 1, category: "Breakfast" },
    { name: "Waffles", calories: 291, protein: 8, carbs: 33, fat: 14, fiber: 1.5, category: "Breakfast" },
    { name: "Bacon", calories: 541, protein: 37, carbs: 1.4, fat: 42, fiber: 0, category: "Breakfast" },
    { name: "Sausage", calories: 301, protein: 12, carbs: 2, fat: 27, fiber: 0, category: "Breakfast" },
    { name: "Croissant", calories: 406, protein: 8, carbs: 46, fat: 21, fiber: 2.6, category: "Breakfast" },
    { name: "Bagel", calories: 257, protein: 10, carbs: 50, fat: 1.2, fiber: 2.2, category: "Breakfast" },
    { name: "Muffin", calories: 296, protein: 5, carbs: 49, fat: 10, fiber: 2, category: "Breakfast" },
];

// App State
let state = {
    currentDate: new Date().toISOString().split('T')[0],
    calorieGoal: 2000,
    selectedMealType: 'breakfast',
    selectedFood: null,
    meals: {} // Format: { 'YYYY-MM-DD': { breakfast: [], lunch: [], dinner: [], snacks: [] } }
};

// DOM Elements
const elements = {
    currentDate: document.getElementById('current-date'),
    prevDay: document.getElementById('prev-day'),
    nextDay: document.getElementById('next-day'),
    totalCalories: document.getElementById('total-calories'),
    calorieGoal: document.getElementById('calorie-goal'),
    progressFill: document.getElementById('progress-fill'),
    remainingCalories: document.getElementById('remaining-calories'),
    mealTypeButtons: document.querySelectorAll('.meal-type'),
    foodSearch: document.getElementById('food-search'),
    foodSuggestions: document.getElementById('food-suggestions'),
    customFoodName: document.getElementById('custom-food-name'),
    customFoodCalories: document.getElementById('custom-food-calories'),
    customFoodServing: document.getElementById('custom-food-serving'),
    addFoodBtn: document.getElementById('add-food-btn'),
    breakfastList: document.getElementById('breakfast-list'),
    lunchList: document.getElementById('lunch-list'),
    dinnerList: document.getElementById('dinner-list'),
    snacksList: document.getElementById('snacks-list'),
    breakfastCalories: document.getElementById('breakfast-calories'),
    lunchCalories: document.getElementById('lunch-calories'),
    dinnerCalories: document.getElementById('dinner-calories'),
    snacksCalories: document.getElementById('snacks-calories'),
    totalProtein: document.getElementById('total-protein'),
    totalCarbs: document.getElementById('total-carbs'),
    totalFat: document.getElementById('total-fat'),
    totalFiber: document.getElementById('total-fiber'),
    weekChart: document.getElementById('week-chart')
};

// Initialize App
function init() {
    loadFromStorage();
    setupEventListeners();
    updateDateInput();
    updateDisplay();
    renderWeeklyChart();
}

// Load data from localStorage
function loadFromStorage() {
    const savedMeals = localStorage.getItem('mealTracker_meals');
    const savedGoal = localStorage.getItem('mealTracker_goal');

    if (savedMeals) {
        state.meals = JSON.parse(savedMeals);
    }

    if (savedGoal) {
        state.calorieGoal = parseInt(savedGoal);
        elements.calorieGoal.value = state.calorieGoal;
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem('mealTracker_meals', JSON.stringify(state.meals));
    localStorage.setItem('mealTracker_goal', state.calorieGoal.toString());
}

// Setup Event Listeners
function setupEventListeners() {
    // Date navigation
    elements.currentDate.addEventListener('change', (e) => {
        state.currentDate = e.target.value;
        updateDisplay();
        renderWeeklyChart();
    });

    elements.prevDay.addEventListener('click', () => {
        const date = new Date(state.currentDate);
        date.setDate(date.getDate() - 1);
        state.currentDate = date.toISOString().split('T')[0];
        updateDateInput();
        updateDisplay();
        renderWeeklyChart();
    });

    elements.nextDay.addEventListener('click', () => {
        const date = new Date(state.currentDate);
        date.setDate(date.getDate() + 1);
        state.currentDate = date.toISOString().split('T')[0];
        updateDateInput();
        updateDisplay();
        renderWeeklyChart();
    });

    // Calorie goal
    elements.calorieGoal.addEventListener('change', (e) => {
        state.calorieGoal = parseInt(e.target.value) || 2000;
        saveToStorage();
        updateCalorieSummary();
        renderWeeklyChart();
    });

    // Meal type selection
    elements.mealTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.mealTypeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedMealType = btn.dataset.meal;
        });
    });

    // Food search
    elements.foodSearch.addEventListener('input', handleFoodSearch);
    elements.foodSearch.addEventListener('focus', handleFoodSearch);

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            elements.foodSuggestions.classList.remove('show');
        }
    });

    // Add food button
    elements.addFoodBtn.addEventListener('click', handleAddFood);

    // Enter key on custom food inputs
    [elements.customFoodName, elements.customFoodCalories, elements.customFoodServing].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAddFood();
            }
        });
    });
}

// Update date input
function updateDateInput() {
    elements.currentDate.value = state.currentDate;
}

// Handle food search
function handleFoodSearch() {
    const query = elements.foodSearch.value.toLowerCase().trim();

    if (query.length === 0) {
        // Show all foods grouped by category
        renderAllFoodSuggestions();
        return;
    }

    const matches = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(query) ||
        food.category.toLowerCase().includes(query)
    );

    renderFoodSuggestions(matches);
}

// Render all food suggestions
function renderAllFoodSuggestions() {
    const html = foodDatabase.slice(0, 20).map(food => `
        <div class="suggestion-item" data-food="${food.name}">
            <span class="food-name">${food.name}</span>
            <span class="food-calories">${food.calories} kcal/100g</span>
        </div>
    `).join('');

    elements.foodSuggestions.innerHTML = html;
    elements.foodSuggestions.classList.add('show');
    attachSuggestionListeners();
}

// Render food suggestions
function renderFoodSuggestions(foods) {
    if (foods.length === 0) {
        elements.foodSuggestions.innerHTML = '<div class="suggestion-item">No foods found. Add a custom food below.</div>';
        elements.foodSuggestions.classList.add('show');
        return;
    }

    const html = foods.map(food => `
        <div class="suggestion-item" data-food="${food.name}">
            <span class="food-name">${food.name}</span>
            <span class="food-calories">${food.calories} kcal/100g</span>
        </div>
    `).join('');

    elements.foodSuggestions.innerHTML = html;
    elements.foodSuggestions.classList.add('show');
    attachSuggestionListeners();
}

// Attach click listeners to suggestions
function attachSuggestionListeners() {
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const foodName = item.dataset.food;
            if (foodName) {
                state.selectedFood = foodDatabase.find(f => f.name === foodName);
                elements.foodSearch.value = foodName;
                elements.foodSuggestions.classList.remove('show');

                // Auto-fill custom food fields
                if (state.selectedFood) {
                    elements.customFoodName.value = state.selectedFood.name;
                    elements.customFoodCalories.value = state.selectedFood.calories;
                    elements.customFoodServing.value = 100;
                }
            }
        });
    });
}

// Handle adding food
function handleAddFood() {
    const name = elements.customFoodName.value.trim() || elements.foodSearch.value.trim();
    const caloriesPer100g = parseInt(elements.customFoodCalories.value) || 0;
    const serving = parseInt(elements.customFoodServing.value) || 100;

    if (!name) {
        alert('Please enter a food name');
        return;
    }

    if (caloriesPer100g <= 0) {
        alert('Please enter calories');
        return;
    }

    // Calculate actual calories based on serving size
    const actualCalories = Math.round((caloriesPer100g * serving) / 100);

    // Get nutrition info from database or create custom
    let nutritionInfo;
    if (state.selectedFood && state.selectedFood.name.toLowerCase() === name.toLowerCase()) {
        nutritionInfo = {
            protein: Math.round((state.selectedFood.protein * serving) / 100 * 10) / 10,
            carbs: Math.round((state.selectedFood.carbs * serving) / 100 * 10) / 10,
            fat: Math.round((state.selectedFood.fat * serving) / 100 * 10) / 10,
            fiber: Math.round((state.selectedFood.fiber * serving) / 100 * 10) / 10
        };
    } else {
        // Estimate macros for custom foods based on calories
        nutritionInfo = {
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0
        };
    }

    const foodEntry = {
        id: Date.now(),
        name: name,
        calories: actualCalories,
        serving: serving,
        ...nutritionInfo
    };

    // Add to state
    if (!state.meals[state.currentDate]) {
        state.meals[state.currentDate] = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: []
        };
    }

    state.meals[state.currentDate][state.selectedMealType].push(foodEntry);

    // Save and update display
    saveToStorage();
    updateDisplay();
    renderWeeklyChart();

    // Clear inputs
    elements.foodSearch.value = '';
    elements.customFoodName.value = '';
    elements.customFoodCalories.value = '';
    elements.customFoodServing.value = 100;
    state.selectedFood = null;
}

// Delete food item
function deleteFood(mealType, foodId) {
    if (state.meals[state.currentDate] && state.meals[state.currentDate][mealType]) {
        state.meals[state.currentDate][mealType] = state.meals[state.currentDate][mealType].filter(
            food => food.id !== foodId
        );
        saveToStorage();
        updateDisplay();
        renderWeeklyChart();
    }
}

// Update display
function updateDisplay() {
    updateMealLists();
    updateCalorieSummary();
    updateNutritionSummary();
}

// Update meal lists
function updateMealLists() {
    const dayMeals = state.meals[state.currentDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

    mealTypes.forEach(mealType => {
        const list = elements[`${mealType}List`];
        const foods = dayMeals[mealType] || [];

        if (foods.length === 0) {
            list.innerHTML = '<li class="empty-message">No foods added</li>';
        } else {
            list.innerHTML = foods.map(food => `
                <li class="food-item">
                    <div class="food-item-info">
                        <span class="food-item-name">${food.name}</span>
                        <span class="food-item-serving">${food.serving}g</span>
                    </div>
                    <span class="food-item-calories">${food.calories} kcal</span>
                    <button class="btn-delete" onclick="deleteFood('${mealType}', ${food.id})">×</button>
                </li>
            `).join('');
        }

        // Update meal calories
        const mealCalories = foods.reduce((sum, food) => sum + food.calories, 0);
        elements[`${mealType}Calories`].textContent = `${mealCalories} kcal`;
    });
}

// Update calorie summary
function updateCalorieSummary() {
    const dayMeals = state.meals[state.currentDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };

    const totalCalories = Object.values(dayMeals).flat().reduce((sum, food) => sum + food.calories, 0);
    const remaining = state.calorieGoal - totalCalories;
    const progressPercent = Math.min((totalCalories / state.calorieGoal) * 100, 100);

    elements.totalCalories.textContent = totalCalories;
    elements.progressFill.style.width = `${progressPercent}%`;

    if (remaining >= 0) {
        elements.remainingCalories.textContent = `${remaining} calories remaining`;
        elements.remainingCalories.classList.remove('over');
    } else {
        elements.remainingCalories.textContent = `${Math.abs(remaining)} calories over goal`;
        elements.remainingCalories.classList.add('over');
    }
}

// Update nutrition summary
function updateNutritionSummary() {
    const dayMeals = state.meals[state.currentDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };

    const allFoods = Object.values(dayMeals).flat();

    const totals = {
        protein: allFoods.reduce((sum, food) => sum + (food.protein || 0), 0),
        carbs: allFoods.reduce((sum, food) => sum + (food.carbs || 0), 0),
        fat: allFoods.reduce((sum, food) => sum + (food.fat || 0), 0),
        fiber: allFoods.reduce((sum, food) => sum + (food.fiber || 0), 0)
    };

    elements.totalProtein.textContent = `${Math.round(totals.protein)}g`;
    elements.totalCarbs.textContent = `${Math.round(totals.carbs)}g`;
    elements.totalFat.textContent = `${Math.round(totals.fat)}g`;
    elements.totalFiber.textContent = `${Math.round(totals.fiber)}g`;
}

// Render weekly chart
function renderWeeklyChart() {
    const days = [];
    const today = new Date(state.currentDate);

    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        days.push(date);
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const html = days.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const dayMeals = state.meals[dateStr] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
        const dayCalories = Object.values(dayMeals).flat().reduce((sum, food) => sum + food.calories, 0);
        const heightPercent = Math.min((dayCalories / state.calorieGoal) * 100, 120);
        const isOver = dayCalories > state.calorieGoal;
        const isToday = dateStr === state.currentDate;

        return `
            <div class="day-bar ${isToday ? 'today' : ''}">
                <div class="bar-container">
                    <div class="bar-fill ${isOver ? 'over' : ''}" style="height: ${heightPercent}%"></div>
                </div>
                <span class="day-label">${dayNames[date.getDay()]}</span>
                <span class="day-calories">${dayCalories}</span>
            </div>
        `;
    }).join('');

    elements.weekChart.innerHTML = html;
}

// Make deleteFood function globally accessible
window.deleteFood = deleteFood;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
