import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
