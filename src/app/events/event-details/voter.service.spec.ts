import { TestBed } from '@angular/core/testing';

import { VoterService } from './voter.service';
import { ISessions } from '../shared';
import { of } from 'rxjs';

describe('VoterService', () => {
  let service: VoterService,
  mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    service = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      let session = { id: 6, voters: ['joe', 'john']};

      mockHttp.delete.and.returnValue(of(false));

      service.deleteVoter(3, session as ISessions, 'joe');

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });

    it('should call http.delete with the right url', () => {
      let session = { id: 6, voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false));

      service.deleteVoter(3, session as ISessions, 'joe');

      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
    });
  });

  describe('addVoter', () => {
    it('should call http.post with the right url', () => {
      let session = { id: 6, voters: ['john']};
      mockHttp.post.and.returnValue(of(false));
      const url = '/api/events/3/sessions/6/voters/joe';

      service.addVoter(3, session as ISessions, 'joe');

      expect(mockHttp.post).toHaveBeenCalledWith(url, {}, jasmine.any(Object));
    });
  });
});
