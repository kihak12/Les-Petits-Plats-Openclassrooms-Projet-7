class Recipe {
    constructor(data) {
        this._id = data.id;
        this._image = data.image;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = [];

        const sortedIngredients = sortArray(data.ingredients, 'ingredient');
        for (const ingredient of sortedIngredients) {
            this._ingredients.push(new Ingredient(ingredient));
        }
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = []

        const sortedUstensils = sortArray(data.ustensils, '', false)
        for (const ustensile of sortedUstensils) {
            this._ustensils.push(ustensile.toLowerCase());
        }
    }

    get id() {
        return this._id;
    }

    get image() {
        return this._image;
    }

    get imageLink() {
        return `./assets/images/${this._image}`;
    }

    get name() {
        return this._name;
    }

    get servings() {
        return this._servings;
    }

    get ingredients() {
        return this._ingredients;
    }

    get time() {
        return this._time;
    }

    get timeDuration() {
        return `${this._time}min`;
    }

    get description() {
        return this._description;
    }

    get appliance() {
        return this._appliance;
    }

    get ustensils() {
        return this._ustensils;
    }

    getTemplateCardDom = () => {
        const article = document.createElement('article');
        article.classList.add('bg-white', 'w-96', 'rounded-3xl', 'overflow-hidden');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('relative');

        const img = document.createElement('img');
        img.classList.add('max-h-64', 'w-96', 'object-cover');
        img.src = this.imageLink;

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('absolute', 'top-6', 'right-6', 'py-1', 'px-4', 'bg-main-yellow', 'rounded-full');
        timeSpan.textContent = this.timeDuration;

        imageDiv.appendChild(img);
        imageDiv.appendChild(timeSpan);
        article.appendChild(imageDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('flex', 'flex-col', 'gap-7', 'm-7');

        const h2 = document.createElement('h2');
        h2.classList.add('font-anton', 'text-xl');
        h2.textContent = this.name;

        const contentDivDiv = document.createElement('div');
        contentDivDiv.classList.add('flex', 'flex-col', 'gap-3');

        const contentDivH3 = document.createElement('h3');
        contentDivH3.classList.add('text-gray-400', 'font-bold', 'text-1xs', 'tracking-wider', 'uppercase');
        contentDivH3.textContent = 'Recette';

        const contentDivP = document.createElement('h3');
        contentDivP.classList.add('text-xs');
        contentDivP.textContent = this.description;
        contentDivDiv.appendChild(contentDivH3);
        contentDivDiv.appendChild(contentDivP);

        contentDiv.appendChild(h2);
        contentDiv.appendChild(contentDivDiv);

        const listDiv = document.createElement('div');
        listDiv.classList.add('flex', 'flex-col', 'gap-1.5');

        const listH3 = document.createElement('h3');
        listH3.classList.add('text-gray-400', 'font-bold', 'text-1xs', 'tracking-wider', 'uppercase');
        listH3.textContent = 'Ingrédients';

        const ul = document.createElement('ul');
        ul.classList.add('grid', 'grid-cols-2', 'gap-x-7', 'text-xs', '*:flex', '*:flex-col', '*:py-2');

        for (const ingredient of this.ingredients) {
            ul.appendChild(ingredient.getIngredientItemListTemplateCardDom());
        }

        listDiv.appendChild(listH3);
        listDiv.appendChild(ul);
        contentDiv.appendChild(listDiv);
        article.appendChild(contentDiv);
        return article;
    }
}