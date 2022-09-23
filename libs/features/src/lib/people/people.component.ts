import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { addFriendList } from '../+state/friends.actions';
import { FriendsEntity } from '../+state/friends.models';
import { FriendsState } from '../+state/friends.reducer';
import { getAllFriends } from '../+state/friends.selectors';

@Component({
  selector: 'friends-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit {
  @Input() isloading = false;

  public selectedPersonId: string | number | null | undefined;
  public peopleData$: Observable<FriendsEntity[]> = new BehaviorSubject<
    FriendsEntity[]
  >([]);

  constructor(private store: Store<FriendsState>) {}

  ngOnInit(): void {
    this.peopleData$ = this.store.select(getAllFriends);
  }

  selectPerson(id: string | number | null | undefined) {
    this.selectedPersonId = id;
    console.log('selected:::', id);
  }

  updateFriend(friend: FriendsEntity) {
    this.store.dispatch(addFriendList({ friend }));
  }
}
