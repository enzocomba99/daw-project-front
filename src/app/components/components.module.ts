import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EspacioFisicoComponent } from './espacio-fisico/espacio-fisico.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
       HomeComponent,
       EspacioFisicoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
