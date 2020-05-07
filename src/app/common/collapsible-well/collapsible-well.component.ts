import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styleUrls: ['./collapsible-well.component.css']
})
export class CollapsibleWellComponent implements OnInit {
  isVisible: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  toggleContent(){
    this.isVisible = !this.isVisible
  }
}
