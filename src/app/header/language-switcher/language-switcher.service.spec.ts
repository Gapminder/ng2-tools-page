/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageSwitcherService } from './language-switcher.service';

describe('Service: LanguageSwitcher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageSwitcherService]
    });
  });

  it('should ...', inject([LanguageSwitcherService], (service: LanguageSwitcherService) => {
    expect(service).toBeTruthy();
  }));
});
