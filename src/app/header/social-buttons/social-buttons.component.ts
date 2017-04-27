import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Router }  from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import * as _ from "lodash";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.styl']
})
export class SocialButtonsComponent {

  constructor(private http: Http, private location: Location, private router: Router) {
  }

  public getEmbeddedUrl(): void {
    const iframeStart = '<iframe src="';
    const iframeEnd = '" style="width: 100%; height: 500px; margin: 0 0 0 0; border: 1px solid grey;"></iframe>';
    
    const pathBase = window.location.origin.replace(/http:|https:/,"");
    const pathBaseHref = this.location['_baseHref'];

    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);

    urlTree.queryParams = urlTree.queryParams || {};
    urlTree.queryParams['embedded'] = 'true';

    const externalLink = iframeStart + pathBase + pathBaseHref + this.router.serializeUrl(urlTree) + iframeEnd;
    prompt('Copy this fragment and paste it in your website or blog:\n(more instructions on vizabi.org/tutorials)', externalLink);
  }

  public shareLink(): void {

    const bitlyUrl = 'https://api-ssl.bitly.com/v3/shorten';
    const baseUrl = document.URL;

    if (!_.includes(baseUrl, 'gapminder')) {
      prompt('Copy the following link: ', baseUrl);
      return;
    }

    const params = {
      access_token: 'c5c5bdef4905a307a3a64664b1d06add09c48eb8',
      longUrl: encodeURIComponent(baseUrl)
    };

    const serviceUrl = this.getQueryByParams(bitlyUrl, params);
    this.http
      .get(serviceUrl)
      .subscribe(
        (resp) => {
          const response = resp.json();
          const link = response && response.status_code === 200 ? response.data.url : window.location;
          prompt('Copy the following link: ', link);
        }
      );
  }

  private getQueryByParams(base: string, params: any): string {

    const parts = [];
    const baseParts = [base, '?'];

    _.forOwn(params, (value: any, key: string) => parts.push(`${key}=${value}`));

    baseParts.push(parts.join("&"));
    return baseParts.join("");
  }
}
