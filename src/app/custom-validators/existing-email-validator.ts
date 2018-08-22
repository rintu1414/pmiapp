import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import {UserServiceService} from '../services/user-service.service';
import {Observable, timer} from '../../../node_modules/rxjs';
import {map, switchMap} from 'rxjs/operators';

export function existingEmailValidator(userService: UserServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const debounceTime = 500; // milliseconds
    return timer(debounceTime).pipe(switchMap(() => {
      return userService.getUserByEmail(control.value).pipe(map(
        users => {
          return (!users.available) ? {'app-emailExists': true} : null;
        }
      ));
    }));
  };
}

@Directive({
  selector: '[app-emailExists][formControlName],[app-emailExists][formControl],[app-emailExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingEmailValidatorDirective, multi: true}]
})
export class ExistingEmailValidatorDirective implements AsyncValidator {
  constructor(private userService: UserServiceService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingEmailValidator(this.userService)(control);
  }
}
