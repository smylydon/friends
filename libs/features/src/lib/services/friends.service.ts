import { Injectable } from '@angular/core';

import { FriendsEntity } from '../+state/friends.models';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const DELAY_TIME = 1000 * 1; // a mock loading and saving delay

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

  public loadFriends(): Observable<FriendsEntity[]> {
    const data = localStorage.getItem('friends-list');
    let items = JSON.parse(data || '[]');
    if (!Array.isArray(items)) {
      items = [];
    }

    return of(items as FriendsEntity[]).pipe(delay(DELAY_TIME));
  }

  public saveFriends(items: FriendsEntity[]): Observable<boolean> {
    return of(localStorage.setItem('friends-list', JSON.stringify(items))).pipe(
      map(() => true),
      delay(DELAY_TIME)
    );
  }
}
