/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { VizabiModule } from 'ng2-vizabi';

import { MenuComponent } from '../header/menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { SocialButtonsComponent } from '../header/social-buttons/social-buttons.component';
import { ReportProblemComponent } from '../report-problem/report-problem.component';
import { SeeAlsoComponent } from '../see-also/see-also.component';
import { RelatedItemsComponent } from '../related-items/related-items.component';
import { FooterComponent } from '../footer/footer.component';
import { ToolService } from '../tool.service';
import { LanguageSwitcherComponent } from '../header/language-switcher/language-switcher.component';
import { LanguageSwitcherService } from '../header/language-switcher/language-switcher.service';

import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VizabiModule,
        HttpModule
      ],
      declarations: [
        HeaderComponent,
        MenuComponent,
        LanguageSwitcherComponent,
        SocialButtonsComponent
      ],
      providers: [LanguageSwitcherService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
