import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
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
export class PeopleComponent implements OnInit {
  @Input() isloading = false;
  public tabIndex = 0;

  public selectedPersonId: string | number | null | undefined;
  public peopleData$: Observable<FriendsEntity[]> = new BehaviorSubject<
    FriendsEntity[]
  >([]);

  constructor(
    private store: Store<FriendsState>,
    public helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.peopleData$ = this.store.select(getAllFriends);
  }

  selectPerson(id: string | number | null | undefined) {
    this.selectedPersonId = id;
  }

  updateFriend(friend: FriendsEntity) {
    this.store.dispatch(addFriendList({ friend }));
  }

  selectedTabValue(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
