import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTComponent } from './header-t.component';

describe('HeaderTComponent', () => {
  let component: HeaderTComponent;
  let fixture: ComponentFixture<HeaderTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
