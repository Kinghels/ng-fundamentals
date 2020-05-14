import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISessions, EventService } from '../events';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchTerm: string = "";
  foundSessions :ISessions[];

  constructor(public authService: AuthService,
    private eventService: EventService) { }

  ngOnInit(): void {
  }

  searchSessions(searchTerm){
    this.eventService.searchSessions(searchTerm).subscribe(sessions =>{
      this.foundSessions = sessions
      console.log(this.foundSessions);
      });

  }
}
