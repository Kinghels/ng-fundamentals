import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolverService,
  CreateSessionComponent
} from './events/index'
import { AppRoutingModule } from './app-routing.module';
import { EventsAppComponent } from './events-app.component';
import { NavComponent } from './nav/nav.component'
import { ToastrService} from './common/toastr.service';
import { Error404Component } from './errors/error404/404.component'
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService, 
    ToastrService,
    EventRouteActivator,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    EventListResolverService,
    AuthService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty){
    return window.confirm('You have not saved your work, do you really want to cancel?')
  }
  return true
}