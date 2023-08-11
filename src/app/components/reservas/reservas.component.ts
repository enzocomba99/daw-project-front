import { Component, ViewChild } from '@angular/core';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { PageResponse } from 'src/app/interfaces/page-response';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';
import {NgxSpinnerService} from "ngx-spinner";
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, firstValueFrom, map, merge, startWith, switchMap } from 'rxjs';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
      private espaciosService: EspacioFisicoService,
      private spinner: NgxSpinnerService,
      public paginatorCustom: MatPaginatorIntl,
      private modalService: NgbModal,
      private router: Router,
      private snackBar: MatSnackBar,
      public dialog: MatDialog
    ) { 
      
    }
  displayedColumns: string[] = ['nombre', 'descripcion', 'capacidad','recursos','actions'];
  espaciosFisicoPage!: PageResponse<EspacioFisico[]>;
  currentPage: number = 0;
  headerColor = 'rgb(88,88,88)';
  filterName: string = '';
  filterCapacity: any = null;
  dataSource!: MatTableDataSource<any>;
  totalElements: number = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  ngOnInit() {
     this.fetchItems();
  }  
  sortData() {
    this.fetchItems();
  }

  async fetchItems() {}

}

