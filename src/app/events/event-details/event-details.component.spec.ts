import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let mockEventService, mockRoute;

  beforeEach(() => {
    component = new EventDetailsComponent(mockEventService, mockRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
