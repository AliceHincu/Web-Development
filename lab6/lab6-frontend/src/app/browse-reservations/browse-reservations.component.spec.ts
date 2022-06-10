import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseReservationsComponent } from './browse-reservations.component';

describe('BrowseReservationsComponent', () => {
  let component: BrowseReservationsComponent;
  let fixture: ComponentFixture<BrowseReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
