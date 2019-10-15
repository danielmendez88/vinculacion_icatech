import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgendaService } from '../../services/agenda.service';
// modelo de la agenda
import { Agenda } from '../../models/angendas';
// ruta activa
import { ActivatedRoute } from '@angular/router';
// importar titulo
import { Title } from '@angular/platform-browser';
// importar auth service
import { AuthService } from '../../services/auth.service';
// importar cryptojs
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.scss']
})
export class AgendaListaComponent implements OnInit {
  public estacargando: boolean;
  mode = 'indeterminate';
  Agenda;
  public idString: string;

  key = 'dmLunXNnggR4lAMECfl3SZjhMSktmM716ZARmxndOPc=';
  encrypted = "125";
  encrypted_json: any;
  decrypted: any | null;


  displayedColumns: string[] = ['fecha', 'institucion', 'tipo', 'vinculador', 'detalle'];
  // asignar la data a la fuente de datos para la tabla a reenderizar
  datasource = new MatTableDataSource<Agenda>();
  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // modificamos la agenda

  constructor(
    private agendaList: AgendaService,
    private ruta: ActivatedRoute,
    private Titulo: Title,
    private auth: AuthService) { }

  ngOnInit() {
    // set titulos
    this.Titulo.setTitle('Sivic / Agendas');
    this.estacargando = false;
    // this.encrypted_json = JSON.parse(atob(this.encrypted));
    this.decrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.encrypted.toString()), CryptoJS.enc.Base64.parse(this.key), {
      keySize: 256,
      iv:CryptoJS.enc.Base64.parse(this.key),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    console.log(this.decrypted.toString());
    // cargar el loagin
    this.Agenda = this.ruta.snapshot.data.Agendas;
    // this.getAgendas();
    this.datasource.data = this.Agenda;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
  // agendas
  getAgendas() {
    this.idString = this.auth.useridCurrent.toString();
    this.agendaList.getAllAgendas(this.idString)
                   .subscribe(res => {
                     //this.estacargando = false;
                     this.datasource.data = res as Agenda[];
                     this.estacargando = true;
                     this.estacargando = false;
                     console.log(res);
                     console.log(this.estacargando);
                   },
                   (error) => {
                     console.error(error);
                     this.estacargando = false;
                   });
  }

  /**
   * aplicar filtros
   */
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  updateAgendas() {
    try {
      // this.estacargando = true;
      // console.log(this.estacargando);
      this.getAgendas();
    } catch (error) {
      console.error(error);
    }
  }
}
