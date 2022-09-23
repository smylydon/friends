import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FriendsEntity } from '../+state/friends.models';

// https://blog.angular-university.io/angular-material-data-table/
@Component({
  selector: 'friends-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
})
export class PeopleTableComponent implements AfterViewInit {
  @Input('data') set setData(data: FriendsEntity[] | null) {
    this._data = data ?? [];
    if (this.afterInitViewDone) {
      this.dataSource.data = this.filterData(
        this._data,
        this._selectedPersonId
      );
    }
  }
  @Input('selectedPersonId') set setselectedPersonId(
    selectedPersonId: string | number | null | undefined
  ) {
    this._selectedPersonId = selectedPersonId;
    if (this.afterInitViewDone) {
      this.dataSource.data = this.filterData(
        this._data,
        this._selectedPersonId
      );
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['name', 'dob', 'weight', 'friends'];

  public dataSource = new MatTableDataSource<FriendsEntity>();

  private _data: FriendsEntity[] = [];
  private _selectedPersonId: string | number | null | undefined;

  private afterInitViewDone = false;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.afterInitViewDone = true;
    this.dataSource.data = this.filterData(this._data, this._selectedPersonId);
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

  private filterData(
    data: FriendsEntity[],
    id: number | string | null | undefined
  ): FriendsEntity[] {
    return !!id === true
      ? data.filter((friend: FriendsEntity) => friend.id !== id)
      : data;
  }
}
