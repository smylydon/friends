import { Injectable } from '@angular/core';

import { FriendsEntity } from '../+state/friends.models';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const DELAY_TIME = 500;

/*
 * To save time I borrowed and adapted this service from an old project.
 * IRL this would be a http service that would call a backend.
 * Also missing from this login/logout along with interceptors etc.
 */
@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  public readonly AUTOSAVE_INTERVAL = 10 * 60 * 1000; // 10 minutes
  constructor() {}

  private loadFriends(): Observable<FriendsEntity[]> {
    let items = JSON.parse(localStorage.getItem('friends-list') || '');
    if (!Array.isArray(items)) {
      items = [];
    }
    return of(items as FriendsEntity[]).pipe(delay(DELAY_TIME));
  }

  private saveFriends(items: FriendsEntity[]) {
    return of(localStorage.setItem('friends-list', JSON.stringify(items))).pipe(
      delay(DELAY_TIME)
    );
  }
}
