import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFlowComponent } from './panel-flow.component';

describe('PanelFlowComponent', () => {
  let component: PanelFlowComponent;
  let fixture: ComponentFixture<PanelFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
