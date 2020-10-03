import { Router } from './router';
import { IRoute } from './interfaces/route.interface';
import './styles/main.css';
import { usersController } from './controllers/users.controller';

const routes: IRoute[] = [
  { path: 'users/:login', re: /^(users)\/\w/, method: usersController.getOne.bind(usersController) },
  { path: 'users', re: /^users/, method: usersController.list.bind(usersController) },
]
const router =  new Router(routes);

window.addEventListener('hashchange', async () => await router.navigate());
window.addEventListener('load', () => router.navigate());