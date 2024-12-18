import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewNoteComponent } from './preview-note.component';

describe('PreviewNoteComponent', () => {
  let component: PreviewNoteComponent;
  let fixture: ComponentFixture<PreviewNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
