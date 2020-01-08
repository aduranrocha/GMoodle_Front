import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAComponent } from './home-a.component';

describe('HomeAComponent', () => {
  let component: HomeAComponent;
  let fixture: ComponentFixture<HomeAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
