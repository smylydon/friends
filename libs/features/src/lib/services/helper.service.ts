import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FriendsEntity } from '../+state/friends.models';
import { getFriendsLoaded } from '../+state/friends.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public isloading$: Observable<boolean>;

  constructor(private store: Store<FriendsEntity[]>) {
    this.isloading$ = this.store
      .select(getFriendsLoaded)
      .pipe(map((value) => !value));
  }
}
