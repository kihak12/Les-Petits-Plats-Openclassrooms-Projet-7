class Ingredient {
    constructor(data) {
        this._ingredient = data.ingredient.toLowerCase();
        this._quantity = data.quantity;
        this._unit = data.unit;
    }

    get ingredient() {
        return this._ingredient;
    }

    get quantity() {
        return this._quantity;
    }

    get unit() {
        return this._unit;
    }

    get ingredientQuantityUnit() {
        return `${this.quantity ? this.quantity : ''} ${this.unit ? this.unit : ''}`;
    }

    getIngredientItemListTemplateCardDom = () => {
        const li = document.createElement('li');
        const ingredientSpan = document.createElement('span');
        ingredientSpan.classList.add('font-medium');
        ingredientSpan.textContent = this.ingredient;

        const ingredientUnitSpan = document.createElement('span');
        ingredientUnitSpan.classList.add('text-gray-400');
        ingredientUnitSpan.textContent = this.ingredientQuantityUnit;

        li.appendChild(ingredientSpan);
        li.appendChild(ingredientUnitSpan);
        return li;
    }
}