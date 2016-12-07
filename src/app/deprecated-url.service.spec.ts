/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeprecatedUrlService } from './deprecated-url.service';

describe('Service: DeprecatedUrl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeprecatedUrlService]
    });
  });

  it('should ...', inject([DeprecatedUrlService], (service: DeprecatedUrlService) => {
    expect(service).toBeTruthy();
  }));
});
