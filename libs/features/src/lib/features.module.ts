import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { PeopleComponent } from './people/people.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFriends from './+state/friends.reducer';
import { FriendsEffects } from './+state/friends.effects';

export const featuresRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(
      fromFriends.FRIENDS_FEATURE_KEY,
      fromFriends.friendsReducer
    ),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  declarations: [PersonComponent, PeopleComponent, StatisticsComponent],
})
export class FeaturesModule {}
