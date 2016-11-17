import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { Router }  from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.styl']
})
export class SocialButtonsComponent implements OnInit {

  http: Http;
  location: Location;
  router: Router;

  constructor(http: Http, location: Location, router: Router) {
    this.http = http;
    this.location = location;
    this.router = router;
  }

  ngOnInit() {
  }

  public getEmbeddedUrl() {

    //const pathBase = this.location['_platformStrategy']['_platformLocation']['_location']['origin'];
    const pathBase = window.location.href;

    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);

    urlTree.queryParams = urlTree.queryParams || {};
    urlTree.queryParams['embedded'] = 'true';

    const externalLink = pathBase + this.router.serializeUrl(urlTree);
    prompt('Copy link:', externalLink);
  }

  public shareLink() {

    const bitlyUrl = 'https://api-ssl.bitly.com/v3/shorten';
    const baseDomain = document.URL;
    //const baseDomain = 'http://gapminderdev.org/tools/';

    const params = {
      access_token: 'c5c5bdef4905a307a3a64664b1d06add09c48eb8',
      longUrl: encodeURIComponent(baseDomain)
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

  private getQueryByParams(base, obj) {

    const parts = [];
    const baseParts = [base, '?'];

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(key + "=" + obj[key]);
      }
    }

    baseParts.push(parts.join("&"));
    return baseParts.join("");
  }

}
