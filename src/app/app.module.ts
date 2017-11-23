import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RelatedItemsComponent } from './related-items/related-items.component';
import { SeeAlsoComponent } from './see-also/see-also.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { SocialButtonsComponent } from './header/social-buttons/social-buttons.component';
import { ChartSwitcherComponent } from './header/chart-switcher/chart-switcher.component';
import { LanguageSwitcherComponent } from './header/language-switcher/language-switcher.component';
import { PageComponent } from './page/page.component';

import { DeprecatedUrlGuard } from './core/deprecated-url.service';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { GoogleEffects } from './core/store/google/google.effects';
import { InitEffects } from './core/store/init.effects';
import { LanguageEffects } from './core/store/language/language.effects';
import { ToolsEffects } from './core/store/tools/tools.effects';
import { UserInteractionEffects } from './core/store/user-interaction/user-interaction.effects';
import { ClientGuard } from './core/client.guard';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

const modules = [
  BrowserModule,
  HttpModule,
  CoreModule,
  StoreModule.forRoot(reducers()),
  EffectsModule.forRoot([
    InitEffects,
    GoogleEffects,
    LanguageEffects,
    ToolsEffects,
    UserInteractionEffects
  ]),
  Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  RouterModule.forRoot([
    {path: '', component: PageComponent, canActivate: [DeprecatedUrlGuard]},
    {path: 'for/:client', component: PageComponent, canActivate: [ClientGuard]},
    {path: '**', redirectTo: '/'}
  ]),
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    }
  })
];

@NgModule({
  imports: modules,
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
    ChartSwitcherComponent,
    LanguageSwitcherComponent,
    PageComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent]
})
export class AppModule {
  /* tslint:disable */
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
  }

  /* tslint:enable */
}
