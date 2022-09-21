import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscriber, Subscription } from 'rxjs';
import { FriendsEntity } from '../+state/friends.models';
import { FriendsState } from '../+state/friends.reducer';
import { getAllFriends } from '../+state/friends.selectors';

// https://blog.angular-university.io/angular-material-data-table/
@Component({
  selector: 'friends-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['name', 'dob', 'weight', 'friends'];

  public dataSource = new MatTableDataSource<FriendsEntity>();

  private subscription: Subscription = new Subscription();
  private peopleData$: Observable<FriendsEntity[]> = new BehaviorSubject<
    FriendsEntity[]
  >([]);

  constructor(private store: Store<FriendsState>) {}

  ngOnInit(): void {
    this.peopleData$ = this.store.select(getAllFriends);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.subscription.add(
      this.peopleData$.subscribe((friends: FriendsEntity[]) => {
        this.dataSource.data = friends;
        console.log('friends::::', friends);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
