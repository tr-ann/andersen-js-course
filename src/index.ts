import './styles/main.css';
import { workbenchView } from './modules/workbench/views/WorkbenchView';
import { recipesView } from './modules/recipes/views/RecipesView';
import { itemsView } from './modules/items/views/ItemsView';
import { ErrorHandler } from './common/ErrorHandler';

let handler = new ErrorHandler();

let mainBlock = document.createElement('div');
mainBlock.style.display = 'flex';
mainBlock.style.justifyContent = 'space-around';

itemsView.drawItemsList(mainBlock);
workbenchView.drawWorkbench(mainBlock);
recipesView.drawRecipesList(mainBlock);

document.body.appendChild(mainBlock);
