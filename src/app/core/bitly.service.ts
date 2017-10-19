import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const RESPONSE_OK = 200;

@Injectable()
export class BitlyService {
  private bitlyUrl = 'https://api-ssl.bitly.com/v3/shorten';
  private cache: {} = {};

  constructor(private http: Http) {
  }

  shortenUrl(url: string = document.URL): Observable<string> {
    if (!url.includes('gapminder')) {
      return Observable.of(url);
    }

    const serviceUrl = `${this.bitlyUrl}?access_token=${'c5c5bdef4905a307a3a64664b1d06add09c48eb8'}&longUrl=${encodeURIComponent(url)}`;

    if (this.cache[serviceUrl]) {
      return Observable.of(this.cache[serviceUrl]);
    }

    return this.http.get(serviceUrl).map(response => {
      const bitlyResponse = response.json();

      let result: any = window.location;

      if (bitlyResponse.status_code === RESPONSE_OK) {
        this.cache[serviceUrl] = bitlyResponse.data.url;
        result = this.cache[serviceUrl];
      }

      return result;
    });
  }
}
