import { Injectable } from '@angular/core';
// importar crypto js
import * as CryptoJS from 'crypto-js';
// importar enviroment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptServiceService {
  encrypted: any = '';
  decrypted: string;

  response: string;


  constructor() { }

  /**
   * funciones de crypto
   */
  encryptUsingAES256(request: string) {
    const key: string = environment.TOKENFROMUI;
    const ivs: string = CryptoJS.enc.Utf8.parse(environment.TOKENFROMUI);
    const encrytedBy = CryptoJS.AES.encrypt(
      request.trim(), key.trim()
    );
    return encrytedBy.toString();
  }

  /**
   * funciones de decifrado
   */
  decryptUsingAES256(encrypt: string) {
    const key: string = environment.TOKENFROMUI;
    const ivs: string = CryptoJS.enc.Utf8.parse(environment.TOKENFROMUI);

    return this.decrypted = CryptoJS.AES.decrypt(
      encrypt.trim(), key.trim()
    ).toString(CryptoJS.enc.Utf8);
  }
}
