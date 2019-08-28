import { FormControl } from '@angular/forms';

export function requiredFileType(type: string) {
  /**
   * validar el tipo de archivo que se envía
   */
  // tslint:disable-next-line:only-arrow-functions
  return function(control: FormControl) {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}
