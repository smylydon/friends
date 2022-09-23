import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FriendsService } from '../services/friends.service';

import * as FriendsActions from './friends.actions';
import { FriendsEntity } from './friends.models';
import * as FriendsFeature from './friends.reducer';

@Injectable()
export class FriendsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsActions.initFriends),
      mergeMap(() => {
        return this.friendsService.loadFriends().pipe(
          map((response: FriendsEntity[]) => {
            return FriendsActions.loadFriendsSuccess({
              friends: response,
            });
          }),
          catchError((error: Error) => {
            return of(FriendsActions.loadFriendsFailure({ error }));
          })
        );
      })
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsActions.loadFriends),
      mergeMap(() => {
        return this.friendsService.loadFriends().pipe(
          map((response: FriendsEntity[]) => {
            return FriendsActions.loadFriendsSuccess({
              friends: response,
            });
          }),
          catchError((error: Error) => {
            return of(FriendsActions.loadFriendsFailure({ error }));
          })
        );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsActions.saveFriends),
      mergeMap(({ friends }) => {
        return this.friendsService.saveFriends(friends).pipe(
          map((response: boolean) => {
            return FriendsActions.loadFriends();
          }),
          catchError((error: Error) => {
            return of(FriendsActions.saveFriendsFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private friendsService: FriendsService
  ) {}
}
