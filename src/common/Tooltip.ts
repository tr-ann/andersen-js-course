import { itemsModel } from "../modules/items/models/ItemsModel";
import { Recipe } from "../modules/recipes/types/recipe.type";

export class Tooltip {

  private tooltipElem: HTMLElement;
  private tooltipText: string;
  
  constructor(recipe: Recipe) {
    this.setTooltip(recipe);
  }

  private setTooltip(recipe: Recipe) {
    let ingredients = recipe.ingredients.map((itemId => itemsModel.getById(itemId)));

    let ingredientsName = new Map<string, number>();

    ingredients.forEach(item => {
      let curr = ingredientsName.get(item.name);

      if (curr) {
        ingredientsName.set(item.name, curr + 1);
      } else {
        ingredientsName.set(item.name, 1);
      }
    });

    let ingredientsStr = Array.from(ingredientsName).map(item => `${item[0]} x${item[1]}`).join(', ');

    this.tooltipText = `<span class="tooltip-name">${recipe.name}</span><br>
    имя предмета: ${recipe.itemName}<br>
    ингредиенты: ${ingredientsStr}`;
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