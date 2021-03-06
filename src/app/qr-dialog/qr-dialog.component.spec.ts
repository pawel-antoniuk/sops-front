import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDialogComponent } from './qr-dialog.component';

describe('QrDialogComponent', () => {
  let component: QrDialogComponent;
  let fixture: ComponentFixture<QrDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
