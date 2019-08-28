import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
// importar servicio
import { NavserviceService } from '../../services/navservice.service';
// servicio auth
import { AuthService } from '../../services/auth.service';
// router
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(public navs: NavserviceService, private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }

}
