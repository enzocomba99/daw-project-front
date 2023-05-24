import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
