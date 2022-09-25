import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, Subject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { addFriendList } from '../+state/friends.actions';
import { FriendsEntity } from '../+state/friends.models';
import { FriendsState } from '../+state/friends.reducer';
import { getAllFriends } from '../+state/friends.selectors';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'friends-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit, OnDestroy {
  @Input() isloading = false;
  public tabIndex = 0;

  public selectedPersonId: string | number | null | undefined;

  public friendsData$: Observable<FriendsEntity[] | undefined | null> =
    new BehaviorSubject<FriendsEntity[] | null | undefined>([]);
  public peopleData$: Observable<FriendsEntity[]> = new BehaviorSubject<
    FriendsEntity[]
  >([]);

  private selectedPersonId$: Subject<string> = new Subject<string>();
  public friendsDataSubject$: BehaviorSubject<
    FriendsEntity[] | undefined | null
  > = new BehaviorSubject<FriendsEntity[] | null | undefined>([]);
  private subscription: Subscription = new Subscription();
  constructor(
    private store: Store<FriendsState>,
    public helperService: HelperService
  ) {
    this.friendsData$ = this.friendsDataSubject$.asObservable();
  }

  ngOnInit(): void {
    const peopleData$: Observable<FriendsEntity[]> =
      this.store.select(getAllFriends);
    this.peopleData$ = peopleData$;

    this.subscription.add(
      this.selectedPersonId$
        .pipe(
          switchMap((selectedPersonId: string) => {
            return peopleData$.pipe(
              map((people: FriendsEntity[] = []) => {
                const person: FriendsEntity | undefined = people.find(
                  (person: FriendsEntity) => person.id === selectedPersonId
                );
                const friends: string[] = person?.friends ?? [];
                return people.filter((person: FriendsEntity) => {
                  const id: string = person.id ? String(person.id) : ''; // need to fix linter overly picky
                  return friends.includes(id);
                });
              })
            );
          })
        )
        .subscribe(this.friendsDataSubject$)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectPerson(id: string | number | null | undefined) {
    this.selectedPersonId = id;
    this.selectedPersonId$.next(id as string);
  }

  updateFriend(friend: FriendsEntity) {
    this.store.dispatch(addFriendList({ friend }));
  }

  selectedTabValue(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
