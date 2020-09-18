import { Recipe } from "../modules/recipes/types/recipe.type";
import { itemsStorage } from "../storage/items.storage";

export class Tooltip {

  private tooltipElem: HTMLElement;
  private tooltipText: string;
  
  constructor(recipe: Recipe) {
    this.setTooltip(recipe);
  }

  private setTooltip(recipe: Recipe) {
    console.log(1);

    let ingredientsName = itemsStorage.list()
      .filter(item => recipe.ingredients.some(itemId => itemId == item.id));

      console.log(2);

    this.tooltipText = `<span class="tooltip-name">${recipe.name}</span><br>
    имя предмета: ${recipe.itemName}<br>
    ингредиенты: ${ingredientsName.map(item => item.name).join(', ')}`;

    console.log(3);
  }

  getTooltip() {
    return this.tooltipText;
  }

  onmouseover(event: MouseEvent) {
    let target = event.target as HTMLElement;

    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;

    this.tooltipElem = document.createElement('div');
    this.tooltipElem.className = 'tooltip';
    this.tooltipElem.innerHTML = tooltipHtml;
    document.body.append(this.tooltipElem);

    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - this.tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - this.tooltipElem.offsetHeight - 5;
    if (top < 0) {
      top = coords.top + target.offsetHeight + 5;
    }

    this.tooltipElem.style.left = left + 'px';
    this.tooltipElem.style.top = top + 'px';
  };

  onmouseout(event: MouseEvent) {
    if (this.tooltipElem) {
      this.tooltipElem.remove();
      this.tooltipElem = null;
    }
  };

}