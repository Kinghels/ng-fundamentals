import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let mockEventService, mockRouter;

  beforeEach(() => {
    component = new CreateEventComponent(mockEventService, mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
