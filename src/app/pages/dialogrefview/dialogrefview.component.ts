import { Component, OnInit, Inject } from '@angular/core';
// dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// servicios de cursos
import { CursosService } from '../../services/cursos.service';
// importar el modelo de curso
import { CursosbyId } from '../../models/cursos';

// exportando una interface
export interface DialogDataCurso {
  idCurso: number;
}

@Component({
  selector: 'app-dialogrefview',
  templateUrl: './dialogrefview.component.html',
  styleUrls: ['./dialogrefview.component.scss']
})
export class DialogrefviewComponent implements OnInit {
  private cursoBy: CursosbyId = {
    curso: '',
    especialidad: '',
    objetivo: '',
    perfilIngreso: '',
    duracion: 0,
    modalidad: '',
    clasificacion: '',
    costo: ''
  };

  uniqueIdCurso: number;

  constructor(
    public dialogRef: MatDialogRef<DialogrefviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCurso,
    private cs: CursosService
  ) { }

  async ngOnInit() {
    /**
     * colocamos el valor a la variable
     */
    this.uniqueIdCurso = this.data.idCurso;

    this.cursoBy = await this.cs.getCursoById(btoa(this.uniqueIdCurso.toString()));
  }

  /**
   * funcion  para cerrar el modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

}
