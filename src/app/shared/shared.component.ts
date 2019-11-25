import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() link: string;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  sendTolink(url: any) {
    this.route.navigate(url);
  }

}
