import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/common/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  lastName: AbstractControl;
  firstName: AbstractControl;

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastrService) { }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser.firstName
      , [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  saveProfile(formValues){
    if (this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
        this.toastService.success('Profile Saved');
        this.router.navigate(['events']);
      });
    }
  }

  validate(formControl: AbstractControl){
    return (formControl.valid || formControl.untouched);
  }
  cancel(){
    this.router.navigate(['events']);
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['events']);
    });
  }

}
