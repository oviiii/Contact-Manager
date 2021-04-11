import { TestBed } from '@angular/core/testing';

import { ManageContactService } from './manage-contact.service';

describe('ManageContactService', () => {
  let service: ManageContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
