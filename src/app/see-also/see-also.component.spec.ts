/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';
import { ToolService } from '../tool.service';

import { SeeAlsoComponent } from './see-also.component';

describe('SeeAlsoComponent', () => {
  let component: SeeAlsoComponent;
  let fixture: ComponentFixture<SeeAlsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ SeeAlsoComponent ],
      providers: [ ToolService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAlsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
