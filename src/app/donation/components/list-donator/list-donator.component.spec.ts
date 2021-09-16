import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDonatorComponent } from './list-donator.component';

describe('ListDonatorComponent', () => {
  let component: ListDonatorComponent;
  let fixture: ComponentFixture<ListDonatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDonatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
