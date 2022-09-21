import { createAction, props } from '@ngrx/store';
import { FriendsEntity } from './friends.models';

export enum friendsActions {
  INIT = '[Friends Page] Init',
  ADD_FRIEND = '[Friends/API] Add Friends Success',
  DELETE_FRIEND = '[Friends/API] Delete Friends Success',
  LOAD_FRIENDS_SUCCESS = '[Friends/API] Load Friends Success',
  LOAD_FRIENDS_SUCCESS_FAILURE = '[Friends/API] Load Friends Failure',
  SAVE_FRIENDS_SUCCESS = '[Friends/API] Save Friends Success',
  SAVE_FRIENDS_SUCCESS_FAILURE = '[Friends/API] Save Friends Failure',
}

export const initFriends = createAction(friendsActions.INIT);

export const addFriend = createAction(
  friendsActions.ADD_FRIEND,
  props<{ friend: FriendsEntity }>()
);

export const deleteFriend = createAction(
  friendsActions.DELETE_FRIEND,
  props<{ friends: FriendsEntity }>()
);

export const loadFriendsSuccess = createAction(
  friendsActions.LOAD_FRIENDS_SUCCESS,
  props<{ friends: FriendsEntity[] }>()
);

export const loadFriendsFailure = createAction(
  friendsActions.LOAD_FRIENDS_SUCCESS_FAILURE,
  props<{ error: any }>()
);

export const saveFriendsSuccess = createAction(
  friendsActions.SAVE_FRIENDS_SUCCESS,
  props<{ friends: FriendsEntity[] }>()
);

export const saveFriendsFailure = createAction(
  friendsActions.SAVE_FRIENDS_SUCCESS_FAILURE,
  props<{ error: any }>()
);
