import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Language } from '../../core/store/language/language';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-language-switcher',
  templateUrl: 'language-switcher.component.html',
  styleUrls: ['language-switcher.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  @Input() allLanguages: ReadonlyArray<Language>;
  @Input() isLanguageSwitcherVisible: boolean;
  @Input() selectedLanguage: Language;

  @Output() changeLanguage: EventEmitter<Language> = new EventEmitter();
  @Output() hideLanguageChooser: EventEmitter<boolean> = new EventEmitter();
  @Output() switchLanguageChooser: EventEmitter<boolean> = new EventEmitter();

  selectLanguage(language: Language): void {
    this.changeLanguage.emit(language);
    this.hideLanguageChooser.emit();
  }
}
