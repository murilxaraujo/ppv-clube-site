import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaoseuComponent } from './pecaoseu.component';

describe('PecaoseuComponent', () => {
  let component: PecaoseuComponent;
  let fixture: ComponentFixture<PecaoseuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecaoseuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecaoseuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
