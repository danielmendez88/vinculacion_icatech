import { Component, OnInit, ViewChild, Inject } from '@angular/core';
// caledario
import dayGridPlugin from '@fullcalendar/daygrid';
// cambiar el calendario opciones
import { OptionsInput, EventInput  } from '@fullcalendar/core';
// import agendas
import { AgendaService } from '../../services/agenda.service';
// import agendas class
import { Events } from '../../models/events';
// component callendar
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  eventId: string;
  eventTitle: string;
  eventDate: Date;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  options: OptionsInput;
  // eventos como array
  eventlist: Events[] = [];
  // iniciamos el plugin
  calendarPlugins = [dayGridPlugin]; // !important
  agenda: any = [];
  calendarEvents: EventInput[] = []; // eventos en los calendarios !importante
  // obtenemos el id del usuario logeado
  idUser: string = localStorage.getItem('currentUserId');
  userId = +this.idUser; // modificamos el valor de string a integer
  calendar; // variable para calendario

  // referencias por el calendario en la plantilla
  @ViewChild('calendario') CalendaroComponente: FullCalendarComponent;

  constructor(private Agenda: AgendaService, private router: ActivatedRoute, private dialog: MatDialog) {
    // this.getallAgenda();
    // this.getAllOwnAgend(this.userId);
    this.calendar = this.router.snapshot.data.getAllOwnAgenda;
    this.parseData(this.calendar);
  }

  ngOnInit() {
    this.options = {
      locale: 'es',
      editable: true,
      header: {
        left: 'prev,next today',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día'
     },
     height: 60,
     eventLimit: true, // allow "more" link when too many events
    };
  }

  // getallAgenda() {
  //   this.Agenda.getAllAgendas()
  //   .subscribe(response => {
  //     if (response) {
  //       this.parseData(response);
  //       console.log(response);
  //     }
  //   });
  // }

  // getAllOwnAgend(idUser) {
  //   this.Agenda.getAllOwnAgenda(idUser)
  //   .subscribe(res => {
  //     if (res) {
  //       this.parseData(res);
  //       console.log(res);
  //     }
  //   });
  // }

  // parse data
  parseData(jsonData: string) {
    console.log(jsonData);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < jsonData.length; i++) {
      this.calendarEvents = this.calendarEvents.concat(
        // tslint:disable-next-line:no-string-literal
        { id: jsonData[i]['id'], title: jsonData[i]['institucion'], start: jsonData[i]['fecha'],
        backgroundColor: 'red', textColor: 'white', borderColor: 'black'}
      );
    }
  }

  eventClick(event) {
    const dateString = event.event.start;
    const dialogRef = this.dialog.open(DialogOverView, {
      width: '350px',
      data: {eventId: event.event.id, eventTitle: event.event.title, eventDate: dateString}
    });
  }
}

@Component({
  selector: 'app-calendario',
  templateUrl: './dialog.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverView {
  constructor(
    public dialogRef: MatDialogRef<DialogOverView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private route: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closedialog(idEvent): void {
    if (idEvent) {
      this.route.navigate(['/detalle', idEvent]);
    }
    this.dialogRef.close();
  }
}
