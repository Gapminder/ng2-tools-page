import { Injectable } from '@angular/core';
import { CanActivate }  from '@angular/router';
import { Location } from '@angular/common';

const ROOT_URL = '/';

@Injectable()
export class DeprecatedUrlService implements CanActivate {

  private detectorList: any[] = [];
  private location: Location;

  public constructor(location: Location) {
    this.location = location;
    this.detectorList.push(new DeprecatedUrlDetector());
    this.detectorList.push(new SlashUrlDetector());
  }

  public canActivate(): boolean {
    const routerUrl = this.location.path(true) || ROOT_URL;
    const ruleSize = this.detectorList.length;

    for (let step = 0; step < ruleSize; step += 1) {

      const detectorResult = this.detectorList[step].process(routerUrl);

      if (detectorResult !== ROOT_URL) {
        window.location.href = detectorResult;
        return false;
      }
    }
    return true;
  }
}

interface UrlRuleDetectorInterface {
  process(url: string): string;
}

class DeprecatedUrlDetector implements UrlRuleDetectorInterface {

  public process(url: string): string {

    const oldUrlType = [
      'bubbles',
      'map',
      'mountain'
    ];

    for (const chartType of oldUrlType) {
      const oldUrl = '/' + chartType;

      if (url.indexOf(oldUrl) !== -1) {

        const chartTypeParam = 'chart-type=' + chartType;
        const baseHref = document.getElementsByTagName('base')[0].href;

        return baseHref + url.replace(oldUrl, '') + (url.indexOf('#') !== -1 ? '&' : '#_' ) + chartTypeParam;
      }
    }

    return ROOT_URL;
  }
}

class SlashUrlDetector implements UrlRuleDetectorInterface {

  public process(url: string): string {

    const path = window.location.pathname + window.location.hash;

    if (path.indexOf('_slash_') === -1) {
      return ROOT_URL;
    }

    return path.replace(/_slash_/g, '/');
  }
}
