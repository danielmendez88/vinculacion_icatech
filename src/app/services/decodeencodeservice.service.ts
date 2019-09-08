import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodeencodeserviceService {

  constructor() { }

  b64EncodeUnicode(str: any) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode(('0x' + p1) as any);
      }
    ));
  }

  /**
   * Yendo hacia atrás: desde bytestream, a codificación porcentual, a cadena original.
   */
  b64DecodeUnicode(str) {
    // tslint:disable-next-line:only-arrow-functions
    return decodeURIComponent(atob(str).split('').map( function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
