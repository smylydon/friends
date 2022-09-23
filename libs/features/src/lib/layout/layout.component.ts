import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, merge, Subscription, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { initFriends, saveFriends } from '../+state/friends.actions';
import { getAllFriends } from '../+state/friends.selectors';
import { FriendsEntity } from '../+state/friends.models';
import { FriendsService } from '../services/friends.service';
import { FriendsState } from '../+state/friends.reducer';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'friends-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private startSave$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private store: Store<FriendsState>,
    private friendsService: FriendsService,
    public helperService: HelperService
  ) {}

  ngOnInit(): void {
    const stream$: Observable<FriendsEntity[]> =
      this.store.select(getAllFriends);

    // start auto save timer
    // IRL there would be an on/off switch for autosave.
    // or logic so that an auto save doesn't follow a save by the user.
    // lastly there is no idle detection service to log the system out.
    this.subscription.add(
      merge(
        interval(this.friendsService.AUTOSAVE_INTERVAL).pipe(
          tap(() => {
            console.log('attempt auto save');
          })
        ),
        this.startSave$.pipe(
          tap(() => {
            console.log('save button clicked');
          })
        )
      )
        .pipe(
          switchMap((x) => {
            return stream$.pipe(take(1));
          })
        )
        .subscribe((friends: FriendsEntity[]) => {
          console.log('dispatching  save.....', friends);
          this.store.dispatch(saveFriends({ friends }));
        })
    );

    this.store.dispatch(initFriends());
  }

  ngOnDestroy(): void {
    // kill auto save timer
    this.subscription.unsubscribe();
  }

  save() {
    this.startSave$.next(true);
  }
}
