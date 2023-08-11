import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';
import { PageResponse } from 'src/app/interfaces/page-response';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { DatePipe, formatDate } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-new-edit-reserva',
  templateUrl: './new-edit-reserva.component.html',
  styleUrls: ['./new-edit-reserva.component.scss'],

})
export class NewEditReservaComponent {

  reservaForm: FormGroup;
  espaciosFisicosPage: PageResponse<EspacioFisico> | null = null; // Inicialización opcional
  clientesPage: PageResponse<Cliente> | null = null; // Inicialización opcional
  reservasPage!: PageResponse<Reserva>;
  reservaId!: string;
  editMode: boolean = false;
  reserva?: Reserva;
  selectedReserva: number | undefined;
  public minDate: moment.Moment = moment();

  @ViewChild('picker') picker: any;
  @ViewChild('picker') picker2: any;

  constructor(
    private espacioFisicoService: EspacioFisicoService,
    private clienteService: ClienteService,
    private reservaService: ReservaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.reservaForm = new FormGroup({})
  }

  async ngOnInit() {
    
    this.reservaForm.addControl('fechaHoraDesdeReserva', new FormControl(null, [Validators.required]));
    this.reservaForm.addControl('fechaHoraHastaReserva', new FormControl(null, [Validators.required]));
    this.reservaForm.addControl('motivoReserva', new FormControl(this.reserva?.motivoReserva));
    this.reservaForm.addControl('clienteId', new FormControl(this.reserva?.cliente, [Validators.required]));
    this.reservaForm.addControl('espacioFisicoId', new FormControl(this.reserva?.espacioFisico, [Validators.required]));

    this.getEspaciosFisicos();
    this.getClientes();

    const fechaHoraDesdeReservaControl = this.reservaForm.get('fechaHoraDesdeReserva');
    const fechaHoraHastaReservaControl = this.reservaForm.get('fechaHoraHastaReserva');

    if (fechaHoraHastaReservaControl && fechaHoraDesdeReservaControl) {
      fechaHoraDesdeReservaControl.valueChanges.subscribe(() => {
        this.dateValidation(this.reservaForm);
      });

      fechaHoraHastaReservaControl.valueChanges.subscribe(() => {
        this.dateValidation(this.reservaForm);
      });
    }
  }


  async getEspaciosFisicos(){
    this.espacioFisicoService.getEspaciosFisicos(0,100, undefined, undefined, 'nombre', 'asc').subscribe({
      next: (v) => {
        this.espaciosFisicosPage = v;
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e);
        this.spinner.hide();
      }
    });
  }

  async getClientes(){
    this.clienteService.getClientes(0,100, undefined, undefined).subscribe({
      next: (v) => {
        this.clientesPage = v;
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e);
        this.spinner.hide();
      }
    });
  }

  async newReserva() {
    await this.spinner.show();
    console.log(this.reservaForm);
    this.reservaService.newReserva(this.reservaForm.value).subscribe({
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
    }); 
  }

  async editReserva(){
    console.log('se editó');
  }

  async cancel(){
    this.router.navigateByUrl('/reservas');
  }


  dateValidation(reservaForm: FormGroup) {
    const startDateControl = reservaForm.get('fechaHoraDesdeReserva');
    const endDateControl = reservaForm.get('fechaHoraHastaReserva');

    if (!startDateControl || !endDateControl) {
      return null;
    }

    const startDate = startDateControl.value;
    const endDate = endDateControl.value;

    if (startDate && endDate) {
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();

      if (startTime >= endTime) {
        endDateControl.setErrors({ invalidDateTimeRange: true });
      } else {
        endDateControl.setErrors(null);
      }
    }

    return null;
  }

  /* formatDate(date: Date): string {
    return formatDate(date, 'MM/dd/yyyy', 'en');
  } */
}