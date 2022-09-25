import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFriends from './+state/friends.reducer';
import { FriendsEffects } from './+state/friends.effects';

import { FeaturesRoutingModule } from './features.routing.module';

import { AgeDonutComponent } from './age-donut/age-donut.component';
import { BusyComponent } from './busy/busy.component';
import { CustomMaterialFormsMatcher } from './services/custom-material-forms-matcher';
import { ErrorStateMatcher } from '@angular/material/core';
import { LayoutComponent } from './layout/layout.component';
import { PeopleComponent } from './people/people.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { PersonComponent } from './person/person.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WeightHistogramComponent } from './weight-histogram/weight-histogram.component';

import { FriendsService } from './services/friends.service';
import { HelperService } from './services/helper.service';

import { TimeSincePipe } from './pipes/time-since.pipe';
import { TotalFriendsPipe } from './pipes/total-friends.pipe';

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
    AgeDonutComponent,
    BusyComponent,
    LayoutComponent,
    PeopleComponent,
    PeopleTableComponent,
    PersonComponent,
    StatisticsComponent,
    TimeSincePipe,
    TotalFriendsPipe,
    WeightHistogramComponent,
  ],
  providers: [
    FriendsService,
    HelperService,
    {
      provide: ErrorStateMatcher,
      useClass: CustomMaterialFormsMatcher,
    },
  ],
})
export class FeaturesModule {}
