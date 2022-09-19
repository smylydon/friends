import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FriendsActions from './friends.actions';
import { FriendsEntity } from './friends.models';

export const FRIENDS_FEATURE_KEY = 'friends';

export interface FriendsState extends EntityState<FriendsEntity> {
  selectedId?: string | number; // which Friends record has been selected
  loaded: boolean; // has the Friends list been loaded
  error?: string | null; // last known error (if any)
}

export interface FriendsPartialState {
  readonly [FRIENDS_FEATURE_KEY]: FriendsState;
}

export const friendsAdapter: EntityAdapter<FriendsEntity> =
  createEntityAdapter<FriendsEntity>();

export const initialFriendsState: FriendsState = friendsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const reducer = createReducer(
  initialFriendsState,
  on(FriendsActions.initFriends, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FriendsActions.loadFriendsSuccess, (state, { friends }) =>
    friendsAdapter.setAll(friends, { ...state, loaded: true })
  ),
  on(FriendsActions.loadFriendsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function friendsReducer(
  state: FriendsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
