import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app-root',
  templateUrl: 'events-app.component.html',
})
export class EventsAppComponent implements OnInit {
  title = 'ng-fundamentals';

  constructor(private auth: AuthService){

  }
  ngOnInit(): void {
    this.auth.checkAuthenticationStatus();
  }


}
