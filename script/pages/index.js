// Title in the header of the page
const headerTitle = document.getElementById('header-title');

// Number of recipes displayed in the list
const numberRecipesInList = document.getElementById('number-recipes-in-list');

// Element in the DOM where recipes are listed
const recipeListDom = document.getElementById('recipe-list');

const getRecipes = async () => {
    return await fetch('/Les-Petits-Plats-Openclassrooms-Projet-7/data/recipes.json').then(response => response.json());
}

const displayRecipes = (recipes) => {
    recipeListDom.innerHTML = '';
    console.log(recipes);

    const selectedIngredients = filteredIngredients.filter(ingredient => ingredient.isSelected).map(selectedIngredient => selectedIngredient.name);
    const selectedAppareils = filteredAppareils.filter(appareil => appareil.isSelected).map(selectedAppareil => selectedAppareil.name);
    const selectedUstensiles = filteredUstensiles.filter(ustensile => ustensile.isSelected).map(selectedUstensile => selectedUstensile.name);

    console.log('selectedIngredients', selectedIngredients);
    console.log('selectedAppareils', selectedAppareils);
    console.log('selectedUstensiles', selectedUstensiles);

    const filteredRecipes = recipes.filter(recipe => {
        selectedIngredients.every(ingredient => recipe.ingredients.some(recIng  => recIng.ingredient === ingredient.name));
    });

    console.log(filteredRecipes);
    console.log('');

    // filteredRecipes.forEach(recipe => recipeListDom.appendChild(recipe.getTemplateCardDom()));
    recipes.forEach(recipe => recipeListDom.appendChild(recipe.getTemplateCardDom()));
}

let filteredRecipes = [];

let filteredIngredients = [];
let filteredAppareils = [];
let filteredUstensiles = [];

const filterList = (list, expected) => {
    return list.filter(ingredient => ingredient.name.includes(expected.toLowerCase()) || ingredient.isSelected);
}

const fillDropdowns = (recipes) => {
    filteredIngredients =
        [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLocaleLowerCase())).flat())]
            .map(ingredient => new DropdownEntry(ingredient, "Ingredient"))
            .sort((ingredient1, ingredient2) => ingredient1.name > ingredient2.name ? 1 : -1);

    filteredAppareils =
        [...new Set(recipes.flatMap(recipe => recipe.appliance.toLocaleLowerCase()))]
            .map(recipe => new DropdownEntry(recipe, "Appareil"))
            .sort((recipe1, recipe2) => recipe1.name > recipe2.name ? 1 : -1);

    filteredUstensiles =
        [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLocaleLowerCase()).flat()))]
            .map(ustensile => new DropdownEntry(ustensile, "Ustensiles"))
            .sort((ustensile1, ustensile2) => ustensile1.name > ustensile2.name ? 1 : -1);


    fillIngredientsDropdownList(filteredIngredients);
    document.addEventListener('dropdownIngredientEntryChange', () => {
        fillIngredientsDropdownList([...filterList(filteredIngredients, ingredientsDropdownFilterInput.value)]);
        displayRecipes(filteredRecipes);
    });

    fillAppareilsDropdownList(filteredAppareils);
    document.addEventListener('dropdownAppareilEntryChange', () => {
        fillAppareilsDropdownList([...filterList(filteredAppareils, appareilsDropdownFilterInput.value)]);
        displayRecipes(filteredRecipes);
    });

    fillUstensilesDropdownList(filteredUstensiles);
    document.addEventListener('dropdownUstensilesEntryChange', () => {
        fillUstensilesDropdownList([...filterList(filteredUstensiles, ustensilesDropdownFilterInput.value)]);
        displayRecipes(filteredRecipes);
    });
}

const displayNumberOfRecipesInTheList = (numberOfRecipes) => {
    // Display the number of recipes in the list
    numberRecipesInList.textContent = numberOfRecipes === 1 ? "1 recette" : `${numberOfRecipes} recettes`;
}

const init = async () => {
    // Retrieve recipes data
    filteredRecipes = await getRecipes().then(recipes => recipes.map(recipe => new Recipe(recipe)));
    const numberOfRecipes = filteredRecipes.length;

    // Display the header title with the number of recipes
    headerTitle.textContent = `CHERCHEZ PARMI PLUS DE ${numberOfRecipes} RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES`;
    displayNumberOfRecipesInTheList(numberOfRecipes);

    fillDropdowns(filteredRecipes);
    displayRecipes(filteredRecipes);
}

init();