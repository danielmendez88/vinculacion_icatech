import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  // iniciamos las entradas
  @Input() bgclass: string;
  @Input() icon: string;
  @Input() contador: number;
  @Input() label: string;
  @Input() data: number;

  constructor() { }

  ngOnInit() {
  }

}
