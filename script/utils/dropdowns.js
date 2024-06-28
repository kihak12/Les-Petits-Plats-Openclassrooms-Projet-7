const ingredientsDropdownTriggerButton = document.getElementById('ingredients-dropdown-trigger-button');
const ingredientsDropdown = document.getElementById('ingredients-dropdown');
const ingredientsDropdownFilterInput = ingredientsDropdown.querySelector('input[name="search-recipe"]')

const selectedDropdownFieldsList = document.getElementById('selected-dropdown-fields')

ingredientsDropdownTriggerButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    toggleDropdown('ingredients', ingredientsDropdownFilterInput);
})

const fillIngredientsDropdownList = (ingredients) => {
    const ingredientsList = document.getElementById('ingredients-list');
    const ingredientsSelectedList = document.getElementById('ingredients-selected');
    ingredientsList.innerHTML = '';
    ingredientsSelectedList.innerHTML = '';
    ingredients.forEach(ingredient => {
        if (ingredient.isSelected) {
            ingredientsSelectedList.appendChild(ingredient.getTemplateEntryDom());
            selectedDropdownFieldsList.appendChild(ingredient.getTemplateCardDom());
        }else {
            ingredientsList.appendChild(ingredient.getTemplateEntryDom());
        }
    })
}

ingredientsDropdownFilterInput.addEventListener('input', (e) => {
    clearSelectedDropdownFieldsListDisplay();
    fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes);
})

const appareilsDropdownTriggerButton = document.getElementById('appareils-dropdown-trigger-button');
const appareilsDropdown = document.getElementById('appareils-dropdown');
const appareilsDropdownFilterInput = appareilsDropdown.querySelector('input[name="search-recipe"]')

appareilsDropdownTriggerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown('appareils', appareilsDropdownFilterInput);
})

const fillAppareilsDropdownList = (appareils) => {
    const appareilsList = document.getElementById('appareils-list');
    const appareilsSelectedList = document.getElementById('appareils-selected');
    appareilsList.innerHTML = '';
    appareilsSelectedList.innerHTML = '';
    appareils.forEach(appareil => {
        if(appareil.isSelected) {
            appareilsSelectedList.appendChild(appareil.getTemplateEntryDom());
            selectedDropdownFieldsList.appendChild(appareil.getTemplateCardDom());
        }else {
            appareilsList.appendChild(appareil.getTemplateEntryDom());
        }
    })
}

appareilsDropdownFilterInput.addEventListener('input', (e) => {
    clearSelectedDropdownFieldsListDisplay();
    fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes);
})

const ustensilesDropdownTriggerButton = document.getElementById('ustensiles-dropdown-trigger-button');
const ustensilesDropdown = document.getElementById('ustensiles-dropdown');
const ustensilesDropdownFilterInput = ustensilesDropdown.querySelector('input[name="search-recipe"]')

ustensilesDropdownTriggerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown('ustensiles', ustensilesDropdownFilterInput);
})

const fillUstensilesDropdownList = (ustensiles) => {
    ustensiles.forEach(ing => console.log(ing.name));
    console.log()
    const ustensilesList = document.getElementById('ustensiles-list');
    const ustensilesSelectedList = document.getElementById('ustensiles-selected');
    ustensilesList.innerHTML = '';
    ustensilesSelectedList.innerHTML = '';
    ustensiles.forEach(ustensile => {
        if(ustensile.isSelected) {
            ustensilesSelectedList.appendChild(ustensile.getTemplateEntryDom());
            selectedDropdownFieldsList.appendChild(ustensile.getTemplateCardDom());
        }else {
            ustensilesList.appendChild(ustensile.getTemplateEntryDom())
        }
    })
}

ustensilesDropdownFilterInput.addEventListener('input', (e) => {
    clearSelectedDropdownFieldsListDisplay();
    fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
    displayRecipes(filteredRecipes);
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
        input.value = '';
        clearSelectedDropdownFieldsListDisplay();
        fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
        fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
        fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
    })
});

const toggleDropdown = (dropdownName, dropdownFilterInput) => {
    switch(dropdownName) {
        case 'ingredients':
            ingredientsDropdown.classList.toggle('active');
            appareilsDropdown.classList.remove('active');
            ustensilesDropdown.classList.remove('active');
            ingredientsDropdown.querySelector('button[type="reset"]').classList.add('invisible');
            document.querySelector('body').addEventListener('click', (e) => {
                if (!ingredientsDropdown.contains(e.target)) {
                    ingredientsDropdown.classList.remove('active');
                }
            }, { once: true });
            break;
        case 'appareils':
            ingredientsDropdown.classList.remove('active');
            appareilsDropdown.classList.toggle('active');
            console.log(dropdownFilterInput.value);
            appareilsDropdown.querySelector('button[type="reset"]').classList.add('invisible')
            ustensilesDropdown.classList.remove('active');
            document.querySelector('body').addEventListener('click', (e) => {
                if (!appareilsDropdown.contains(e.target)) {
                    appareilsDropdown.classList.remove('active');
                }
            }, { once: true });
            break;
        case 'ustensiles':
            ingredientsDropdown.classList.remove('active');
            appareilsDropdown.classList.remove('active');
            ustensilesDropdown.classList.toggle('active');
            ustensilesDropdown.querySelector('button[type="reset"]').classList.add('invisible')
            document.querySelector('body').addEventListener('click', (e) => {
                if (!ustensilesDropdown.contains(e.target)) {
                    ustensilesDropdown.classList.remove('active');
                }
            }, { once: true });
            break;
    }

    dropdownFilterInput.focus();
    dropdownFilterInput.value = '';
    clearSelectedDropdownFieldsListDisplay();
    fillIngredientsDropdownList([...filterDropdownList(sortedIngredients, ingredientsDropdownFilterInput.value)]);
    fillAppareilsDropdownList([...filterDropdownList(sortedAppareils, appareilsDropdownFilterInput.value)]);
    fillUstensilesDropdownList([...filterDropdownList(sortedUstensiles, ustensilesDropdownFilterInput.value)]);
}

const clearSelectedDropdownFieldsListDisplay = () => {
    selectedDropdownFieldsList.innerHTML = '';
}