import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EspacioFisicoComponent } from './espacio-fisico/espacio-fisico.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
       HomeComponent,
       EspacioFisicoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
