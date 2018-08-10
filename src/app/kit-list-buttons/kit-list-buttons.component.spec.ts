import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitListButtonsComponent } from './kit-list-buttons.component';

describe('KitListButtonsComponent', () => {
  let component: KitListButtonsComponent;
  let fixture: ComponentFixture<KitListButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitListButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitListButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
