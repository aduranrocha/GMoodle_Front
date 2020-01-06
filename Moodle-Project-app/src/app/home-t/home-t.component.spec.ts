import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTComponent } from './home-t.component';

describe('HomeTComponent', () => {
  let component: HomeTComponent;
  let fixture: ComponentFixture<HomeTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
