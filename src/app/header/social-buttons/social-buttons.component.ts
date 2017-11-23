import {
  ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BitlyService } from '../../core/bitly.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialButtonsComponent {
  @Output() shareLink: EventEmitter<any> = new EventEmitter();
  @Output() getEmbeddedUrl: EventEmitter<any> = new EventEmitter();
  @ViewChild('mailLink') mailLink;

  constructor(private bitlyService: BitlyService) {
  }

  twitter() {
    this.openWindow(`https://twitter.com/intent/tweet?original_referer=#{url}&amp;related=Gapminder&amp;text=Gapminder&amp;tw_p=tweetbutton&amp;url=#{url}`);
  }

  facebook() {
    this.openWindow(`http://www.addtoany.com/add_to/facebook?linkurl=#{url}&amp;`);
  }

  mail() {
    this.setMainLink();
    this.mailLink.nativeElement.click();
  }

  setMainLink() {
    const mailUrl = encodeURIComponent(window.location.href);

    this.mailLink.nativeElement.href = `mailto:?subject=Gapminder&body=${mailUrl}`;
  }

  private openWindow(urlTemplate) {
    const half = 2;
    const windowWidth = 490;
    const left: number = (window.innerWidth - windowWidth) / half;
    const newWindow = window.open('', '_blank', `width=${windowWidth}, height=368, top=100, left=${left}`);

    this.bitlyService.shortenUrl().subscribe(url => {
      newWindow.location.href = urlTemplate.replace(/#{url}/g, url);
      newWindow.focus();
    });
  }
}
