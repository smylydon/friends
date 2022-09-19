import { Action } from '@ngrx/store';

import * as FriendsActions from './friends.actions';
import { FriendsEntity } from './friends.models';
import {
  FriendsState,
  initialFriendsState,
  friendsReducer,
} from './friends.reducer';

describe('Friends Reducer', () => {
  const createFriendsEntity = (id: string, name = ''): FriendsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Friends actions', () => {
    it('loadFriendsSuccess should return the list of known Friends', () => {
      const friends = [
        createFriendsEntity('PRODUCT-AAA'),
        createFriendsEntity('PRODUCT-zzz'),
      ];
      const action = FriendsActions.loadFriendsSuccess({ friends });

      const result: FriendsState = friendsReducer(initialFriendsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = friendsReducer(initialFriendsState, action);

      expect(result).toBe(initialFriendsState);
    });
  });
});
