import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'friends-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  public selected: Date | null = null;
  public personForm!: FormGroup; // eslint-disable-line

  public name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100),
  ]);
  public dob: FormControl = new FormControl('', [Validators.required]);
  public weight: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/\d+/),
    Validators.max(2000),
  ]);
  public units: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      name: this.name,
      dob: this.dob,
      weight: this.weight,
    });
  }

  submit() {
    console.log(this.personForm.value);
  }
}
