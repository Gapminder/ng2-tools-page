import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
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

import { DeprecatedUrlGuard } from './core/deprecated-url.service';
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { GoogleEffects } from './core/store/google/google.effects';
import { InitEffects } from './core/store/init.effects';
import { LanguageEffects } from './core/store/language/language.effects';
import { ToolsEffects } from './core/store/tools/tools.effects';
import { UserInteractionEffects } from './core/store/user-interaction/user-interaction.effects';

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
    { path: '', component: PageComponent, canActivate: [DeprecatedUrlGuard] },
    { path: 'for/:client', component: PageComponent },
    { path: '**', redirectTo: '/' }
  ])
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
    LanguageSwitcherComponent,
    PageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /* tslint:disable */
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
  }

  /* tslint:enable */
}
