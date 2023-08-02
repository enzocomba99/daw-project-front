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
  selector: 'app-espacio-fisico',
  templateUrl: './espacio-fisico.component.html',
  styleUrls: ['./espacio-fisico.component.scss']
})
export class EspacioFisicoComponent {
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

  async fetchItems() {
    await this.spinner.show();
    const response: PageResponse<EspacioFisico[]> | undefined = 
    await firstValueFrom(this.espaciosService.getEspaciosFisicos(
      this.currentPage,
      this.filterName,
      this.filterCapacity,
      this.sort.active,
      this.sort.direction,
    ));
    
    if (response !== undefined) {
      this.espaciosFisicoPage = response;
      this.totalElements = this.espaciosFisicoPage.totalElements;
      this.dataSource = new MatTableDataSource(response.content);
      this.dataSource.sort = this.sort;
    }
    this.spinner.hide();
  }

  async onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    await this.fetchItems();
  }

  delete(espacioFisico: EspacioFisico) {
    const dialogRef = this.openDialog('0ms', '0ms', "Eliminar espacio físico", "Está seguro que desea eliminar el espacio físico "+espacioFisico.nombre+"?")
    
    dialogRef.afterClosed().subscribe(async result => {
      if (result == "Si") {
        await this.spinner.show();
        this.espaciosService.deleteEspacioFisico(espacioFisico.id).subscribe({
          complete: () => {
            this.snackBar.open('Se ha borrado el espacio fisico correctamente.',"Cerrar");
            this.fetchItems();
            this.spinner.hide();
          },
          error: (e) => {
            this.snackBar.open(e.error.message,"Cerrar");
            console.error(e);
            this.spinner.hide();
          }
        });
      }
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string) {
    return this.dialog.open(ModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: title, message: message },
    });
  }

}
function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}

