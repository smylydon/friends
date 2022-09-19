import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FRIENDS_FEATURE_KEY,
  FriendsState,
  friendsAdapter,
} from './friends.reducer';

// Lookup the 'Friends' feature state managed by NgRx
export const getFriendsState =
  createFeatureSelector<FriendsState>(FRIENDS_FEATURE_KEY);

const { selectAll, selectEntities } = friendsAdapter.getSelectors();

export const getFriendsLoaded = createSelector(
  getFriendsState,
  (state: FriendsState) => state.loaded
);

export const getFriendsError = createSelector(
  getFriendsState,
  (state: FriendsState) => state.error
);

export const getAllFriends = createSelector(
  getFriendsState,
  (state: FriendsState) => selectAll(state)
);

export const getFriendsEntities = createSelector(
  getFriendsState,
  (state: FriendsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFriendsState,
  (state: FriendsState) => state.selectedId
);

export const getSelected = createSelector(
  getFriendsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
