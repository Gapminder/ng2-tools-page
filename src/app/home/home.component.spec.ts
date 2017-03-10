/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { LanguageSwitcherService } from '../header/language-switcher/language-switcher.service';
import { VizabiService, VizabiModule } from 'ng2-vizabi';
import { ToolService } from '../tool.service';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, VizabiModule, Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]) ],
      declarations: [ HomeComponent, TestComponent ],
      providers: [VizabiService, ToolService, LanguageSwitcherService, GoogleAnalyticsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    window.location.hash = '';
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.directive(HomeComponent)).componentInstance;
    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should properly handle Vizabi's onChanged event: preserve chart type`, () => {
    const changes = {type: 'BarRankChart'};
    component.onChanged(changes);

    expect(component.currentHashModel).toEqual({'chart-type': 'barrank'});
    expect(window.location.hash).toEqual('#_chart-type=barrank');
  });

  it(`should properly handle Vizabi's onChanged event: preserve locale`, () => {
    component.currentHashModel = {locale: {id: 'en'}};

    const changes = {type: 'BarRankChart'};
    component.onChanged(changes);

    expect(component.currentHashModel).toEqual({'chart-type': 'barrank', locale: {id: 'en'}});
    expect(window.location.hash).toEqual('#_locale_id=en;&chart-type=barrank');
  });

  it(`should properly handle Vizabi's onChanged event: if model wasn't changed - nothing is propagated`, () => {
    component.currentHashModel = {locale: {id: 'en'}};

    const changes = {type: 'BarRankChart', modelDiff: {locale: {id: 'en'}}};
    component.onChanged(changes);

    expect(component.currentHashModel).toEqual({locale: {id: 'en'}});
    expect(window.location.hash).toEqual('#_chart-type=bubbles');
  });
});

@Component({
  template: '<div class="wrapper"><app-home></app-home></div>'
})
class TestComponent {
}
