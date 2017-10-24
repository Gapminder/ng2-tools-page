import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BitlyService {
  private bitlyUrl = 'https://api-ssl.bitly.com/v3/shorten';

  constructor(private http: Http) {
  }

  shortenUrl(url: string = document.URL): Observable<string> {
    if (!url.includes('gapminder')) {
      return Observable.of(url);
    }

    const serviceUrl = `${this.bitlyUrl}?access_token=${'c5c5bdef4905a307a3a64664b1d06add09c48eb8'}&longUrl=${encodeURIComponent(url)}`;

    return this.http.get(serviceUrl).map(response => {
      const bitlyResponse = response.json();

      return bitlyResponse.status_code === 200 ? bitlyResponse.data.url : window.location;
    });
  }
}
