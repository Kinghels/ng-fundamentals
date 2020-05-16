import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {
  @Input() set voted(val){
    this.iconColor = val ? 'red' : 'white';
  };
  iconColor: string;
  
  @Input() count: number;
  @Output() vote = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.vote.emit({})
  }

}
