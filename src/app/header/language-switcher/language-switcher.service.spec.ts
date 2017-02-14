/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageSwitcherService } from './language-switcher.service';
import { RouterTestingModule } from '@angular/router/testing';
import { VizabiModule } from 'ng2-vizabi';

describe('Service: LanguageSwitcher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, VizabiModule],
      providers: [LanguageSwitcherService]
    });
  });

  it('should ...', inject([LanguageSwitcherService], (service: LanguageSwitcherService) => {
    expect(service).toBeTruthy();
  }));
});
