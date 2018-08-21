import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import {UserServiceService} from '../services/user-service.service';
import {Observable, timer} from '../../../node_modules/rxjs';
import {map, switchMap} from 'rxjs/operators';

export function existingUsernameValidator(userService: UserServiceService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const debounceTime = 500; // milliseconds
    return timer(debounceTime).pipe(switchMap(() => {
      return userService.getUserByUsername(control.value).pipe(map(
        users => {
          return (!users.available) ? {'app-usernameExists': true} : null;
        }
      ));
    }));
  };
}

@Directive({
  selector: '[app-usernameExists][formControlName],[app-usernameExists][formControl],[app-usernameExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true}]
})
export class ExistingUsernameValidatorDirective implements AsyncValidator {
  constructor(private userService: UserServiceService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingUsernameValidator(this.userService)(control);
  }
}

