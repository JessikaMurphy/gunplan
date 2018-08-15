import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaintsComponent } from './my-paints.component';

describe('MyPaintsComponent', () => {
  let component: MyPaintsComponent;
  let fixture: ComponentFixture<MyPaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
