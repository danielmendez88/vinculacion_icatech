import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from 'node_modules/@angular/material';
import { ChartOptions, ChartType, ChartDataSets } from 'node_modules/@types/chart.js';
import { Label } from 'node_modules/ng2-charts';
// importar el servicio de cifrado AES
import { CryptServiceService } from '../../services/crypt-service.service';
// angular router
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  Unidades: string;
  Enseguimiento: number;
  terminadas: number;
  exitosas: number;
  cursosexitosos: number;
  id: number;
}

@Component({
  selector: 'app-admindashboardetails',
  templateUrl: './admindashboardetails.component.html',
  styleUrls: ['./admindashboardetails.component.scss']
})
export class AdmindashboardetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unidadStr: string;

  displayedColumns = ['Unidades', 'Enseguimiento', 'terminadas', 'exitosas', 'cursosexitosos'];
  dataSource: any;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Noviembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];

  constructor(private route: ActivatedRoute, private crypto: CryptServiceService) { }

  ngOnInit() {
    const strUnidad = this.crypto.decryptUsingAES256(this.route.snapshot.paramMap.get('idunidad'));
    const unidadId = +strUnidad;
    if (unidadId === 1) {
      this.unidadStr = 'Tuxtla Gutiérrez';
    } else if (unidadId === 2) {
      this.unidadStr = 'Comitan';
    } else if (unidadId === 3) {
      this.unidadStr = 'Tapachula';
    } else if (unidadId === 4) {
      this.unidadStr = 'Reforma';
    } else if (unidadId === 5) {
      this.unidadStr = 'Tonala';
    } else if (unidadId === 6) {
      this.unidadStr = 'Villaflores';
    } else if (unidadId === 7) {
      this.unidadStr = 'Yajalón';
    } else if (unidadId === 8) {
      this.unidadStr = 'San Cristobal de las Casas';
    } else if (unidadId === 9) {
      this.unidadStr = 'Ocosingo';
    } else if (unidadId === 10) {
      this.unidadStr = 'Jiquipilas';
    } else if (unidadId === 11) {
      this.unidadStr = 'Catazaja';
    }

    this.getunidadCapacitacion(unidadId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAccionesMoviles(idUnidad: number) {
    if (idUnidad === 1) {
      this.unidadStr = 'Tuxtla Gutiérrez';
    } else if (idUnidad === 2) {
      this.unidadStr = 'Comitan';
    } else if (idUnidad === 3) {
      this.unidadStr = 'Tapachula';
    } else if (idUnidad === 4) {
      this.unidadStr = 'Reforma';
    } else if (idUnidad === 5) {
      this.unidadStr = 'Tonala';
    } else if (idUnidad === 6) {
      this.unidadStr = 'Villaflores';
    } else if (idUnidad === 7) {
      this.unidadStr = 'Yajalón';
    } else if (idUnidad === 8) {
      this.unidadStr = 'San Cristobal de las Casas';
    } else if (idUnidad === 9) {
      this.unidadStr = 'Ocosingo';
    } else if (idUnidad === 10) {
      this.unidadStr = 'Jiquipilas';
    } else if (idUnidad === 11) {
      this.unidadStr = 'Catazaja';
    }
  }

  getunidadCapacitacion(idUnidad: number) {
    if (idUnidad === 1) {
      // vamos a crear un array de datos para poder trabajar con todo
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Copainala', Enseguimiento: 1, terminadas: 2, exitosas: 6, cursosexitosos: 20, id: 1 },
        { Unidades: 'Acción Móvil Simojovel', Enseguimiento: 4, terminadas: 3, exitosas: 10, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil Chiapa de Corzo', Enseguimiento: 6, terminadas: 5, exitosas: 28, cursosexitosos: 20, id: 3 },
        { Unidades: 'Acción Móvil Jitotol', Enseguimiento: 9, terminadas: 3, exitosas: 35, cursosexitosos: 20, id: 4 },
      ];

      this.barChartData = [
        { data: [6], label: 'Acción Móvil Copainala' },
        { data: [10], label: 'Acción Móvil Simojovel' },
        { data: [28], label: 'Acción Móvil Chiapa de Corzo' },
        { data: [35], label: 'Acción Móvil Jitotol' },
      ];

      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 2) {
      // array
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Unidad de Capacitación Comitan', Enseguimiento: 1, terminadas: 2, exitosas: 12, cursosexitosos: 20, id: 1 },
        { Unidades: 'Acción Móvil Las Rosas', Enseguimiento: 4, terminadas: 3, exitosas: 15, cursosexitosos: 20, id: 2 }
      ];

      this.barChartData = [
        { data: [12], label: 'Unidad de Capacitación Comitan' },
        { data: [15], label: 'Acción Móvil Las Rosas' }
      ];

      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 3) {
      // array
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Motozintla', Enseguimiento: 1, terminadas: 2, exitosas: 8, cursosexitosos: 20, id: 1 },
        { Unidades: 'Acción Móvil Cacahoatan', Enseguimiento: 4, terminadas: 3, exitosas: 5, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil Tuxtla Chico', Enseguimiento: 6, terminadas: 5, exitosas: 22, cursosexitosos: 20, id: 3 },
        { Unidades: 'Acción Móvil Unión Juarez', Enseguimiento: 9, terminadas: 3, exitosas: 50, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [8], label: 'Acción Móvil Motozintla' },
        { data: [5], label: 'Acción Móvil Cacahoatan' },
        { data: [22], label: 'Acción Móvil Tuxtla Chico' },
        { data: [50], label: 'Acción Móvil Unión Juarez' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 4) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Juarez', Enseguimiento: 1, terminadas: 2, exitosas: 8, cursosexitosos: 20, id: 1 },
        { Unidades: 'Acción Móvil Rayón', Enseguimiento: 4, terminadas: 3, exitosas: 7, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil Ostuacan', Enseguimiento: 6, terminadas: 5, exitosas: 6, cursosexitosos: 20, id: 3 },
        { Unidades: 'Acción Móvil Pichucalco', Enseguimiento: 9, terminadas: 3, exitosas: 5, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [8], label: 'Acción Móvil Juarez' },
        { data: [7], label: 'Acción Móvil Rayón' },
        { data: [6], label: 'Acción Móvil Ostuacan' },
        { data: [5], label: 'Acción Móvil Pichucalco' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 5) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Pijijiapan', Enseguimiento: 1, terminadas: 2, exitosas: 40, cursosexitosos: 20, id: 1 },
        { Unidades: 'Acción Móvil Arriaga', Enseguimiento: 4, terminadas: 3, exitosas: 8, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil Mapastepec', Enseguimiento: 6, terminadas: 5, exitosas: 15, cursosexitosos: 20, id: 3 },
        { Unidades: 'Unidad de Capacitación Tonala', Enseguimiento: 9, terminadas: 3, exitosas: 20, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [40], label: 'Acción Móvil Pijijiapan' },
        { data: [8], label: 'Acción Móvil Arriaga' },
        { data: [15], label: 'Acción Móvil Mapastepec' },
        { data: [20], label: 'Unidad de Capacitación Tonala' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 6) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Unidad de Capacitación Villaflores', Enseguimiento: 1, terminadas: 2, exitosas: 6, cursosexitosos: 20, id: 1 },
        { Unidades: 'Acción Móvil Angel Albino Corzo', Enseguimiento: 4, terminadas: 3, exitosas: 25, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil El Parral', Enseguimiento: 6, terminadas: 5, exitosas: 40, cursosexitosos: 20, id: 3 }
      ];

      this.barChartData = [
        { data: [6], label: 'Unidad de Capacitación Villaflores' },
        { data: [25], label: 'Acción Móvil Angel Albino Corzo' },
        { data: [40], label: 'Acción Móvil El Parral' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 7) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Tila', Enseguimiento: 1, terminadas: 2, exitosas: 10, cursosexitosos: 20, id: 1 },
        { Unidades: 'Unidad de Capacitación Yajalón', Enseguimiento: 9, terminadas: 3, exitosas: 10, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [10], label: 'Acción Móvil Tila' },
        { data: [10], label: 'Unidad de Capacitación Yajalón' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 8) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Teopisca', Enseguimiento: 4, terminadas: 3, exitosas: 30, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil Oxchuc', Enseguimiento: 6, terminadas: 5, exitosas: 12, cursosexitosos: 20, id: 3 },
        // tslint:disable-next-line:max-line-length
        { Unidades: 'Unidad de Capacitación San Cristobal de las Casas', Enseguimiento: 9, terminadas: 3, exitosas: 8, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [30], label: 'Acción Móvil Teopisca' },
        { data: [12], label: 'Acción Móvil Oxchuc' },
        { data: [8], label: 'Unidad de Capacitación San Cristobal de las Casas' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 9) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Unidad de Capacitación Ocosingo', Enseguimiento: 9, terminadas: 3, exitosas: 10, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [10], label: 'Unidad de Capacitación Ocosingo' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 10) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Acción Móvil Ocozocuatla', Enseguimiento: 4, terminadas: 3, exitosas: 10, cursosexitosos: 20, id: 2 },
        { Unidades: 'Acción Móvil Cintalapa', Enseguimiento: 6, terminadas: 5, exitosas: 15, cursosexitosos: 20, id: 3 },
        // tslint:disable-next-line:max-line-length
        { Unidades: 'Unidad de Capacitación Jiquipilas', Enseguimiento: 9, terminadas: 3, exitosas: 7, cursosexitosos: 20, id: 4 }
      ];

      this.barChartData = [
        { data: [10], label: 'Acción Móvil Ocozocuatla' },
        { data: [10], label: 'Acción Móvil Cintalapa' },
        { data: [10], label: 'Unidad de Capacitación Jiquipilas' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    } else if (idUnidad === 11) {
      const ADMINISTRATIVE_DATA: PeriodicElement[] = [
        { Unidades: 'Unidad de Capacitación Catazaja', Enseguimiento: 1, terminadas: 2, exitosas: 10, cursosexitosos: 20, id: 1 }
      ];

      this.barChartData = [
        { data: [10], label: 'Unidad de Capacitación Catazaja' }
      ];


      this.dataSource = new MatTableDataSource(ADMINISTRATIVE_DATA);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
