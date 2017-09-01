import { NgModule } from '@angular/core';
import { LanguageService } from './language.service';
import { FlashDetectService } from './flash-detect.service';
import { DeprecatedUrlGuard } from './deprecated-url.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import { VizabiDirective, VizabiModule } from 'ng2-vizabi';
import { BitlyService } from './bitly.service';
import { LocationService } from './location.service';
import { VizabiToolsService } from './vizabi-tools-service';
import { ClientGuard } from './client.guard';

@NgModule({
  imports: [VizabiModule],
  exports: [
    VizabiDirective
  ],
  providers: [
    LanguageService,
    FlashDetectService,
    DeprecatedUrlGuard,
    GoogleAnalyticsService,
    BitlyService,
    LocationService,
    VizabiToolsService,
    ClientGuard
  ],
})
export class CoreModule {
}
