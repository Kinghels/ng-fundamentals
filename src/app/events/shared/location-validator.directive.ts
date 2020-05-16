import { Directive } from '@angular/core';
import { Validator, ValidationErrors, FormGroup,
  NG_VALIDATORS
} from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true }
  ]
})
export class LocationValidatorDirective implements Validator{

  constructor() { }
  validate(control: FormGroup): ValidationErrors {
    let addressControl = control.controls['address'];
    let cityControl = control.controls['city'];
    let countryControl = control.controls['country'];
    let urlControl = (<FormGroup>control.root).controls['onlineUrl'];
    
    if( (urlControl && urlControl.value) 
      || (addressControl && addressControl.value
        && cityControl && cityControl.value
        && countryControl && countryControl.value)){
          return null;
    }else{
      return { validateLocation: false };
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }

}
