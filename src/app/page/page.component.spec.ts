/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MenuComponent } from '../header/menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { SocialButtonsComponent } from '../header/social-buttons/social-buttons.component';
import { ReportProblemComponent } from '../report-problem/report-problem.component';
import { SeeAlsoComponent } from '../see-also/see-also.component';
import { RelatedItemsComponent } from '../related-items/related-items.component';
import { FooterComponent } from '../footer/footer.component';
import { ToolService } from '../tool.service';
import { PageComponent } from './page.component';
import { LanguageSwitcherComponent } from '../header/language-switcher/language-switcher.component';


describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       PageComponent,
  //       MenuComponent,
  //       HeaderComponent,
  //       HomeComponent,
  //       SocialButtonsComponent,
  //       ReportProblemComponent,
  //       SeeAlsoComponent,
  //       RelatedItemsComponent,
  //       FooterComponent,
  //       LanguageSwitcherComponent
  //     ],
  //     schemas: [CUSTOM_ELEMENTS_SCHEMA]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
