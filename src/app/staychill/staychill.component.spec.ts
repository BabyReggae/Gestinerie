import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaychillComponent } from './staychill.component';

describe('StaychillComponent', () => {
  let component: StaychillComponent;
  let fixture: ComponentFixture<StaychillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaychillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaychillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
