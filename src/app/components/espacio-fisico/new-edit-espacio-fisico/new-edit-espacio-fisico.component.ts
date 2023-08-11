import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { RecursoTecnologico } from 'src/app/interfaces/recurso-tecnologico';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';
import { firstValueFrom } from 'rxjs';
import { PageResponse } from 'src/app/interfaces/page-response';

@Component({
  selector: 'app-new-edit-espacio-fisico',
  templateUrl: './new-edit-espacio-fisico.component.html',
  styleUrls: ['./new-edit-espacio-fisico.component.scss']
})
export class NewEditEspacioFisicoComponent {

  espacioFisicoForm: FormGroup;

  recursosTecnologicosPage!: PageResponse<RecursoTecnologico>;
  espacioFisicoId!: string;
  editMode: boolean = false;
  espacioFisico?: EspacioFisico;
  selectedRecursoTecnologico: number | undefined;

  constructor(
    private espacioFisicoService: EspacioFisicoService,
    private recursoTecnologicoService: RecursoTecnologicoService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.espacioFisicoForm = new FormGroup({})
  }

  async ngOnInit() {

    this.espacioFisicoForm.addControl('nombre', new FormControl(this.espacioFisico?.nombre, [Validators.required]));
    this.espacioFisicoForm.addControl('descripcion', new FormControl(this.espacioFisico?.descripcion));
    this.espacioFisicoForm.addControl('capacidad', new FormControl(this.espacioFisico?.capacidad, [Validators.required]));
    this.espacioFisicoForm.addControl('habilitado', new FormControl(this.espacioFisico?.habilitado));
    this.espacioFisicoForm.addControl('recursosId', new FormControl([]));

    this.spinner.show();

    this.recursoTecnologicoService.getRecursosTecnologicos(undefined, undefined, undefined, undefined, '100').subscribe({
      next: (v) => {
        this.recursosTecnologicosPage = v;
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e)
        this.spinner.hide();
      }
    });

    if(this.route.snapshot.paramMap.get('id')){
      this.espacioFisicoId = this.route.snapshot.paramMap.get('id')?? "";
      this.editMode = true;
      await this.setForm();
    }
    this.spinner.hide();
  }


  async setForm() {

    this.espacioFisico = await firstValueFrom(this.espacioFisicoService.getEspacioFisicoById(this.espacioFisicoId));
    if(this.espacioFisico){
      this.espacioFisicoForm.get('nombre')?.setValue(this.espacioFisico.nombre);
      this.espacioFisicoForm.get('descripcion')?.setValue(this.espacioFisico.descripcion);
      this.espacioFisicoForm.get('capacidad')?.setValue(this.espacioFisico.capacidad);
      this.espacioFisicoForm.get('habilitado')?.setValue(this.espacioFisico.habilitado);
      this.espacioFisicoForm.get('recursosId')?.setValue(this.espacioFisico.recursos);
    }else{
      this.snackBar.open('No se encontro el espacio físico',"Cerrar");
      this.router.navigateByUrl('/espacios');
    }
  }

  async newEspacioFisico() {
    await this.spinner.show();
    this.espacioFisicoService.newEspacioFisico(this.espacioFisicoForm.value).subscribe({
      complete: () => {
        this.snackBar.open('Se ha creado el espacio físico correctamente.',"Cerrar");
        this.router.navigateByUrl('/espacios');
        this.spinner.hide();
      },
      error: (e) => {
        if(e.error.message == undefined){
          this.snackBar.open("Error en el backend.","Cerrar");
        }else{
          this.snackBar.open(e.error.message,"Cerrar");
        }
        this.spinner.hide();
      }
    });

  }
  compareRecursos(recursoId1: string, recursoId2: RecursoTecnologico): boolean {
    return recursoId1 === recursoId2.id;
  }

  cancel() {
    this.router.navigateByUrl('/espacios');
  }

  mapIdArray(inputArray: any[]): string[] {
    // Verificar si el primer elemento del array es un objeto con una propiedad "id"
    if (typeof inputArray[0] === 'object' && 'id' in inputArray[0]) {
      // Realizar el mapeo si la estructura del array coincide con objetos que contienen una propiedad "id"
      return inputArray.map(item => item.id);
    } else {
      // Devolver el array sin cambios si la estructura ya coincide con el formato deseado
      return inputArray;
    }
  }

  async editArticulo() {
    await this.spinner.show();
    this.espacioFisicoForm.value.recursosId = this.mapIdArray(this.espacioFisicoForm.value.recursosId);
    this.espacioFisicoService.updateEspacioFisico(this.espacioFisicoForm.value, this.espacioFisicoId).subscribe({
      complete: () => {
        this.snackBar.open('Se ha editado el espacio físico correctamente.',"Cerrar");
        this.router.navigateByUrl('/espacios');
        this.spinner.hide();
      },
      error: (e) => {
        this.snackBar.open(e.error.message,"Cerrar");
        console.error(e);
        this.spinner.hide();
      }
    });
  }
}
