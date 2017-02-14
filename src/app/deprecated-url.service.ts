import { Injectable } from '@angular/core';
import { CanActivate }  from '@angular/router';
import { Router } from '@angular/router';

const ROOT_URL = '/';

@Injectable()
export class DeprecatedUrlService implements CanActivate {

  private detectorList: Array<any> = [];

  constructor(private router: Router) {
    this.detectorList.push(new DeprecatedUrlDetector());
    this.detectorList.push(new SlashUrlDetector());
  }

  public canActivate(): boolean {

    const routerUrl = this.router['location'].path(true) || ROOT_URL;
    // const routerUrl = window.location.pathname + window.location.hash;
    const ruleSize = this.detectorList.length;

    for (let step = 0; step < ruleSize; step += 1) {

      const detectorResult = this.detectorList[step].process(routerUrl);

      if (detectorResult !== ROOT_URL) {
        // this.router.navigateByUrl(detectorResult, {replaceUrl: true});
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
      'mountain',
    ];

    for (let ruleIndex = 0; ruleIndex < oldUrlType.length; ruleIndex += 1) {

      const chartType = oldUrlType[ruleIndex];
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
