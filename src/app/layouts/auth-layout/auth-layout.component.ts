import { Component, OnInit } from '@angular/core';
// importar servicio
import { LoginService } from '../../services/login.service';
// importar modelo
import { Model } from '../../models/model';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  // login form
  models: Model[] = [];

  constructor(
    private modelService: LoginService
  ) {}

  ngOnInit() {
    this.models = this.modelService.getAll();
  }

}
