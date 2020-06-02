import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { last, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  currentUser: IUser;
  checkAuthenticationStatus() {
    // Dos formas de hacer esta llamada
    // this.httpClient.get('/api/currentIdentity')
    //   .subscribe(data=>{
    //     if(data instanceof Object){
    //       this.currentUser = <IUser>data
    //     }
    //   });

    // Con tap podriamos retornar un observable y que al llamar al metodo pueda suscribirse para realizar alguna logica
    this.httpClient.get('/api/currentIdentity')
      .pipe(
        tap(data => {
          if (data instanceof Object){
            this.currentUser = (data as IUser);
          }
        })
      );
  }

  loginUser(userName: string, password: string){
    // this.currentUser = {
    //   id:1,
    //   firstName: 'John',
    //   lastName: 'Papa',
    //   userName: userName
    // }

    const loginInfo = { username: userName, password };
    const options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post('/api/login', loginInfo, options)
      .pipe(
        tap((data) => {
          this.currentUser = (data.user as IUser);
        })
      )
      .pipe(catchError(err => {
        return of(false);
      }));
  }

  updateCurrentUser(firstName: string, lastName: string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  isAuthenticated(): boolean{
    return !!this.currentUser;
  }

  logout(){
    this.currentUser = undefined;

    const options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post('/api/logout', {}, options);
  }
}
