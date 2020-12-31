import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeContainerCardComponent } from './joke-container-card.component';

describe('JokeContainerCardComponent', () => {
  let component: JokeContainerCardComponent;
  let fixture: ComponentFixture<JokeContainerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeContainerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeContainerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
