import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISessions } from '../shared';
import { filter } from 'rxjs/operators';
import { sha1 } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnInit, OnChanges {
  @Input() sessions:ISessions[]
  @Input() filteredSessions:ISessions[] = []
  @Input() filterBy: string
  @Input() sortBy: string

  constructor() { }

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