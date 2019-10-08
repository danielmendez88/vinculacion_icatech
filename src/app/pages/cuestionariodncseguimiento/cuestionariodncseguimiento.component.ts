import { Component, OnInit, Input } from '@angular/core';
// importamos un servicio
import { CuestionariodncService } from '../../services/cuestionariodnc.service';
// modelo e interface agendas detalles
import { AgendaDetails } from '../../models/agendaDetails';
// agregar snackbar
import { SnackserviceService } from '../../services/snackservice.service';

@Component({
  selector: 'app-cuestionariodncseguimiento',
  templateUrl: './cuestionariodncseguimiento.component.html',
  styleUrls: ['./cuestionariodncseguimiento.component.scss']
})
export class CuestionariodncseguimientoComponent implements OnInit {

  @Input() datosCuestionarioDnc;
  // detalle encuesta
  detalle: AgendaDetails;
  // tipo de sector
  tiposector: number;
  sector: number;
  // es dnc
  isdnc: number;
  // generamos el modelo
  ModeloDNC: any = [];

  constructor(
    private dnccuestionario: CuestionariodncService,
    private snack: SnackserviceService
  ) { }

  ngOnInit() {
    this.detalle = this.datosCuestionarioDnc;
    this.tiposector = this.datosCuestionarioDnc.tipo;
    this.isdnc = this.datosCuestionarioDnc.isdnc;
    if (this.tiposector === 1 || this.tiposector === 2) {
      this.sector = 1;
    } else {
      this.sector = 2;
    }

    /**
     * validamos si el dnc es igual a cero
     * de ser así procedemos a utilizar el método
     */
    if (this.isdnc === 1) {
      this.getdncApi(this.datosCuestionarioDnc.id);
    }
  }

  /**
   * get dnc method
   */
  getdncApi(id: number) {
    this.dnccuestionario.getDncFromIdAgenda(id).subscribe(
      (response) => {
        this.ModeloDNC = response;
      },
      (error) => {
        this.snack.showSnackBar(JSON.stringify(error), 'Error');
      }
    );
  }

}
