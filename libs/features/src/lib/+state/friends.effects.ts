import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as FriendsActions from './friends.actions';
import * as FriendsFeature from './friends.reducer';

@Injectable()
export class FriendsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsActions.initFriends),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FriendsActions.loadFriendsSuccess({ friends: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return FriendsActions.loadFriendsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
