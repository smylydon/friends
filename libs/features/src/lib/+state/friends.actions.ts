import { createAction, props } from '@ngrx/store';
import { FriendsEntity } from './friends.models';

export enum FriendsActionTypes {
  INIT = '[Friends Page] Init',
  ADD_FRIEND = '[Friends/API] Add Friends Success',
  DELETE_FRIEND = '[Friends/API] Delete Friends Success',
  LOAD_FRIENDS = '[Friends Page] Loan Friends',
  LOAD_FRIENDS_SUCCESS = '[Friends/API] Load Friends Success',
  LOAD_FRIENDS_SUCCESS_FAILURE = '[Friends/API] Load Friends Failure',
  SAVE_FRIENDS = '[Friends Page] Save Friends',
  SAVE_FRIENDS_SUCCESS = '[Friends/API] Save Friends Success',
  SAVE_FRIENDS_SUCCESS_FAILURE = '[Friends/API] Save Friends Failure',
}

export const initFriends = createAction(FriendsActionTypes.INIT);

export const addFriend = createAction(
  FriendsActionTypes.ADD_FRIEND,
  props<{ friend: FriendsEntity }>()
);

export const deleteFriend = createAction(
  FriendsActionTypes.DELETE_FRIEND,
  props<{ friends: FriendsEntity }>()
);

// INIT and LOAD_FRIENDS do the same thing but IRL they would differ
// reason being INIT would probably do other house keeping stuff.
export const loadFriends = createAction(FriendsActionTypes.LOAD_FRIENDS);

export const loadFriendsSuccess = createAction(
  FriendsActionTypes.LOAD_FRIENDS_SUCCESS,
  props<{ friends: FriendsEntity[] }>()
);

export const loadFriendsFailure = createAction(
  FriendsActionTypes.LOAD_FRIENDS_SUCCESS_FAILURE,
  props<{ error: any }>()
);

export const saveFriends = createAction(FriendsActionTypes.SAVE_FRIENDS);

export const saveFriendsSuccess = createAction(
  FriendsActionTypes.SAVE_FRIENDS_SUCCESS,
  props<{ friends: FriendsEntity[] }>()
);

export const saveFriendsFailure = createAction(
  FriendsActionTypes.SAVE_FRIENDS_SUCCESS_FAILURE,
  props<{ error: any }>()
);
