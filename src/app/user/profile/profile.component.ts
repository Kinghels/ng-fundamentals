import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  lastName: AbstractControl;
  firstName: AbstractControl;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser.firstName
      , [Validators.required, Validators.pattern("[a-zA-Z].*")])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues){
    if(this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      this.router.navigate(['events'])
    }
  }

  validate(formControl: AbstractControl){
    return (formControl.valid || formControl.untouched)
  }
  cancel(){
    this.router.navigate(['events'])
  }

}
