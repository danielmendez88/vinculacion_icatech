import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class ResetformService {

  constructor() { }

  // funciones de resetear formulario
  resetForms(frm: FormGroup) {
    let control: AbstractControl = null;
    frm.reset();
    frm.markAsUntouched();
    Object.keys(frm.controls).forEach((name) => {
      control = frm.controls[name];
      control.setErrors(null);
    });
    frm.setErrors({invalid: true});
  }
}
