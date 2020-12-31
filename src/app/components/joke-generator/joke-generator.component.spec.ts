import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeGeneratorComponent } from './joke-generator.component';

describe('JokeGeneratorialComponent', () => {
  let component: JokeGeneratorComponent;
  let fixture: ComponentFixture<JokeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
