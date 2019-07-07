import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFilterComponent } from './location-filter.component';

describe('LocationFilterComponent', () => {
  let component: LocationFilterComponent;
  let fixture: ComponentFixture<LocationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFilterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
