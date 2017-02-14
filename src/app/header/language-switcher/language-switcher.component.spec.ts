/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { LanguageSwitcherComponent } from './language-switcher.component';

import { ToolService } from '../../tool.service';
import { VizabiModule } from 'ng2-vizabi';


import { LanguageSwitcherService } from './language-switcher.service';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        VizabiModule,
        RouterTestingModule
      ],
      declarations: [LanguageSwitcherComponent],
      providers: [LanguageSwitcherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
