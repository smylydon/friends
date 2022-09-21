import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { saveFriends } from '../+state/friends.actions';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'friends-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(private store: Store, private friendsService: FriendsService) {}

  ngOnInit(): void {
    // start auto save timer
    // IRL there would be an on/off switch for autosave.
    // or logic so that an auto save doesn't follow a save by the user.
    this.subscription.add(
      interval(this.friendsService.AUTOSAVE_INTERVAL).subscribe(() => {
        console.log('dispatching auto save.....');
        this.store.dispatch(saveFriends());
      })
    );
  }

  ngOnDestroy(): void {
    // kill auto save timer
    this.subscription.unsubscribe();
  }
}
