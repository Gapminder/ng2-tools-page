import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import { SeeAlsoComponent } from './see-also.component';

let fixture;
let instance;

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, CoreModule],
      declarations: [SeeAlsoComponent]
    });

    fixture = TestBed.createComponent(SeeAlsoComponent);
    instance = fixture.componentInstance;
  });

  it('should exist', () => {
    expect(instance).toBeDefined();
  })
});
