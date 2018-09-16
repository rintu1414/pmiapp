import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTabComponent } from './risk-tab.component';

describe('RiskTabComponent', () => {
  let component: RiskTabComponent;
  let fixture: ComponentFixture<RiskTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
