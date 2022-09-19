import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FriendsActions from './friends.actions';
import { FriendsEffects } from './friends.effects';

describe('FriendsEffects', () => {
  let actions: Observable<Action>;
  let effects: FriendsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FriendsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FriendsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FriendsActions.initFriends() });

      const expected = hot('-a-|', {
        a: FriendsActions.loadFriendsSuccess({ friends: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
