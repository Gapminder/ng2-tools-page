import { Component, ViewEncapsulation } from '@angular/core';
import {
  getRelatedItemsOfSelectedTool, getSelectedTool, getToolItemsAsArray, isEmbeddedMode, isFlashAvailable, isRtl,
  State
} from '../core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SetLanguageChooserVisibility } from '../core/store/layout/layout.actions';
import { SelectTool } from '../core/store/tools/tools.actions';
import { TrackGaToolChangeEvent } from '../core/store/google/google.actions';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.styl', './page.component.rtl.styl']
})
export class PageComponent {
  selectedTool$: Observable<string>;
  isEmbeddedMode$: Observable<boolean>;
  isRtl$: Observable<boolean>;
  relatedItems$: Observable<any[]>;
  isFlashAvailable$: Observable<boolean>;
  tools$: Observable<any[]>;

  constructor(private store: Store<State>) {
    this.isRtl$ = store.select(isRtl);
    this.isEmbeddedMode$ = store.select(isEmbeddedMode);
    this.relatedItems$ = this.store.select(getRelatedItemsOfSelectedTool);
    this.isFlashAvailable$ = this.store.select(isFlashAvailable);
    this.tools$ = this.store.select(getToolItemsAsArray);
    this.selectedTool$ = this.store.select(getSelectedTool);
  }

  trackGaToolChangeEvent(transition: { fromTool: string, toTool: string }) {
    this.store.dispatch(new TrackGaToolChangeEvent(transition.fromTool, transition.toTool));
  }

  selectTool(selectedTool: string) {
    this.store.dispatch(new SelectTool(selectedTool));
  }

  baseElementClickHandler($event): void {
    const element = $event.target;

    const elemLangMobile = document.getElementsByClassName('lang-wrapper mobile')[0];
    const elemLangMobileVisible = elemLangMobile && window.getComputedStyle(elemLangMobile).display !== 'none';

    const elemLangDesktop = document.getElementsByClassName('lang-wrapper desktop')[0];
    const elemLangActive = elemLangMobileVisible ? elemLangMobile : elemLangDesktop;

    if (!elemLangActive.contains(element)) {
      this.store.dispatch(new SetLanguageChooserVisibility(false));
    }
  };
}
