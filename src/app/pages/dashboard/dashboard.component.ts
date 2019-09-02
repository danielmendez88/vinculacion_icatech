import { Component, OnInit } from '@angular/core';
// importar el servicio auth
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userRole: string;

  constructor(
    private auths: AuthService
  ) { }

  ngOnInit() {
    this.userRole = this.auths.UserRoleCurrent;
  }

}
