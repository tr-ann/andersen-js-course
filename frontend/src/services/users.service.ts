import { baseUrl } from "../environment.constants";
import { IUser } from "../interfaces/user.interface";

export class UsersService {

  private usersUrl = `${baseUrl}/users`;

  constructor() {}

  async create(user: IUser) {
    let response = await fetch(this.usersUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response.status == 201;
  }

  async getOne(login: string) {
    let response = await fetch(`${this.usersUrl}/${login}`);
    
    return await response.json();
  }

  async list() {
    let response = await fetch(this.usersUrl);

    return await response.json();
  }

  async update(user: IUser) {
    let response = await fetch(`${this.usersUrl}/${user.login}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    return response.status == 200;
  }

  async delete(login: string) {
    await fetch(`${this.usersUrl}/${login}`, {
      method: 'DELETE',
    })

    console.log(`deleted`);
    return true;
  }

}

export let us = new UsersService();
