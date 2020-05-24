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
        tap(data=>{
          if(data instanceof Object){
            this.currentUser = <IUser>data
          }
        })
      )
  }
  currentUser: IUser
  
  constructor(private httpClient: HttpClient) { }

  loginUser(userName:string, password:string){
    // this.currentUser = {
    //   id:1,
    //   firstName: 'John',
    //   lastName: 'Papa',
    //   userName: userName 
    // }

    let loginInfo = { username: userName, password: password };
    let options = {headers : new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.post('/api/login', loginInfo, options)
      .pipe(
        tap((data)=>{
          this.currentUser = <IUser>data['user'];
        })
      )
      .pipe(catchError(err=> {
        return of(false);
      }))
  }

  updateCurrentUser(firstName:string, lastName:string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let options = {headers : new HttpHeaders({'Content-Type': 'application/json'})}
    return this.httpClient.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  isAuthenticated(): boolean{
    return !!this.currentUser;
  }

  logout(){
    this.currentUser = undefined;
    
    let options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post('/api/logout', {}, options);
  }
}
