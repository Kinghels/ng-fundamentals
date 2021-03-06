import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/events/shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISessions } from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'name';
  constructor(private service: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.forEach((data) => {
      this.event = data.event;
      this.addMode = false;
    });
    // this.event = this.service.getEvent(+this.route.snapshot.params['id'])
  }

  addSession(){
    this.addMode = true;
  }

  saveNewSession(session: ISessions){
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.service.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelNewSession(){
    this.addMode = false;
  }

}
