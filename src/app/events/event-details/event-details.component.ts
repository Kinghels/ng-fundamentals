import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/events/shared/event.service';
import {ActivatedRoute} from '@angular/router'
import { IEvent, ISessions } from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event:IEvent
  addMode: boolean
  filterBy: string = 'all';
  sortBy: string = 'name'
  constructor(private service: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.service.getEvent(+this.route.snapshot.params['id'])
  }

  addSession(){
    this.addMode = true
  }

  saveNewSession(session: ISessions){
    const nextId = Math.max.apply(null, this.event.sessions.map(s=>s.id))
    session.id = nextId + 1
    this.event.sessions.push(session)
    this.service.updateEvent(this.event)
    this.addMode = false
  }

  cancelNewSession(){
    this.addMode = false
  }

}
