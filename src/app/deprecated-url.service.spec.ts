/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeprecatedUrlService } from './deprecated-url.service';

describe('Service: DeprecatedUrl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [DeprecatedUrlService]
    });
  });

  it('should ...', inject([DeprecatedUrlService], (service: DeprecatedUrlService) => {
    expect(service).toBeTruthy();
  }));
});
