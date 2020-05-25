import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let mockRouter, mockAuthService, mockToastService;

  beforeEach(() => {
    component = new ProfileComponent(mockRouter, mockAuthService, mockToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
