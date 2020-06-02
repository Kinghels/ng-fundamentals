import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ISessions, restrictedWords } from '../shared';

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  newSessionForm: FormGroup;
  name: AbstractControl;
  presenter: AbstractControl;
  duration: AbstractControl;
  level: AbstractControl;
  abstract: AbstractControl;

  @Output() saveNewSession = new EventEmitter();
  @Output() cancelNewSession = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required,
      Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  saveSession(formValues){
    console.log(formValues);

    const session: ISessions = {
      id: undefined,
      name: formValues.name,
      presenter: formValues.presenter,
      duration: +formValues.duration,
      level: formValues.level,
      abstract: formValues.abstract,
      voters: []
    };

    this.saveNewSession.emit(session);
  }

  cancelSession(){
    this.cancelNewSession.emit();
  }
}
