import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageSwitcherService } from './header/language-switcher/language-switcher.service';
import { ToolService } from './tool.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  providers: [LanguageSwitcherService, ToolService]
})
export class AppComponent {
  // relatedItems = RelatedItemsComponent;
  // seeAlso = SeeAlsoComponent;
}
