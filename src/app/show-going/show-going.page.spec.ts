import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGoingPage } from './show-going.page';

describe('ShowGoingPage', () => {
  let component: ShowGoingPage;
  let fixture: ComponentFixture<ShowGoingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGoingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGoingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
