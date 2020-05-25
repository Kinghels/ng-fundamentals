import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListComponent } from './session-list.component';
import { ISessions } from '../shared';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;
  
  beforeEach(()=>{
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', ()=>{
    it('should filter the sessions correctly', () => {
      component.sessions = <ISessions[]>[
        {name: 'session 1', level: 'intermediate'},
        {name: 'session 2', level: 'intermediate'},
        {name: 'session 3', level: 'beginner'}
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.filteredSessions.length).toBe(2);
    });

    it('should sort the sessions correctly', () => {
      component.sessions = <ISessions[]>[
        {name: 'session 1', level: 'intermediate'},
        {name: 'session 3', level: 'intermediate'},
        {name: 'session 2', level: 'beginner'}
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.filteredSessions[1].name).toBe('session 3');
    });
  })
});
