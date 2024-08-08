// Title in the header of the page
const headerTitle = document.getElementById('header-title');

// Number of recipes displayed in the list
const numberRecipesInList = document.getElementById('number-recipes-in-list');

// Element in the DOM where recipes are listed
const recipeListDom = document.getElementById('recipe-list');

const mainSearchBar = document.getElementById('main-search-bar');
mainSearchBarInput = mainSearchBar.querySelector('input');

mainSearchBarInput.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
        mainSearchBar.filtered = true;
        selectedDropdownFieldsList.innerHTML = '';
        fillIngredientsDropdownList(filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value));
        fillAppareilsDropdownList(filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value));
        fillUstensilesDropdownList(filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value));
        displayRecipes(filteredRecipes());
    }else if (mainSearchBar.filtered) {
        mainSearchBar.filtered = false;
        refreshData(defaultRecipes);
    }
})

const getMainSearchBarInputValue = () => {
    return mainSearchBarInput.value.length >= 3 ? mainSearchBarInput.value : '';
}


const getRecipes = async () => {
    const recipesFetched = await fetch('/Les-Petits-Plats-Openclassrooms-Projet-7/data/recipes.json').then(response => response.json());
    const recipes = [];
    for (const recipe of recipesFetched) {
        recipes.push(new Recipe(recipe));
    }
    return recipes;
}

const displayRecipes = (recipes) => {
    recipeListDom.innerHTML = '';

    if (recipes.length === 0)  {
        document.getElementById('empty-recipe-list').textContent = `Aucune recette ne contient ‘${getMainSearchBarInputValue()}’ vous pouvez chercher « tarte aux pommes », « poisson », ...`;
    }else {
        document.getElementById('empty-recipe-list').textContent = '';
        for (const recipe of recipes) {
            recipeListDom.appendChild(recipe.getTemplateCardDom());
        }
    }

    displayNumberOfRecipesInTheList(recipes.length);
}

let sortedIngredients = [];
let sortedAppareils = [];
let sortedUstensiles = [];
let selectedIngredientsInFilter = [];
let selectedAppareilsInFilter = [];
let selectedUstensilesInFilter = [];

const filterDropdownList = (list, expected) => {
    const dropdownOptions = getDropdownsFilterByRecipes(filteredRecipes(getMainSearchBarInputValue()));

    if (list[0].type === 'Ingredient'){
        list = dropdownOptions[0];
    }
    else if (list[0].type === 'Appareil'){
        list = dropdownOptions[1];
    }
    else {
        list = dropdownOptions[2];
    }

    const filteredDropdownList = [];

    for(const item of list) {
        if (item.name.includes(expected.toLowerCase()) || item.isSelected) {
            filteredDropdownList.push(item);
        }
    }
    return filteredDropdownList;
}

let defaultRecipes = [];
const filteredRecipes = () => {
    const terms =  getMainSearchBarInputValue();
    let recipeIngredients = [];
    let recipeUstensiles = [];

    const recipes = [];

    for (const recipe of defaultRecipes) {
        recipeIngredients = [];
        recipeUstensiles = [];

        for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(ingredient.ingredient);
        }
        for (const ustensile of recipe.ustensils) {
            recipeUstensiles.push(ustensile)
        }

        if (
            (recipe.name.toLowerCase().includes(terms) || recipe.description.toLowerCase().includes(terms)) &&
            every(recipeIngredients, selectedIngredientsInFilter) &&
            recipe.appliance.toLowerCase().includes(selectedAppareilsInFilter.join()) &&
            every(recipeUstensiles, selectedUstensilesInFilter)
        ) {
            recipes.push(recipe);
        }
    }

    return recipes;
}

const getDropdownsFilterByRecipes = (recipes) => {
    const sortedIngredients5 = [];
    const sortedAppareils5 = [];
    const sortedUstensiles5 = [];

    const addedIngredientsLabel = [];
    const addedAppareilsLabel = [];
    const addedUstensilesLabel = [];

    if (sortedIngredients.length === 0) {
        for (const recipe of recipes) {
            for (const ingredient of recipe.ingredients) {
                if (addedIngredientsLabel.indexOf(ingredient.ingredient.toLowerCase()) === -1) {
                    addedIngredientsLabel.push(ingredient.ingredient.toLowerCase());
                    sortedIngredients5.push(new DropdownEntry(ingredient.ingredient.toLowerCase(), 'Ingredient'));
                }
            }
            if (addedAppareilsLabel.indexOf(recipe.appliance.toLowerCase()) === -1) {
                addedAppareilsLabel.push(recipe.appliance.toLowerCase());
                sortedAppareils5.push(new DropdownEntry(recipe.appliance.toLowerCase(),  'Appareil'));
            }
            for (const ustensile of recipe.ustensils) {
                if (addedUstensilesLabel.indexOf(ustensile.toLowerCase()) === -1) {
                    addedUstensilesLabel.push(ustensile.toLowerCase());
                    sortedUstensiles5.push(new DropdownEntry(ustensile.toLowerCase(), 'Ustensile'));
                }
            }
        }
    }
    else {
        for (const recipe of recipes) {
            for (const ingredient of extractAttributesFromArrayObject(recipe.ingredients, 'ingredient')) {
                if (addedIngredientsLabel.indexOf(ingredient.toLowerCase()) === -1 &&
                    every(extractAttributesFromArrayObject(recipe.ingredients, 'ingredient'), selectedIngredientsInFilter)
                ) {
                    addedIngredientsLabel.push(ingredient.toLowerCase());
                }
            }
            if (addedAppareilsLabel.indexOf(recipe.appliance.toLowerCase()) === -1) {
                addedAppareilsLabel.push(recipe.appliance.toLowerCase());
            }
            for (const ustensile of recipe.ustensils) {
                if (addedUstensilesLabel.indexOf(ustensile.toLowerCase()) === -1 &&
                    every(extractAttributesFromArrayObject(recipe.ustensils, ''), selectedUstensilesInFilter)
                ) {
                    addedUstensilesLabel.push(ustensile.toLowerCase());
                }
            }
        }

        for (const ingredient of sortedIngredients) {
            if (addedIngredientsLabel.includes(ingredient.name) || selectedIngredientsInFilter.includes(ingredient.name)) {
                sortedIngredients5.push(ingredient);
            }
        }

        for (const appareil of sortedAppareils) {
            if (addedAppareilsLabel.includes(appareil.name) || selectedAppareilsInFilter.includes(appareil.name)) {
                sortedAppareils5.push(appareil);
            }
        }

        for (const ustensile of sortedUstensiles) {
            if (addedUstensilesLabel.includes(ustensile.name) || selectedUstensilesInFilter.includes(ustensile.name)) {
                sortedUstensiles5.push(ustensile);
            }
        }
    }
    return [sortArray(sortedIngredients5, 'name'), sortArray(sortedAppareils5, 'name'), sortArray(sortedUstensiles5, 'name')]
}

const fillDropdowns = (recipes) => {
    [sortedIngredients, sortedAppareils, sortedUstensiles] = getDropdownsFilterByRecipes(recipes);

    fillIngredientsDropdownList(sortedIngredients);
    document.addEventListener('dropdownIngredientEntryChange', (e) => {
        selectedIngredientsInFilter = [];
        for (const ingredient of sortedIngredients) {
            if (ingredient.isSelected) {
                selectedIngredientsInFilter.push(ingredient.name);
            }
        }
        selectedDropdownFieldsList.innerHTML = '';

        fillIngredientsDropdownList(filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value));
        fillAppareilsDropdownList(filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value));
        fillUstensilesDropdownList(filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value));
        displayRecipes(filteredRecipes());
    });

    fillAppareilsDropdownList(sortedAppareils);
    document.addEventListener('dropdownAppareilEntryChange', () => {
        selectedAppareilsInFilter = [];
        for (const appareil of sortedAppareils) {
            if (appareil.isSelected) {
                selectedAppareilsInFilter.push(appareil.name)
            }
        }
        selectedDropdownFieldsList.innerHTML = '';

        fillIngredientsDropdownList(filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value));
        fillAppareilsDropdownList(filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value));
        fillUstensilesDropdownList(filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value));
        displayRecipes(filteredRecipes());
    });

    fillUstensilesDropdownList(sortedUstensiles);
    document.addEventListener('dropdownUstensileEntryChange', () => {
        selectedUstensilesInFilter = [];
        for (const ustensile of sortedUstensiles) {
            if (ustensile.isSelected) {
                selectedUstensilesInFilter.push(ustensile.name);
            }
        }
        selectedDropdownFieldsList.innerHTML = '';

        fillIngredientsDropdownList(filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value));
        fillAppareilsDropdownList(filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value));
        fillUstensilesDropdownList(filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value));
        displayRecipes(filteredRecipes());
    });
}

const displayNumberOfRecipesInTheList = (numberOfRecipes) => {
    // Display the number of recipes in the list
    numberRecipesInList.textContent = numberOfRecipes === 1 ? "1 recette" : `${numberOfRecipes} recettes`;
}

const init = async () => {
    // Retrieve recipes data
    defaultRecipes = await getRecipes();

    // Display the header title with the number of recipes
    headerTitle.textContent = `CHERCHEZ PARMI PLUS DE ${defaultRecipes.length} RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES`;
    displayNumberOfRecipesInTheList(defaultRecipes.length);

    refreshData(defaultRecipes);
}

const refreshData = (recipes) => {
    fillDropdowns(recipes);
    displayRecipes(recipes);
}

init();