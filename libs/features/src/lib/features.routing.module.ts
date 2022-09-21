import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PersonComponent } from './person/person.component';
import { PeopleComponent } from './people/people.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PersonComponent,
      },
      { path: 'connect', redirectTo: 'connect-friends' },
      { path: 'connect-friends', component: PeopleComponent },
      { path: 'stats', redirectTo: 'statistics' },
      { path: 'statistics', component: StatisticsComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
