import { Component, ViewEncapsulation } from '@angular/core';

//import { RelatedItemsComponent } from './related-items/related-items.component.ts';
//import { SeeAlsoComponent } from './see-also/see-also.component.ts';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']

})
export class AppComponent {
  // relatedItems = RelatedItemsComponent;
  // seeAlso = SeeAlsoComponent;
}
