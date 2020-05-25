import { Injectable, Input } from '@angular/core';
import { ISessions } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  
  constructor(private httpClient: HttpClient) { }

  addVoter(eventId: number, session: ISessions, voterName: string){
    session.voters.push(voterName);

    let options = {
      headers: new HttpHeaders({'Content-Type': '/application/json'})
    }
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.httpClient.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter'))).subscribe();
  }

  deleteVoter(eventId:number, session: ISessions, voterName: string){
    session.voters = session.voters.filter(v=>v !== voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.httpClient.delete(url)
    .pipe(catchError(this.handleError('deleteVoter'))).subscribe();
  }

  userHasVoted(session: ISessions, voterName: string): boolean{
    return session.voters.some(v => v === voterName);
  }

  private handleError<T> (operation= 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
