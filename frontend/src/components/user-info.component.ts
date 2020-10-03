import { USER_DATA_FILLED } from '../events/event-names.constants';
import { eventEmitter } from '../events/event-emitter';
import { IUser } from '../interfaces/user.interface';
import { Component } from './basic.component'

class UserInfoComponent extends Component {

  async render(user: IUser) {

    let userForm = `
      <div class="container col-md-8">
        <div class="form-group row">
          <label for="login" class="col-sm-2 col-form-label">Login</label>
          <div class="col-sm-10">
            <input ${user ? 'disabled' : ''} class="form-control" form="userForm" id="login" name="login" value="${user?.login || ''}">
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input class="form-control" name="name" id="name" value="${user?.name || ''}">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="email" value="${user?.email || ''}">
          </div>
        </div>
        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2">Sex</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="sex" id="maleRadio" value="m" ${user?.sex == 'm' ? 'checked' : ''}>
                <label class="form-check-label" for="maleRadio">Male</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="sex" id="femaleRadio" value="f" ${user?.sex == 'f' ? 'checked' : ''}>
                <label class="form-check-label" for="femaleRadio">Female</label>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form-group row">
          <label for="age" class="col-sm-2 col-form-label">Age</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="age" value="${user?.age || ''}">
          </div>
        </div>
        <div class="form-group row">
          <label for="birthday" class="col-sm-2 col-form-label">Birthday</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" id="birthday" value="${user?.birthday?.split('T')[0] || ''}">
          </div>
        </div>
        <div class="form-group row">
          <label for="description" class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <textarea class="form-control" id="description" value="${user?.description || ''}"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button id="saveUserButton" class="btn btn-outline-info">Save</button>
          </div>
        </div>
      </div>
    `;

    this.destination.innerHTML = userForm;

    let saveButton = document.getElementById('saveUserButton');
    let isNew = user ? false : true;
    saveButton.addEventListener('click', () => { eventEmitter.emit(USER_DATA_FILLED, isNew) })

    return userForm;
  }
}

export const userInfoComponent = new UserInfoComponent();
