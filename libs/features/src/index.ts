import * as FriendsActions from './lib/+state/friends.actions';

import * as FriendsFeature from './lib/+state/friends.reducer';

import * as FriendsSelectors from './lib/+state/friends.selectors';

export * from './lib/+state/friends.models';

export { FriendsActions, FriendsFeature, FriendsSelectors };
export * from './lib/features.module';
