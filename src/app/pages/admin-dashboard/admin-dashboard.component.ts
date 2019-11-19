import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
// importar el servicio de cifrado AES
import { CryptServiceService } from '../../services/crypt-service.service';
import { Router } from 'node_modules/@angular/router';

export interface PeriodicElement {
  Unidades: string;
  Enseguimiento: number;
  terminadas: number;
  exitosas: number;
  cursosexitosos: number;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Unidades: 'Tuxtla Gutiérrez', Enseguimiento: 1, terminadas: 2, exitosas: 7, cursosexitosos: 10, id: 1 },
  { Unidades: 'Comitan', Enseguimiento: 4, terminadas: 3, exitosas: 10, cursosexitosos: 20, id: 2 },
  { Unidades: 'Tapachula', Enseguimiento: 6, terminadas: 5, exitosas: 20, cursosexitosos: 30, id: 3 },
  { Unidades: 'Reforma', Enseguimiento: 9, terminadas: 3, exitosas: 8, cursosexitosos: 5, id: 4 },
  { Unidades: 'Tonala', Enseguimiento: 10, terminadas: 12, exitosas: 15, cursosexitosos: 15, id: 5 },
  { Unidades: 'Villaflores', Enseguimiento: 12, terminadas: 23, exitosas: 9, cursosexitosos: 35, id: 6 },
  { Unidades: 'Yajalón', Enseguimiento: 14, terminadas: 56, exitosas: 4, cursosexitosos: 25, id: 7 },
  { Unidades: 'San Cristobal de las Casas', Enseguimiento: 14, terminadas: 56, exitosas: 15, cursosexitosos: 20, id: 8 },
  { Unidades: 'Ocosingo', Enseguimiento: 14, terminadas: 56, exitosas: 6, cursosexitosos: 7, id: 9 },
  { Unidades: 'Jiquipilas', Enseguimiento: 14, terminadas: 56, exitosas: 6, cursosexitosos: 7, id: 10 },
  { Unidades: 'Catazaja', Enseguimiento: 14, terminadas: 56, exitosas: 6, cursosexitosos: 7, id: 11 }
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // tslint:disable-next-line:max-line-length
  public pieChartLabels: Label[] = [['Tuxtla Gutiérrez'], ['Comitan'], 'Tapachula', 'Reforma', 'Tonala', 'Villaflores', 'Yajalón', 'San Cristobal de las Casas', 'Ocosingo'];
  public pieChartData: SingleDataSet = [10, 20, 30, 5, 15, 35, 25, 50, 7];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Noviembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    // tslint:disable-next-line:max-line-length
    { data: [7], label: 'Tuxtla Gutiérrez'},
    { data: [10], label: 'Comitan'},
    { data: [20], label: 'Tapachula'},
    { data: [8], label: 'Reforma'},
    { data: [15], label: 'Tonala'},
    { data: [9], label: 'Villaflores'},
    { data: [4], label: 'Yajalón'},
    { data: [15], label: 'San Cristobal de las Casas'},
    { data: [6], label: 'Ocosingo'}
  ];

  displayedColumns = ['Unidades', 'Enseguimiento', 'terminadas', 'exitosas', 'cursosexitosos', 'detalle'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  places: Array<any> = [];

  constructor(private crypto: CryptServiceService, private route: Router) {
    this.places = [
      {
          imgSrc: 'assets/images/card-1.jpg',
          place: 'Cozy 5 Stars Apartment',
          description:
              // tslint:disable-next-line:max-line-length
              'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
          charge: '$899/night',
          location: 'Barcelona, Spain'
      },
      {
          imgSrc: 'assets/images/card-2.jpg',
          place: 'Office Studio',
          description:
              // tslint:disable-next-line:max-line-length
              'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
          charge: '$1,119/night',
          location: 'London, UK'
      },
      {
          imgSrc: 'assets/images/card-3.jpg',
          place: 'Beautiful Castle',
          description:
              // tslint:disable-next-line:max-line-length
              'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
          charge: '$459/night',
          location: 'Milan, Italy'
      }
    ];
  }

  public lineChartColors: Array<any> = [
    {
        // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
        // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
        // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDashBoard(id: number) {
    const strId = id.toString();
    const str = this.crypto.encryptUsingAES256(strId);
    this.route.navigate(['/admindashboard-detalle', str]);
  }

}
