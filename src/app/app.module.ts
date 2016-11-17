import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: '**', component: HomeComponent }
    ])
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
    LanguageSwitcherComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
