import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/events/shared/event.service';
import {ActivatedRoute} from '@angular/router'
import { IEvent } from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private service: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.service.getEvent(+this.route.snapshot.params['id'])
  }

  event:IEvent
}
