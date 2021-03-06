import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// importamos el servicio
import { NavserviceService } from '../../services/navservice.service';
// importar location
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit, AfterViewInit {

  // declaramos el viewchild
  @ViewChild('sidenav') sideNav: ElementRef;

  constructor(
    private navService: NavserviceService,
    private $location: Location
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.navService.nav = this.sideNav;
  }

  backClicked() {
    this.$location.back();
  }

}
