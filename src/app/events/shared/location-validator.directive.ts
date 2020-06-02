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
    const addressControl = control.controls.address;
    const cityControl = control.controls.city;
    const countryControl = control.controls.country;
    const urlControl = (control.root as FormGroup).controls.onlineUrl;

    if ( (urlControl && urlControl.value)
      || (addressControl && addressControl.value
        && cityControl && cityControl.value
        && countryControl && countryControl.value)){
          return null;
    }else{
      return { validateLocation: false };
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
