import { Component, OnInit, Input } from '@angular/core';
import { ISessions } from '../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnInit {
  @Input() sessions:ISessions[]
  constructor() { }

  ngOnInit(): void {
  }

}
