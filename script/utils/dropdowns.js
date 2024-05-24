const ingredientsDropdownTriggerButton = document.getElementById('ingredients-dropdown-trigger-button');
const ingredientsDropdown = document.getElementById('ingredients-dropdown');
ingredientsDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.toggle('active');
    appareilsDropdown.classList.remove('active');
    ustensilesDropdown.classList.remove('active');
})

const appareilsDropdownTriggerButton = document.getElementById('appareils-dropdown-trigger-button');
const appareilsDropdown = document.getElementById('appareils-dropdown');
appareilsDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.remove('active');
    appareilsDropdown.classList.toggle('active');
    ustensilesDropdown.classList.remove('active');
})

const ustensilesDropdownTriggerButton = document.getElementById('ustensiles-dropdown-trigger-button');
const ustensilesDropdown = document.getElementById('ustensiles-dropdown');
ustensilesDropdownTriggerButton.addEventListener('click', (e) => {
    ingredientsDropdown.classList.remove('active');
    appareilsDropdown.classList.remove('active');
    ustensilesDropdown.classList.toggle('active');
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
    })
});