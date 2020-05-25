import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let mockHttpClient;

  beforeEach(() => {
    service = new EventService(mockHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
