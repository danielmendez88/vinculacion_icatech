import { AbstractControl } from '@angular/forms';
export class Confirmpassword {
  static MatchPassword(control: AbstractControl) {
    const password = control.get('contrasena').value;
    const confirmPassword = control.get('conrfirmarcontrasena').value;
    if (password !== confirmPassword) {
      control.get('conrfirmarcontrasena').setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }
}
