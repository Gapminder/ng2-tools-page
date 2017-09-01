import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class LocationService {

  constructor(private router: Router, private location: Location) {
  }

  getUrlHash(hash: string = window.location.hash): string {
    const hashPosition = hash.indexOf('#');
    if (hashPosition === -1) {
      return '';
    }
    return hash.slice(hashPosition + 1);
  }

  getUrlReadyForEmbedding(): string {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = urlTree.queryParams || {};
    urlTree.queryParams.embedded = 'true';

    const protocolAgnosticOrigin = window.location.origin.replace(/http:|https:/, '');
    const pathWithQueryParamsAndHash = this.location.prepareExternalUrl(this.router.serializeUrl(urlTree));

    return protocolAgnosticOrigin + pathWithQueryParamsAndHash;
  }
}
