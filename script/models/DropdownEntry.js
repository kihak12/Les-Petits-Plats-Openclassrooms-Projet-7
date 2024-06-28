class DropdownEntry {
    constructor(itemName, type, selected = false) {
        this._name = itemName;
        this._type = type;
        this._selected = selected;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get isSelected() {
        return this._selected;
    }

    toggleSelected() {
        this._selected = !this._selected;
        document.dispatchEvent(new CustomEvent(`dropdown${this.type}EntryChange`, { detail: this }));
    }

    getTemplateEntryDom = () => {
        const li = document.createElement('li');
        li.classList.add('flex', 'items-center', 'justify-between', 'gap-1', 'px-4', 'py-2');

        const span = document.createElement('span');
        span.classList.add('first-letter:uppercase');
        span.textContent = this.name;

        li.appendChild(span);

        if(this.isSelected) {
            li.classList.add('group/item', 'bg-main-yellow', 'hover:font-bold');
            const i = document.createElement('i');
            i.classList.add('fa-solid', 'fa-circle-xmark', 'cursor-pointer', 'opacity-0', 'transition', 'opacity', 'group-hover/item:opacity-100');
            i.onclick = () => {
                this.toggleSelected();
            };
            li.appendChild(i);
        }else {
            li.classList.add('cursor-pointer', 'transition', 'background', 'hover:bg-gray-100');
            li.onclick = () => {
                this.toggleSelected();
            };
        }
        return li;
    }

    getTemplateCardDom = () => {
        const div = document.createElement('div');
        div.classList.add('bg-main-yellow', 'p-4', 'rounded-lg', 'flex', 'items-center', 'justify-between', 'w-56', 'gap-2');

        const span = document.createElement('span');
        span.classList.add('text-xs', 'first-letter:uppercase');
        span.textContent = this.name;
        div.appendChild(span);

        const i = document.createElement('i');
        i.classList.add('fa-solid', 'fa-circle-xmark', 'cursor-pointer');
        i.onclick = () => {
            this.toggleSelected();
        };
        div.appendChild(i);
        return div;
    }
}