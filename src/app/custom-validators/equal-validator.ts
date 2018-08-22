import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[app-EqualValidate][formControlName],[app-EqualValidate][formControl],[app-EqualValidate][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualValidator),
      multi: true
    }
  ]
})

export class EqualValidator implements Validator {

  constructor(@Attribute('app-EqualValidate') public EqualValidate: string) { }

  validate(abControl: AbstractControl): { [key: string]: any } {
    // Get self value.
    const val = abControl.value;

    // Get control value.
    const cValue = abControl.root.get(this.EqualValidate);

    // value not equal
    if (cValue && val !== cValue.value)  {
     return {EqualValidate: false} ;
    }

    return null;
  }
}
