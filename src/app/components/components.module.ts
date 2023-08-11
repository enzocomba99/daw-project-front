import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacioFisicoComponent } from './espacio-fisico/espacio-fisico.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from '../app-routing.module';
import { NewEditEspacioFisicoComponent } from './espacio-fisico/new-edit-espacio-fisico/new-edit-espacio-fisico.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecursoTecnologicoComponent } from './recurso-tecnologico/recurso-tecnologico.component';
import { NewEditRecursoTecnologicoComponent } from './recurso-tecnologico/new-edit-recurso-tecnologico/new-edit-recurso-tecnologico.component';
import { ReservasComponent } from './reservas/reservas.component';
import { NewEditReservaComponent } from './reservas/new-edit-reserva/new-edit-reserva.component';
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

const CUSTOM_PARSE_DATE_INPUT = 'l, LTS';
const CUSTOM_DISPLAY_DATE_INPUT = 'DD-MM-YYYY, HH:mm';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: CUSTOM_PARSE_DATE_INPUT
  },
  display: {
    dateInput: CUSTOM_DISPLAY_DATE_INPUT,
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
    declarations: [
        EspacioFisicoComponent,
        NewEditEspacioFisicoComponent,
        RecursoTecnologicoComponent,
        NewEditRecursoTecnologicoComponent,
        ReservasComponent,
        NewEditReservaComponent,
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        NgxSpinnerModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxMatMomentModule
    ],
    providers: [
      { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
    ]

})
export class ComponentsModule { }
