import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';  
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorService } from '../services/paginator.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatListModule, 
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorService}],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
