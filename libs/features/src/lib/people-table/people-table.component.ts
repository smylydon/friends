import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FriendsEntity } from '../+state/friends.models';

// https://blog.angular-university.io/angular-material-data-table/
@Component({
  selector: 'friends-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleTableComponent implements AfterViewInit {
  @Input('data') set setData(data: FriendsEntity[] | null) {
    this._data = data ?? [];
    if (this.afterInitViewDone) {
      this.populateData();
    }
  }
  @Input('selectedPersonId') set setselectedPersonId(
    selectedPersonId: string | number | null | undefined
  ) {
    this._selectedPersonId = selectedPersonId;
    if (this.afterInitViewDone) {
      this.populateData();
    }
  }
  @Output() friendsList = new EventEmitter<FriendsEntity>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['name', 'dob', 'weight', 'friends'];

  public dataSource = new MatTableDataSource<FriendsEntity>();
  public currentPerson: FriendsEntity | undefined;
  public selectedFriends: Set<string> = new Set();

  private _data: FriendsEntity[] = [];
  private _selectedPersonId: string | number | null | undefined;

  private afterInitViewDone = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.afterInitViewDone = true;
    this.populateData();
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

  selectFriend(friend: FriendsEntity) {
    if (this.currentPerson) {
      const friends = new Set(this.currentPerson.friends ?? []);
      const id: string = friend.id as string;
      if (friends.has(id)) {
        friends.delete(id);
      } else {
        friends.add(id);
      }

      this.friendsList.emit(
        Object.assign({}, this.currentPerson, { friends: Array.from(friends) })
      );
    }
  }

  private populateData() {
    const [data, person] = this.getCurrentPersonAndFilterData(
      this._data,
      this._selectedPersonId
    );
    this.dataSource.data = data;
    this.currentPerson = person;
    this.selectedFriends = new Set(person?.friends);
  }

  private getCurrentPersonAndFilterData(
    data: FriendsEntity[],
    id: number | string | null | undefined
  ): [FriendsEntity[], FriendsEntity | undefined] {
    const newData: FriendsEntity[] = this.filterData(data, id);
    const newPerson: FriendsEntity | undefined = (data || []).find(
      (friend: FriendsEntity) => friend.id === id
    );
    return [newData, newPerson];
  }

  private filterData(
    data: FriendsEntity[],
    id: number | string | null | undefined
  ): FriendsEntity[] {
    return !!id === true
      ? data.filter((friend: FriendsEntity) => friend.id !== id)
      : data;
  }
}
