import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addFriend } from '../+state/friends.actions';
import { FriendsEntity } from '../+state/friends.models';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'friends-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit {
  public selected: Date | null = null;
  public personForm!: FormGroup; // eslint-disable-line

  public name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  public dob: FormControl = new FormControl('', [Validators.required]);
  public weight: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/\d+/),
    Validators.max(2000),
  ]);
  public units: FormControl = new FormControl('', [Validators.required]);
  public startDate = new Date(1990, 0, 1);
  public maxDate = new Date(1990, 0, 1);
  public minDate = new Date(1990, 0, 1);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<FriendsEntity[]>,
    public helperService: HelperService
  ) {}

  ngOnInit(): void {
    const date = new Date();
    const maxDate = new Date(
      date.getFullYear() - 18,
      date.getMonth(),
      date.getDay()
    );
    this.minDate = new Date(
      maxDate.getFullYear() - 110, //arbitrary, guessing no one is 128 years old
      maxDate.getMonth(),
      maxDate.getDay()
    );
    this.startDate = maxDate;
    this.maxDate = maxDate;

    this.personForm = this.formBuilder.group({
      name: this.name,
      dob: this.dob,
      weight: this.weight,
    });
  }

  submit() {
    const friend: FriendsEntity = Object.assign({}, this.personForm.value, {
      dob: new Date(this.personForm.value.dob).toISOString(),
    }) as FriendsEntity;

    this.store.dispatch(addFriend({ friend }));
    this.personForm.reset('', { emitEvent: false });
  }
}
