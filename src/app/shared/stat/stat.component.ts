import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgC: string;
    @Input() icons: string;
    @Input() counts: number;
    @Input() labels: string;
    @Input() datas: number;

  constructor() { }

  ngOnInit() {
  }

}
