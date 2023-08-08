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

})
export class ComponentsModule { }
