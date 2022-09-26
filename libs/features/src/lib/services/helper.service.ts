import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FriendsEntity } from '../+state/friends.models';
import { getAllFriends, getFriendsLoaded } from '../+state/friends.selectors';

import { map, share, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { SimpleDataModel } from '../models/simple-data.model';
import { WeightModel } from '../models/weight.model';
import { TimeSincePipe } from '../pipes/time-since.pipe';
import { flatGroup } from 'd3';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public isloading$: Observable<boolean>;
  public friendsData$: Observable<FriendsEntity[] | undefined | null> =
    new BehaviorSubject<FriendsEntity[] | null | undefined>([]);

  private dataTemplate: SimpleDataModel[] = [
    { name: '18-29', value: '0' },
    { name: '30-39', value: '0' },
    { name: '40-49', value: '0' },
    { name: '50-59', value: '0' },
    { name: '60+', value: '0' },
  ];

  private selectedPersonId$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private timeSince: TimeSincePipe;

  constructor(private store: Store<FriendsEntity[]>) {
    this.timeSince = new TimeSincePipe();
    this.isloading$ = this.store
      .select(getFriendsLoaded)
      .pipe(map((value) => !value));
    this.setUpFriendsData();
  }

  setUpFriendsData(): void {
    const peopleData$: Observable<FriendsEntity[]> =
      this.store.select(getAllFriends);

    this.friendsData$ = this.selectedPersonId$.pipe(
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
      }),
      share({
        connector: () => new BehaviorSubject<FriendsEntity[]>([]),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      })
    );
  }

  updateSelectedPersonId(id: string): void {
    this.selectedPersonId$.next(id);
  }

  getBarData(friends: FriendsEntity[] | null | undefined): WeightModel[] {
    friends = friends ?? [];
    const first: Map<string, WeightModel>[] = friends
      .map((f: FriendsEntity) => Number(f.weight))
      .filter((weight: number) => !isNaN(weight) && Number.isFinite(weight))
      .reduce(
        (
          acc: Map<string, WeightModel>[],
          weight: number
        ): Map<string, WeightModel>[] => {
          const items: Map<string, WeightModel> = acc[0];
          const item: WeightModel = items.get(weight + '') ?? {
            weight,
            frequency: 0,
          };
          item.frequency += 1;
          items.set(weight + '', item);
          return <Map<string, WeightModel>[]>acc;
        },
        <Map<string, WeightModel>[]>[new Map()]
      );
    const second: Map<string, WeightModel> = <Map<string, WeightModel>>first[0];
    const third = Array.from(second.values())
      .filter((item: WeightModel) => {
        return item.frequency !== 0;
      })
      .sort((a: WeightModel, b: WeightModel) => a.weight - b.weight);

    return third;
  }

  getDonutData(friends: FriendsEntity[] | null | undefined): SimpleDataModel[] {
    const templateData: SimpleDataModel[] = this.dataTemplate.map(
      (data: SimpleDataModel) => {
        return Object.assign({}, data);
      }
    );
    const updateData = (collection: SimpleDataModel[], target: string) => {
      const data: SimpleDataModel | undefined = collection.find(
        (item: SimpleDataModel) => {
          return item.name === target;
        }
      );
      if (data) {
        let value = Number(data.value);
        value++;
        data.value = value + '';
      }
    };
    friends = friends ?? [];
    return <SimpleDataModel[]>friends
      .map((f: FriendsEntity) => this.timeSince.transform(f.dob))
      .reduce((acc: SimpleDataModel[], age: string): SimpleDataModel[] => {
        const currentAge = Number(age);
        if (!isNaN(currentAge)) {
          if (currentAge >= 18 && currentAge < 29) {
            updateData(acc, '18-29');
          } else if (currentAge >= 30 && currentAge < 39) {
            updateData(acc, '30-39');
          } else if (currentAge >= 40 && currentAge < 49) {
            updateData(acc, '40-49');
          } else if (currentAge >= 50 && currentAge < 59) {
            updateData(acc, '50-59');
          } else if (currentAge >= 60) {
            updateData(acc, '60+');
          }
        }
        return acc;
      }, templateData)
      .filter((item: SimpleDataModel) => {
        return Number(item.value) !== 0;
      });
  }
}
