import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FriendsEntity } from '../+state/friends.models';
import { FriendsState } from '../+state/friends.reducer';
import { getAllFriends } from '../+state/friends.selectors';

// https://blog.angular-university.io/angular-material-data-table/
@Component({
  selector: 'friends-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() isloading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['name', 'dob', 'weight', 'friends'];

  public dataSource = new MatTableDataSource<FriendsEntity>();

  private subscription: Subscription = new Subscription();
  private peopleData$: Observable<FriendsEntity[]> = new BehaviorSubject<
    FriendsEntity[]
  >([]);

  constructor(
    private store: Store<FriendsState>,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.peopleData$ = this.store.select(getAllFriends);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  selectPerson(id: string | number | null | undefined) {
    console.log('selected:::', id);
  }
}
