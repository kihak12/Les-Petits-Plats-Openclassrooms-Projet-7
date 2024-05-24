// Title in the header of the page
const headerTitle = document.getElementById('header-title');

// Number of recipes displayed in the list
const numberRecipesInList = document.getElementById('number-recipes-in-list');

// Element in the DOM where recipes are listed
const recipeListDom = document.getElementById('recipe-list');

// List of selectable and selected ingredients in the dropdown
const ingredientsList = document.getElementById('ingredients-list');
const ingredientsSelected = document.getElementById('ingredients-selected');

// List of selectable and selected devices in the dropdown
const appareilsList = document.getElementById('appareils-list');
const appareilsSelected = document.getElementById('appareils-selected');

// List of selectable and selected utensils in the dropdown
const ustensilesList = document.getElementById('ustensiles-list');
const ustensilesSelected = document.getElementById('ustensiles-selected');

const getRecipes = async () => {
    return await fetch('/Les-Petits-Plats-Openclassrooms-Projet-7/data/recipes.json').then(response => response.json());
}

const displayRecipes = (recipes) => {
    recipeListDom.innerHTML = '';
}

const fillDropdowns = (recipes) => {}

const displayNumberOfRecipesInTheList = (numberOfRecipes) => {
    // Display the number of recipes in the list
    numberRecipesInList.textContent = numberOfRecipes === 1 ? "1 recette" : `${numberOfRecipes} recettes`;
}

const init = async () => {
    // Retrieve recipes data
    const recipes = await getRecipes();

    // Display the header title with the number of recipes
    headerTitle.textContent = "CHERCHEZ PARMI PLUS DE 12 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES";
    displayNumberOfRecipesInTheList(recipes.length);

    displayRecipes(recipes);
}

init();