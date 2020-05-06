import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser
  
  constructor() { }

  loginUser(userName:string, password:string){
    this.currentUser = {
      id:1,
      firstName: 'John',
      lastName: 'Papa',
      userName: userName
    }
  }

  updateCurrentUser(firstName:string, lastName:string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  isAuthenticated(): boolean{
    return !!this.currentUser;
  }
}
