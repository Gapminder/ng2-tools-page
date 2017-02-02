import './viz';

import './polyfills.ts';
import 'ng2-vizabi';
import 'zone.js/dist/zone';

// JiT
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);

// Aot
// import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../dist/aot/app/app.module.ngfactory';
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
