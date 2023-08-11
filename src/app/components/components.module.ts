import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../shared/home/home.component';
import { EspacioFisicoComponent } from './espacio-fisico/espacio-fisico.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from '../shared/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { NewEditEspacioFisicoComponent } from './espacio-fisico/new-edit-espacio-fisico/new-edit-espacio-fisico.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecursoTecnologicoComponent } from './recurso-tecnologico/recurso-tecnologico.component';
import { NewEditRecursoTecnologicoComponent } from './recurso-tecnologico/new-edit-recurso-tecnologico/new-edit-recurso-tecnologico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservasComponent } from './reservas/reservas.component';
import { NewEditReservaComponent } from './reservas/new-edit-reserva/new-edit-reserva.component';
import { DatePipe } from '@angular/common';
import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter, NgxMatDateFormats} from '@angular-material-components/datetime-picker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'YYYY-MM-DD HH:mm',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };

@NgModule({
    declarations: [
        EspacioFisicoComponent,
        NewEditEspacioFisicoComponent,
        RecursoTecnologicoComponent,
        NewEditRecursoTecnologicoComponent,
        ReservasComponent,
        NewEditReservaComponent
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
        FlexLayoutModule
    ],
    providers: [DatePipe,
      { provide: MAT_DATE_LOCALE, useValue: CUSTOM_DATE_FORMATS },
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },],

})
export class ComponentsModule { }
