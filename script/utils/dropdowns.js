const selectedDropdownFieldsList = document.getElementById('selected-dropdown-fields')

const ingredientsDropdownTriggerButton = document.getElementById('ingredients-dropdown-trigger-button');
const ingredientsDropdown = document.getElementById('ingredients-dropdown');

ingredientsDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.toggle('active');
    appareilsDropdown.classList.remove('active');
    ustensilesDropdown.classList.remove('active');
})
const ingredientsDropdownFilterInput = ingredientsDropdown.querySelector('input[name="search-recipe"]')


const fillIngredientsDropdownList = (ingredients) => {
    const ingredientsList = document.getElementById('ingredients-list');
    const ingredientsSelectedList = document.getElementById('ingredients-selected');
    ingredientsList.innerHTML = '';
    ingredientsSelectedList.innerHTML = '';
    for (const ingredient of ingredients) {
        if (ingredient.isSelected) {
            ingredientsSelectedList.appendChild(ingredient.getTemplateEntryDom());
            selectedDropdownFieldsList.appendChild(ingredient.getTemplateCardDom());
        }else {
            ingredientsList.appendChild(ingredient.getTemplateEntryDom());
        }
    }
}

ingredientsDropdownFilterInput.addEventListener('input', (e) => {
    clearSelectedDropdownFieldsListDisplay();
    fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes());
})

const appareilsDropdownTriggerButton = document.getElementById('appareils-dropdown-trigger-button');
const appareilsDropdown = document.getElementById('appareils-dropdown');
appareilsDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.remove('active');
    appareilsDropdown.classList.toggle('active');
    ustensilesDropdown.classList.remove('active');
})
const appareilsDropdownFilterInput = appareilsDropdown.querySelector('input[name="search-recipe"]')

const fillAppareilsDropdownList = (appareils) => {
    const appareilsList = document.getElementById('appareils-list');
    const appareilsSelectedList = document.getElementById('appareils-selected');
    appareilsList.innerHTML = '';
    appareilsSelectedList.innerHTML = '';
    for (const appareil of appareils) {
        if (appareil.isSelected) {
            appareilsSelectedList.appendChild(appareil.getTemplateEntryDom());
            selectedDropdownFieldsList.appendChild(appareil.getTemplateCardDom());
        }else {
            appareilsList.appendChild(appareil.getTemplateEntryDom());
        }
    }
}

appareilsDropdownFilterInput.addEventListener('input', (e) => {
    clearSelectedDropdownFieldsListDisplay();
    fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes());
})

const ustensilesDropdownTriggerButton = document.getElementById('ustensiles-dropdown-trigger-button');
const ustensilesDropdown = document.getElementById('ustensiles-dropdown');
ustensilesDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.remove('active');
    appareilsDropdown.classList.remove('active');
    ustensilesDropdown.classList.toggle('active');
})
const ustensilesDropdownFilterInput = ustensilesDropdown.querySelector('input[name="search-recipe"]')

const fillUstensilesDropdownList = (ustensiles) => {
    const ustensilesList = document.getElementById('ustensiles-list');
    const ustensilesSelectedList = document.getElementById('ustensiles-selected');
    ustensilesList.innerHTML = '';
    ustensilesSelectedList.innerHTML = '';
    for (const ustensile of ustensiles) {
        if (ustensile.isSelected) {
            ustensilesSelectedList.appendChild(ustensile.getTemplateEntryDom());
            selectedDropdownFieldsList.appendChild(ustensile.getTemplateCardDom());
        }else {
            ustensilesList.appendChild(ustensile.getTemplateEntryDom());
        }
    }
}

ustensilesDropdownFilterInput.addEventListener('input', (e) => {
    clearSelectedDropdownFieldsListDisplay();
    fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes());
})

const inputFormFilters = document.querySelectorAll('form.input-form-filter');

inputFormFilters.forEach(filter => {
    const input = filter.querySelector('input');
    const clearInputButton = filter.querySelector('button[type="reset"]');
    input.addEventListener('input', (e) => {
        input.value === '' ? clearInputButton.classList.add('invisible') : clearInputButton.classList.remove('invisible');
    })
    clearInputButton.addEventListener('click', (e) => {
        clearInputButton.classList.add('invisible');
        mainSearchBarInput.value = '';
        clearSelectedDropdownFieldsListDisplay();
        fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, '')]);
        fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, '')]);
        fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, '')]);
        displayRecipes(filteredRecipes());
    })
});

const clearSelectedDropdownFieldsListDisplay = () => {
    selectedDropdownFieldsList.innerHTML = '';
}