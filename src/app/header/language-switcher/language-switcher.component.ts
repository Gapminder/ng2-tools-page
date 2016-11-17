import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-language-switcher',
  templateUrl: 'language-switcher.component.html',
  styleUrls: ['language-switcher.component.styl']
})
export class LanguageSwitcherComponent implements OnInit {

  Language = null;
  LanguageList = [];

  isSwitcherOpened = false;
  lgServiceEmitter: any;

  constructor (private lgService: LanguageSwitcherService) {
    this.lgServiceEmitter = this.lgService.getLanguageChangeEmitter()
      .subscribe(langItem => this.Language = langItem);
  }

  ngOnInit() {
    this.LanguageList = this.lgService.getList();
    this.Language = this.lgService.getLanguage();
  }

  ngOnDestroy() {
    this.lgServiceEmitter.unsubscribe();
  }

  public changeLanguage(languageItem) {

    this.lgService.setLanguage(languageItem);
    this.Language = this.lgService.getLanguage();

    this.isSwitcherOpened = false;

    /*
    var chartType = getChartType();
    var urlVizabiModel = getModelFromUrl($location.hash());
    var langModel = {language: {id: $scope.language.key}};
    var updatedModel = {};

    Vizabi.utils.deepExtend(updatedModel, $scope.vizabiModel[chartType], urlVizabiModel, langModel);
    $scope.vizabiInstances[chartType].instance.setModel(updatedModel);
    */
  }
}
