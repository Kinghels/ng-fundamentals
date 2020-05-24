import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISessions } from '../shared';
import { filter } from 'rxjs/operators';
import { sha1 } from '@angular/compiler/src/i18n/digest';
import { UpvoteComponent} from './upvote/upvote.component'
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnInit, OnChanges {
  @Input() eventId:number;
  @Input() sessions:ISessions[]
  @Input() filteredSessions:ISessions[] = []
  @Input() filterBy: string
  @Input() sortBy: string

  constructor(public authService: AuthService,
    private voterService: VoterService) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.sessions){
      this.filterSessions(this.filterBy)
      this.sortBy === 'name' ?
        this.filteredSessions = this.filteredSessions.sort(sortByNameAsc)
        : this.filteredSessions = this.filteredSessions.sort(sortByVotesAsc)
      }
  }

  ngOnInit(): void {
  }

  toggleVote(session: ISessions){
    if(this.userHasVoted(session)){
      this.voterService.deleteVoter(this.eventId, session, 
        this.authService.currentUser.userName)
    } else{
      this.voterService.addVoter(this.eventId, session, 
        this.authService.currentUser.userName)
    }

    if(this.sortBy === 'votes'){
      this.filteredSessions.sort(sortByVotesAsc);
    }
  }

  userHasVoted(session: ISessions): boolean{
    return this.voterService.userHasVoted(session,
       this.authService.currentUser.userName)
  }

  filterSessions(filterBy:string){
    if(filterBy === 'all'){
      this.filteredSessions = this.sessions.slice(0);
    }else{
      this.filteredSessions = this.sessions.filter(s=> {
        return s.level.toLocaleLowerCase() === filterBy;
      })
    }
  }
}

function sortByNameAsc(s1: ISessions, s2:ISessions){
  if(s1.name > s2.name){
    return 1
  }else if(s1.name === s2.name) {
    return 0
  }
  return -1
}

function sortByVotesAsc(s1: ISessions, s2: ISessions){
  return s2.voters.length - s1.voters.length
}