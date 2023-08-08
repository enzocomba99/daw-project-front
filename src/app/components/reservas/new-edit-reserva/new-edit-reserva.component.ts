import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';
import { firstValueFrom } from 'rxjs';
import { PageResponse } from 'src/app/interfaces/page-response';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { MatDatepickerPanel } from '@angular/material/datepicker';

@Component({
  selector: 'app-new-edit-reserva',
  templateUrl: './new-edit-reserva.component.html',
  styleUrls: ['./new-edit-reserva.component.scss']
})
export class NewEditReservaComponent {


  reservaForm: FormGroup;
  dateControl: FormControl;

  reservasPage!: PageResponse<Reserva>;
  reservaId!: string;
  editMode: boolean = false;
  reserva?: Reserva;
  selectedReserva: number | undefined;
  fechaActual = new Date();

  @ViewChild('picker') picker: any;
   @ViewChild('picker2') picker2: any;

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public fechaHoraInicio: moment.Moment | null = null;
  public fechaHoraFin: moment.Moment | null = null;

  constructor(
    private espacioFisicoService: EspacioFisicoService,
    private reservaService: ReservaService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.reservaForm = new FormGroup({})

    this.dateControl = new FormControl(); // Inicializamos la propiedad dateControl

    // Inicializamos las propiedades minDate y maxDate (si es necesario)
    this.minDate = moment();
  }

  async ngOnInit() {

    if (this.reserva) {
      this.reservaForm.addControl('fechaCreacion', new FormControl(this.reserva.fechaCreacion, [Validators.required]));
    } else {
      this.reservaForm.addControl('fechaCreacion', new FormControl(this.fechaActual, [Validators.required]));
    }
    this.reservaForm.addControl('fechaHoraDesdeReserva', new FormControl(this.reserva?.fechaHoraDesdeReserva));
    this.reservaForm.addControl('fechaHoraHastaReserva', new FormControl(this.reserva?.fechaHoraHastaReserva, [Validators.required]));
    this.reservaForm.addControl('motivoReserva', new FormControl(this.reserva?.motivoReserva));
    this.reservaForm.addControl('habilitado', new FormControl(this.reserva?.motivoReserva));
    this.reservaForm.addControl('clienteId', new FormControl([]));
    this.reservaForm.addControl('estadoId', new FormControl([]));
    this.reservaForm.addControl('espaciosFisicosId', new FormControl([]));
  }

   // Método para actualizar las propiedades de fechas y horas de inicio y fin
   dateUpdated() {
    this.fechaHoraInicio = moment(this.reservaForm.get('fechaHoraDesdeReserva')?.value);
    this.fechaHoraFin = moment(this.reservaForm.get('fechaHoraHastaReserva')?.value);
   }

  async newReserva() {
    await this.spinner.show();
    console.log(this.reservaForm);
    /* this.reservaService.newReserva(this.reservaForm.value).subscribe({
      complete: () => {
        this.snackBar.open('Se ha creado la reserva correctamente.',"Cerrar");
        this.router.navigateByUrl('/reservas');
        this.spinner.hide();
      },
      error: (e) => {
        this.snackBar.open(e.error.message,"Cerrar");
        console.error(e);
        this.spinner.hide();
      }
    }); */

  }

  async editArticulo(){
    console.log('se editó');
  }

  async cancel(){
    console.log('se cancelo');
  }

}
