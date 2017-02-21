import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { VizabiModule } from 'ng2-vizabi';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RelatedItemsComponent } from './related-items/related-items.component';
import { SeeAlsoComponent } from './see-also/see-also.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { SocialButtonsComponent } from './header/social-buttons/social-buttons.component';
import { LanguageSwitcherComponent } from './header/language-switcher/language-switcher.component';
import { PageComponent } from './page/page.component';

import { DeprecatedUrlService } from './deprecated-url.service';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { GoogleAnalyticsService } from './google-analytics.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    VizabiModule,
    RouterModule.forRoot([
      { path: '', component: PageComponent, canActivate: [DeprecatedUrlService]},
      { path: '**', redirectTo: ''}
    ]),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    RelatedItemsComponent,
    SeeAlsoComponent,
    ReportProblemComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SocialButtonsComponent,
    LanguageSwitcherComponent,
    PageComponent
  ],
  providers: [DeprecatedUrlService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  /* tslint:disable */
  public constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
  /* tslint:enable */
}
