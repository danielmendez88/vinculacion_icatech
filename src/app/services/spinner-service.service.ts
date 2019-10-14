import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {
  // comportamiento
  visibility = new Subject<boolean>();

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
