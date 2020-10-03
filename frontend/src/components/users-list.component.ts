import { eventEmitter } from '../events/event-emitter';
import { EMPTY_USER_FORM, USER_DELETED } from '../events/event-names.constants';
import { IUser } from "../interfaces/user.interface";
import { Component } from './basic.component';

class UsersListComponent extends Component {

  async render(users: IUser[]) {
    let usersList = `
      <h2>Users</h2>
      <a href="#users/new" class="btn btn-info">Create</a>
      <br>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">login</th>
          <th scope="col">name</th>
          <th scope="col">email</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
    `;

    usersList += users.reduce((prev, user, index) => {
      return prev + `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${user.login}</td>
          <td>${user.name}</td>
          <td>${user.email || ''}</td>
          <td><a href="#users/${user.login}">More info</a></td>
          <td><button type="button" id="delete-${user.login}" class="btn btn-link">Delete</button>
        </tr>
      `;
    }, ``);

    usersList += `</table>`

    this.destination.innerHTML = usersList;

    users.forEach(user => {
      document.getElementById(`delete-${user.login}`)
        .addEventListener('click', () => { eventEmitter.emit(USER_DELETED, user.login) });
    });

    return usersList;
  }

}

export const usersListComponent = new UsersListComponent();
