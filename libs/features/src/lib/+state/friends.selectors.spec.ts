import { FriendsEntity } from './friends.models';
import {
  friendsAdapter,
  FriendsPartialState,
  initialFriendsState,
} from './friends.reducer';
import * as FriendsSelectors from './friends.selectors';

describe('Friends Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFriendsId = (it: FriendsEntity) => it.id;
  const createFriendsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FriendsEntity);

  let state: FriendsPartialState;

  beforeEach(() => {
    state = {
      friends: friendsAdapter.setAll(
        [
          createFriendsEntity('PRODUCT-AAA'),
          createFriendsEntity('PRODUCT-BBB'),
          createFriendsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialFriendsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Friends Selectors', () => {
    it('getAllFriends() should return the list of Friends', () => {
      const results = FriendsSelectors.getAllFriends(state);
      const selId = getFriendsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FriendsSelectors.getSelected(state) as FriendsEntity;
      const selId = getFriendsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getFriendsLoaded() should return the current "loaded" status', () => {
      const result = FriendsSelectors.getFriendsLoaded(state);

      expect(result).toBe(true);
    });

    it('getFriendsError() should return the current "error" state', () => {
      const result = FriendsSelectors.getFriendsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
