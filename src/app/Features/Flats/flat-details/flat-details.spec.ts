import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatDetails } from './flat-details';

describe('FlatDetails', () => {
  let component: FlatDetails;
  let fixture: ComponentFixture<FlatDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
