const ingredientsDropdownTriggerButton = document.getElementById('ingredients-dropdown-trigger-button');
const ingredientsDropdown = document.getElementById('ingredients-dropdown');
const ingredientsDropdownFilterInput = ingredientsDropdown.querySelector('input[name="search-recipe"]')

ingredientsDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.toggle('active');
    appareilsDropdown.classList.remove('active');
    ustensilesDropdown.classList.remove('active');
})

const fillIngredientsDropdownList = (ingredients) => {
    const ingredientsList = document.getElementById('ingredients-list');
    const ingredientsSelectedList = document.getElementById('ingredients-selected');
    ingredientsList.innerHTML = '';
    ingredientsSelectedList.innerHTML = '';
    ingredients.forEach(ingredient => {
        ingredient.isSelected ? ingredientsSelectedList.appendChild(ingredient.getTemplateEntryDom()) : ingredientsList.appendChild(ingredient.getTemplateEntryDom());
    })
}

ingredientsDropdownFilterInput.addEventListener('input', (e) => {
    fillIngredientsDropdownList([...filterList(filteredIngredients, ingredientsDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes);
})

const appareilsDropdownTriggerButton = document.getElementById('appareils-dropdown-trigger-button');
const appareilsDropdown = document.getElementById('appareils-dropdown');
const appareilsDropdownFilterInput = appareilsDropdown.querySelector('input[name="search-recipe"]')

appareilsDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.remove('active');
    appareilsDropdown.classList.toggle('active');
    ustensilesDropdown.classList.remove('active');
})

const fillAppareilsDropdownList = (appareils) => {
    const appareilsList = document.getElementById('appareils-list');
    const appareilsSelectedList = document.getElementById('appareils-selected');
    appareilsList.innerHTML = '';
    appareilsSelectedList.innerHTML = '';
    appareils.forEach(appareil => {
        appareil.isSelected ? appareilsSelectedList.appendChild(appareil.getTemplateEntryDom()) : appareilsList.appendChild(appareil.getTemplateEntryDom());
    })
}

appareilsDropdownFilterInput.addEventListener('input', (e) => {
    fillAppareilsDropdownList([...filterList(filteredAppareils, appareilsDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes);
})

const ustensilesDropdownTriggerButton = document.getElementById('ustensiles-dropdown-trigger-button');
const ustensilesDropdown = document.getElementById('ustensiles-dropdown');
const ustensilesDropdownFilterInput = ustensilesDropdown.querySelector('input[name="search-recipe"]')

ustensilesDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.remove('active');
    appareilsDropdown.classList.remove('active');
    ustensilesDropdown.classList.toggle('active');
})

const fillUstensilesDropdownList = (ustensiles) => {
    const ustensilesList = document.getElementById('ustensiles-list');
    const ustensilesSelectedList = document.getElementById('ustensiles-selected');
    ustensilesList.innerHTML = '';
    ustensilesSelectedList.innerHTML = '';
    ustensiles.forEach(ustensile => {
        ustensile.isSelected ? ustensilesSelectedList.appendChild(ustensile.getTemplateEntryDom()) : ustensilesList.appendChild(ustensile.getTemplateEntryDom());
    })
}

ustensilesDropdownFilterInput.addEventListener('input', (e) => {
    fillUstensilesDropdownList([...filterList(filteredUstensiles, ustensilesDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes);
})

const inputFormFilters = document.querySelectorAll('form.input-form-filter');

inputFormFilters.forEach(filter => {
    const input = filter.querySelector('input');
    const clearInputButton = filter.querySelector('button[type="reset"]');
    input.addEventListener('input', (e) => {
        input.value === '' ? clearInputButton.classList.add('invisible') : clearInputButton.classList.remove('invisible');
        console.log()
    })
    clearInputButton.addEventListener('click', (e) => {
        clearInputButton.classList.add('invisible');
        input.value = '';
        fillIngredientsDropdownList(filterList(filteredIngredients, ingredientsDropdownFilterInput.value));
        fillAppareilsDropdownList([...filterList(filteredAppareils, appareilsDropdownFilterInput.value)]);
        fillUstensilesDropdownList(filterList(filteredUstensiles, ustensilesDropdownFilterInput.value));
    })
});