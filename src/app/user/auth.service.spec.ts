import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttpClient;

  beforeEach(() => {
    service = new AuthService(mockHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
