import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolverService,
  CreateSessionComponent
 } from './events/index';
import { Error404Component } from './errors/error404/404.component';


const routes: Routes = [
  {path: 'events', component:EventsListComponent, resolve: {events: EventListResolverService}},
  {path: 'events/new', component:CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']},
  {path: 'events/:id', component:EventDetailsComponent,
    canActivate:[EventRouteActivator]},
  {path:'404', component:Error404Component},
    {path:'', redirectTo:'/events', pathMatch:'full'},
    {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    {path: 'events/session/new', component: CreateSessionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
