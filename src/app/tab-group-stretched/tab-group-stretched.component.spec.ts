import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGroupStretchedComponent } from './tab-group-stretched.component';

describe('TabGroupStretchedComponent', () => {
  let component: TabGroupStretchedComponent;
  let fixture: ComponentFixture<TabGroupStretchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabGroupStretchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGroupStretchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
