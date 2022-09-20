import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'friends-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('is not empty');
  }
}
