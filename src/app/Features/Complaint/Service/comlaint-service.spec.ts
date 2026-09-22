import { TestBed } from '@angular/core/testing';
import { ComplaintService } from './comlaint-service';

describe('ComlaintService', () => {
  let service: ComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
