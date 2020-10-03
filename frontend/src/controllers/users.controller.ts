import { UsersService } from '../services/users.service';
import { eventEmitter } from '../events/event-emitter';
import { IRequest } from '../interfaces/request/request.interface';
import { usersListComponent } from '../components/users-list.component';
import { userInfoComponent } from '../components/user-info.component';
import { USER_DATA_FILLED, USER_DELETED } from '../events/event-names.constants';
import { IUser } from '../interfaces/user.interface';

class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();

    eventEmitter.on(USER_DATA_FILLED, this.save.bind(this));
    eventEmitter.on(USER_DELETED, this.delete.bind(this));
  }

  async list(req: IRequest) {
    let users = await this.service.list();
    
    return await usersListComponent.render(users);
  }

  async getOne(req: IRequest) {
    let loginParam = req?.params.find(param => param.key == 'login');
    let user: IUser = null;

    if (loginParam.value !== 'new') {
      user = await this.service.getOne(loginParam.value);
    }

    return await userInfoComponent.render(user);
  }

  async save(isNew: boolean) {
    let user: IUser = {
      name: (<HTMLInputElement>document.getElementById('name')).value,
      login: (<HTMLInputElement>document.getElementById('login')).value,
      email: (<HTMLInputElement>document.getElementById('email')).value,
      age: Number((<HTMLInputElement>document.getElementById('age')).value),
      description: (<HTMLInputElement>document.getElementById('description')).value,
      sex: (<HTMLInputElement>document.getElementById('maleRadio')).checked ? 'm' : 'f',
    }

    let userBirthday = (<HTMLInputElement>document.getElementById('birthday')).value;
    if (userBirthday) {
      user.birthday = new Date(userBirthday).toISOString();
    }

    let result = isNew ? await this.service.create(user) : await this.service.update(user);

    console.log(result)

    if (result) {
      window.location.assign(`http://localhost:3003/#users`);
    }
  }

  delete(login: string) {
    let result = this.service.delete(login);

    if (result) {
      window.location.reload();
    }
  }

}

export const usersController = new UsersController();