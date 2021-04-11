import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDiaryComponent } from './contact-diary.component';

describe('ContactDiaryComponent', () => {
  let component: ContactDiaryComponent;
  let fixture: ComponentFixture<ContactDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDiaryComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
