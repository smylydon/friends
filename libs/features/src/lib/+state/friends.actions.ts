import { createAction, props } from '@ngrx/store';
import { FriendsEntity } from './friends.models';

export enum FriendsActionTypes {
  INIT = '[Friends/API] Init',
  ADD_FRIEND = '[Friends/API] Add Friends Success',
  DELETE_FRIEND = '[Friends/API] Delete Friends Success',
  ADD_FRIENDS_LIST = '[Friends/API] Add Friends List Success',
  LOAD_FRIENDS = '[Friends/API] Load Friends',
  LOAD_FRIENDS_SUCCESS = '[Friends/API] Load Friends Success',
  LOAD_FRIENDS_SUCCESS_FAILURE = '[Friends/API] Load Friends Failure',
  SAVE_FRIENDS = '[Friends/API] Save Friends',
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

export const addFriendList = createAction(
  FriendsActionTypes.ADD_FRIENDS_LIST,
  props<{ friend: FriendsEntity }>()
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
  props<{ error: Error }>()
);

export const saveFriends = createAction(
  FriendsActionTypes.SAVE_FRIENDS,
  props<{ friends: FriendsEntity[] }>()
);

export const saveFriendsSuccess = createAction(
  FriendsActionTypes.SAVE_FRIENDS_SUCCESS,
  props<{ friends: FriendsEntity[] }>()
);

export const saveFriendsFailure = createAction(
  FriendsActionTypes.SAVE_FRIENDS_SUCCESS_FAILURE,
  props<{ error: Error }>()
);
