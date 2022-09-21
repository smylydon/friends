import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, pipe, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { initFriends, saveFriends } from '../+state/friends.actions';
import { getAllFriends } from '../+state/friends.selectors';
import { FriendsEntity } from '../+state/friends.models';
import { FriendsService } from '../services/friends.service';
import { FriendsState } from '../+state/friends.reducer';

@Component({
  selector: 'friends-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private store: Store<FriendsState>,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    const stream$: Observable<FriendsEntity[]> =
      this.store.select(getAllFriends);
    // start auto save timer
    // IRL there would be an on/off switch for autosave.
    // or logic so that an auto save doesn't follow a save by the user.
    // lastly there is no idle detection service to log the system out.
    this.subscription.add(
      interval(this.friendsService.AUTOSAVE_INTERVAL)
        .pipe(
          switchMap((x) => {
            return stream$.pipe(take(1));
          })
        )
        .subscribe((friends: FriendsEntity[]) => {
          console.log('dispatching auto save.....', friends);
          this.store.dispatch(saveFriends({ friends }));
        })
    );

    this.store.dispatch(initFriends());
  }

  ngOnDestroy(): void {
    // kill auto save timer
    this.subscription.unsubscribe();
  }
}
