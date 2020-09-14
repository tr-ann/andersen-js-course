import './styles/main.css';
import { workbenchView } from './modules/workbench/views/WorkbenchView';
import { recipesView } from './modules/recipes/views/RecipesView';
import { itemsView } from './modules/items/views/ItemsView';
import { eventEmitter } from './events/index';

const workbenchFragment = workbenchView.createWorkbench();
const recipesFragment = recipesView.createRecipesList();
const itemsFragment = itemsView.createItemsList();

let mainBlock = document.createElement('div');
mainBlock.style.display = 'flex';
mainBlock.style.justifyContent = 'space-around';

mainBlock.appendChild(itemsFragment);
mainBlock.appendChild(workbenchFragment);
mainBlock.appendChild(recipesFragment);

document.body.appendChild(mainBlock);

let button = document.createElement('button');
button.textContent = 'test create item';

button.addEventListener('click', () => {
  eventEmitter.emit('event:create-item', { recipeId: 1, itemsId: [1, 2, 3]})
})

document.body.appendChild(button);