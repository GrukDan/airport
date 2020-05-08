import { Injectable } from '@angular/core';
import {User} from "../model/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles:string[] = ["Admin","Expert"]

  constructor() { }


  signOut() {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getIdUser():number{
    return  <number>JSON.parse(sessionStorage.getItem(USER_KEY))['idUser'];
  }

  public getUserName():string{
    return  <string>JSON.parse(sessionStorage.getItem(USER_KEY))['userName'];
  }

  public getUserSurname():string{
    return  <string>JSON.parse(sessionStorage.getItem(USER_KEY))['userSurname'];
  }

  public isAuthorized():boolean{
    if(this.getUser()!=null)
      return true;
    else return false;
  }

  public isAdmin():boolean{
    return this.getUser()["role"] == this.roles[0];
  }

  isExpert():boolean {
    return this.getUser()["role"] == this.roles[1];
  }
}
