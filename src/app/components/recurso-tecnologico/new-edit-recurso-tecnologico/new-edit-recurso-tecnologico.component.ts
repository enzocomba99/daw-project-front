import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecursoTecnologico } from 'src/app/interfaces/recurso-tecnologico';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-new-edit-recurso-tecnologico',
  templateUrl: './new-edit-recurso-tecnologico.component.html',
  styleUrls: ['./new-edit-recurso-tecnologico.component.scss']
})
export class NewEditRecursoTecnologicoComponent {

  recursoTecnologicoForm: FormGroup;
  recursoTecnologicoId!: string;
  editMode: boolean = false;
  recursoTecnologico?: RecursoTecnologico;

  constructor(
    private recursoTecnologicoService: RecursoTecnologicoService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.recursoTecnologicoForm = new FormGroup({})
  }

  async ngOnInit() {

    this.recursoTecnologicoForm.addControl('nombre', new FormControl(this.recursoTecnologico?.nombre, [Validators.required]));
    this.recursoTecnologicoForm.addControl('descripcion', new FormControl(this.recursoTecnologico?.descripcion));

    this.spinner.show();

    if(this.route.snapshot.paramMap.get('id')){
      this.recursoTecnologicoId = this.route.snapshot.paramMap.get('id')?? "";
      this.editMode = true;
      await this.setForm();
    }
    this.spinner.hide();
  }


  async setForm() {

    this.recursoTecnologico = await firstValueFrom(this.recursoTecnologicoService.getRecursoTecnologicoById(this.recursoTecnologicoId));
    if(this.recursoTecnologico){
      this.recursoTecnologicoForm.get('nombre')?.setValue(this.recursoTecnologico.nombre);
      this.recursoTecnologicoForm.get('descripcion')?.setValue(this.recursoTecnologico.descripcion);
    }else{
      this.snackBar.open('No se encontro el recurso tecnologico',"Cerrar");
      this.router.navigateByUrl('/recursos');
    }
  }

  async newRecursoTecnologico() {
    await this.spinner.show();
    this.recursoTecnologicoService.newRecursoTecnologico(this.recursoTecnologicoForm.value).subscribe({
      complete: () => {
        this.snackBar.open('Se ha creado el recurso tecnologico correctamente.',"Cerrar");
        this.router.navigateByUrl('/recursos');
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

  cancel() {
    this.router.navigateByUrl('/recursos');
  }

  async editRecursoTecnologico() {
    await this.spinner.show();
    this.recursoTecnologicoService.updateRecursoTecnologico(this.recursoTecnologicoForm.value, this.recursoTecnologicoId).subscribe({
      complete: () => {
        this.snackBar.open('Se ha editado el recurso tencológico correctamente.',"Cerrar");
        this.router.navigateByUrl('/recursos');
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
