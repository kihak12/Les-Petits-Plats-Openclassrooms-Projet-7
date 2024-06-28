// Title in the header of the page
const headerTitle = document.getElementById('header-title');

const mainSearchBar = document.getElementById('main-search-bar');
mainSearchBarInput = mainSearchBar.querySelector('input');

mainSearchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
        mainSearchBar.filtered = true;
        const recipes = filteredRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(mainSearchBarInput.value.toLowerCase()) ||
            recipe.description.toLowerCase().includes(mainSearchBarInput.value.toLowerCase())
        );
        clearSelectedDropdownFieldsListDisplay();
        fillDropdowns(recipes, [selectedIngredientsInFilter, selectedAppareilsInFilter, selectedUstensilesInFilter]);
        displayRecipes(recipes);
    }else if (mainSearchBar.filtered) {
        mainSearchBar.filtered = false;
        resetRecipesData();
    }
})

mainSearchBar.querySelector('button[type=reset]').addEventListener('click', () => {
    mainSearchBar.filtered = false;
    resetRecipesData();
});

const resetRecipesData = () => {
    clearSelectedDropdownFieldsListDisplay();
    fillDropdowns(filteredRecipes, [selectedIngredientsInFilter, selectedAppareilsInFilter, selectedUstensilesInFilter]);
    displayRecipes(filteredRecipes);
};

// Number of recipes displayed in the list
const numberRecipesInList = document.getElementById('number-recipes-in-list');

// Element in the DOM where recipes are listed
const recipeListDom = document.getElementById('recipe-list');

const getRecipes = async () => {
    return await fetch('/Les-Petits-Plats-Openclassrooms-Projet-7/data/recipes.json').then(response => response.json());
}

let selectedIngredientsInFilter = [];
let selectedAppareilsInFilter = [];
let selectedUstensilesInFilter = [];

const displayRecipes = (recipes) => {
    recipeListDom.innerHTML = '';

    const filteredRecipes = recipes.filter(recipe =>
        (recipe.name.toLowerCase().includes(mainSearchBarInput.value.toLowerCase()) || recipe.description.toLowerCase().includes(mainSearchBarInput.value.toLowerCase())) &&
        selectedIngredientsInFilter.every(ingredient => recipe.ingredients.map(recipeIngredient => recipeIngredient.ingredient).includes(ingredient)) &&
        selectedAppareilsInFilter.every(appareil => recipe.appliance.toLowerCase() === appareil) &&
        selectedUstensilesInFilter.every(ustensile => recipe.ustensils.includes(ustensile))
    );

    if (filteredRecipes.length === 0)  {
        document.getElementById('empty-recipe-list').textContent = `Aucune recette ne contient ‘${mainSearchBar.querySelector('input').value}’ vous pouvez chercher « tarte aux pommes », « poisson », ...`;
    }else {
        document.getElementById('empty-recipe-list').textContent = ``;
        filteredRecipes.forEach(recipe => recipeListDom.appendChild(recipe.getTemplateCardDom()));
    }
    displayNumberOfRecipesInTheList(filteredRecipes.length);
}

let filteredRecipes = [];

let sortedIngredients = [];
let sortedAppareils = [];
let sortedUstensiles = [];

const filterDropdownList = (list, expected) => {
    let availableRecipes = [...filteredRecipes].filter(recipe =>
        selectedIngredientsInFilter.every(ingredient => recipe.ingredients.map(recipeIngredient => recipeIngredient.ingredient).includes(ingredient)) &&
        selectedAppareilsInFilter.every(appareil => recipe.appliance.toLowerCase() === appareil) &&
        selectedUstensilesInFilter.every(ustensile => recipe.ustensils.includes(ustensile))
    );

    const selectedDropdownFields = [
        [...new Set(availableRecipes.filter(recipe =>
            selectedIngredientsInFilter.every(ingredient => recipe.ingredients.map(recipeIngredient => recipeIngredient.ingredient).includes(ingredient)))
            .flatMap(recipe => recipe.ingredients)
            .map(recipe => recipe.ingredient))].map(ingredient => ({
            name: ingredient,
            type: "Ingredient"
        })),
        [...new Set(availableRecipes.filter(recipe =>
            selectedAppareilsInFilter.every(appareil => recipe.appliance.toLowerCase() === appareil))
            .map(recipe => recipe.appliance.toLowerCase()))].map(appliance => ({
            name: appliance,
            type: "Appareil"
        })),
        [...new Set(availableRecipes.filter(recipe =>
            selectedUstensilesInFilter.every(ustensile => recipe.ustensils.includes(ustensile)))
            .flatMap(recipe => recipe.ustensils))]
            .map(ustensile => ({
                name: ustensile,
                type: "Ustensiles"
            }))
    ].flat();

    list = list.filter(item => selectedDropdownFields.some(recipe => recipe.name === item.name && recipe.type === item.type) || item.isSelected);
    return list.filter(ingredient => ingredient.name.includes(expected.toLowerCase()) || ingredient.isSelected);
}

const fillDropdowns = (recipes, [lastIngredients, lastAppareils, lastUstensiles ] = [[], [], []]) => {
    sortedIngredients =
        [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flat())]
            .map(ingredient => new DropdownEntry(ingredient, "Ingredient", lastIngredients.includes(ingredient)))
            .sort((ingredient1, ingredient2) => ingredient1.name > ingredient2.name ? 1 : -1);

    sortedAppareils =
        [...new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))]
            .map(appareil => new DropdownEntry(appareil, "Appareil", lastAppareils.includes(appareil)))
            .sort((appareil1, appareil2) => appareil1.name > appareil2.name ? 1 : -1);

    sortedUstensiles =
        [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).flat()))]
            .map(ustensile => new DropdownEntry(ustensile, "Ustensiles", lastUstensiles.includes(ustensile)))
            .sort((ustensile1, ustensile2) => ustensile1.name > ustensile2.name ? 1 : -1);


    fillIngredientsDropdownList(sortedIngredients);
    document.addEventListener('dropdownIngredientEntryChange', () => {
        selectedIngredientsInFilter = sortedIngredients.filter(ingredient => ingredient.isSelected).map(selectedIngredient => selectedIngredient.name);
        selectedDropdownFieldsList.innerHTML = '';

        fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
        fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
        fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
        displayRecipes(filteredRecipes);
    });

    fillAppareilsDropdownList(sortedAppareils);
    document.addEventListener('dropdownAppareilEntryChange', () => {
        selectedAppareilsInFilter = sortedAppareils.filter(appareil => appareil.isSelected).map(selectedAppareil => selectedAppareil.name);
        selectedDropdownFieldsList.innerHTML = '';

        fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
        fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
        fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
        displayRecipes(filteredRecipes);
    });

    fillUstensilesDropdownList(sortedUstensiles);
    document.addEventListener('dropdownUstensilesEntryChange', () => {
        selectedUstensilesInFilter = sortedUstensiles.filter(ustensile => ustensile.isSelected).map(selectedUstensile => selectedUstensile.name);
        selectedDropdownFieldsList.innerHTML = '';

        fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
        fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
        fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
        displayRecipes(filteredRecipes);
    });
}

const displayNumberOfRecipesInTheList = (numberOfRecipes) => {
    // Display the number of recipes in the list
    numberRecipesInList.textContent = numberOfRecipes === 1 ? "1 recette" : `${numberOfRecipes} recettes`;
}

// Contain the default list of recipes received
let defaultRecipesData = [];

const init = async () => {
    // Retrieve recipes data
    filteredRecipes = await getRecipes().then(recipes => recipes.map(recipe => new Recipe(recipe)));
    defaultRecipesData = filteredRecipes;
    const numberOfRecipes = filteredRecipes.length;

    // Display the header title with the number of recipes
    headerTitle.textContent = `CHERCHEZ PARMI PLUS DE ${numberOfRecipes} RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES`;
    displayNumberOfRecipesInTheList(numberOfRecipes);

    fillDropdowns(filteredRecipes);
    displayRecipes(filteredRecipes);
}

init();