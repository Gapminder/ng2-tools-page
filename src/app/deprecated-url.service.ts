import { Injectable } from '@angular/core';
import { CanActivate }  from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class DeprecatedUrlService implements CanActivate {

  oldUrlType = [
    '/tools/bubbles',
    '/tools/map',
    '/tools/mountain',
  ];

  router: Router;
  redirect = '/';

  constructor(router: Router) {
    this.router = router;
  }

  canActivate() {

    // check old urls
    if(this.processOldUrl()) {
      window.location.href = this.redirect;
      return false;
    }

    // check modified symbol hash urls
    if(this.processSlashSymbolUrl()) {
      window.location.href = this.redirect;
      return false;
    }

    return true;
  }

  private processOldUrl () {

    // http://localhost:4200/tools/bubbles#_state_marker_size_zoomedMin:15&zoomedMax:1400000000;;;
    // http://localhost:4200/tools/mountain#_state_entities_select@_geo=ind;;;&marker_group_manualSorting@=asia&=africa&=americas&=europe;;;;

    const path = window.location.pathname || '';

    for(let i = 0; i < this.oldUrlType.length; i++) {
      if(path.indexOf(this.oldUrlType[i]) !== -1) {

        const fullPath = window.location.toString();
        const chartType = this.oldUrlType[i].replace('/tools/', '');
        let fullPathFixed = fullPath.replace(this.oldUrlType[i], '/tools/');
        fullPathFixed += '&chart-type=' + chartType;

        this.redirect = fullPathFixed;
        return true;
      }
    }
    return false;
  }

  private processSlashSymbolUrl () {

    // http://localhost:4200/tools/bubbles#_state_marker_axis/_y_which=children/_per_slash__woman/_total/_fertility&domainMin:0.84&domainMax:9.22&zoomedMin:0.84&zoomedMax:9.22;&size_zoomedMin:15&zoomedMax:1400000000;;;

    const path = window.location.toString();

    if(path.indexOf('_slash_') !== -1) {
      const fullPathFixed = path.replace(/_slash_/g, '/');

      this.redirect = fullPathFixed;
      return true;
    }
    return false;
  }

}
