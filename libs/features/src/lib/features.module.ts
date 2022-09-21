import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFriends from './+state/friends.reducer';
import { FriendsEffects } from './+state/friends.effects';
import { FeaturesRoutingModule } from './features.routing.module';

import { PersonComponent } from './person/person.component';
import { PeopleComponent } from './people/people.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LayoutComponent } from './layout/layout.component';
import { TotalFriendsPipe } from './pipes/total-friends.pipe';
import { TimeSincePipe } from './pipes/time-since.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FeaturesRoutingModule,
    StoreModule.forFeature(
      fromFriends.FRIENDS_FEATURE_KEY,
      fromFriends.friendsReducer
    ),
    EffectsModule.forFeature([FriendsEffects]),
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    PersonComponent,
    PeopleComponent,
    StatisticsComponent,
    LayoutComponent,
    TotalFriendsPipe,
    TimeSincePipe,
  ],
})
export class FeaturesModule {}
