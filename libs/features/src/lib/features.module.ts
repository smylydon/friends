import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleComponent } from './people/people.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFriends from './+state/friends.reducer';
import { FriendsEffects } from './+state/friends.effects';
import { FeaturesRoutingModule } from './features.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    StoreModule.forFeature(
      fromFriends.FRIENDS_FEATURE_KEY,
      fromFriends.friendsReducer
    ),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  declarations: [PeopleComponent, StatisticsComponent],
})
export class FeaturesModule {}
