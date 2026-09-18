import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeDetails } from './notice-details';

describe('NoticeDetails', () => {
  let component: NoticeDetails;
  let fixture: ComponentFixture<NoticeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
