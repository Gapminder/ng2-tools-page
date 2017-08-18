import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { State } from './store/index';
import { Store } from '@ngrx/store';
import { ChangeClient } from './store/tools/tools.actions';
import { AVAILABLE_CLIENTS } from './store/tools/vizabi-configurations';

@Injectable()
export class ClientGuard implements CanActivate {
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const client = route.params.client;
    if (!AVAILABLE_CLIENTS.has(client)) {
      this.router.navigateByUrl('/tools');
      return false;
    }
    this.store.dispatch(new ChangeClient(client));
    return true;
  }

  constructor(private store: Store<State>, private router: Router) {
  }
}
