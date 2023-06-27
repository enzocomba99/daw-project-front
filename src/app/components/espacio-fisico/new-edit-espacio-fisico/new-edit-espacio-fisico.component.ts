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

@Component({
  selector: 'app-new-edit-espacio-fisico',
  templateUrl: './new-edit-espacio-fisico.component.html',
  styleUrls: ['./new-edit-espacio-fisico.component.scss']
})
export class NewEditEspacioFisicoComponent {

  espacioFisicoForm: FormGroup;

  recursosTecnologicos: RecursoTecnologico[] = [];
  recursosTecnologicosCopy: RecursoTecnologico[] = [];

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

    this.recursoTecnologicoService.getRecursosTecnologicos().subscribe({
      next: (v) => {
        this.recursosTecnologicos = v;
        this.recursosTecnologicosCopy = v;
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
        this.spinner.hide();
      },
      error: (e) => {
        this.snackBar.open(e.error.message,"Cerrar");
        console.error(e);
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

  async editArticulo() {
    // await this.spinner.show();
    // this.articuloService.modificarArticulo(this.articuloForm.value, this.articuloId).subscribe(
    //   async (response) => {
    //     this.toaster.showSuccess('Se ha editado el articulo correctamente.');
    //     await this.spinner.hide();
    //     this.location.back();
    //   },
    //   async (error) => {
    //     this.toaster.showError(error.error.message);
    //     await this.spinner.hide();
    //   }
    // );
  }
}
