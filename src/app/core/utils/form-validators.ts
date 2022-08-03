import { FormControl, FormGroup, Validators } from '@angular/forms';

export class FormValidator {
  static equalsTo(control: string): Validators {
    return (compareControl: FormControl) => {
      const firstControl = (<FormGroup>compareControl.root).get(control);

      if (!firstControl) {
        return null;
      }

      return compareControl.value !== firstControl.value
        ? { differentValue: true }
        : null;
    };
  }
}
