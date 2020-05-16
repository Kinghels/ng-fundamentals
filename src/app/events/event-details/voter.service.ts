import { Injectable, Input } from '@angular/core';
import { ISessions } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  
  constructor() { }

  addVoter(session: ISessions, voterName: string){
    session.voters.push(voterName);
  }

  deleteVoter(session: ISessions, voterName: string){
    session.voters = session.voters.filter(v=>v !== voterName);
  }

  userHasVoted(session: ISessions, voterName: string): boolean{
    return session.voters.some(v => v === voterName);
  }
}
