import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';

@Component({
    selector: 'events-list',
    templateUrl: 'events-list.component.html'
})

export class EventsListComponent implements OnInit {
    constructor(private service: EventService, private toastr:ToastrService) { 
      
    }
    ngOnInit() { 
      this.events = this.service.getEvents();
    }

    handleThumbnailClick(eventName){
      this.toastr.success(eventName)
    }

    events:any[];
}