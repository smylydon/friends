import { createAction, props } from '@ngrx/store';
import { FriendsEntity } from './friends.models';

export const initFriends = createAction('[Friends Page] Init');

export const loadFriendsSuccess = createAction(
  '[Friends/API] Load Friends Success',
  props<{ friends: FriendsEntity[] }>()
);

export const loadFriendsFailure = createAction(
  '[Friends/API] Load Friends Failure',
  props<{ error: any }>()
);
