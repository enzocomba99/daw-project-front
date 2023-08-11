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
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/interfaces/reserva';


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
      private reservaService: ReservaService,
      private spinner: NgxSpinnerService,
      public paginatorCustom: MatPaginatorIntl,
      private modalService: NgbModal,
      private router: Router,
      private snackBar: MatSnackBar,
      public dialog: MatDialog
    ) { 
      
    }
  displayedColumns: string[] = ['fechaCreacion', 'fechaDesde', 'fechaHasta', 'estado', 'espacioFisico', 'cliente', 'actions'];
  reservas!: PageResponse<Reserva>;
  currentPage: number = 0;
  headerColor = 'rgb(88,88,88)';
  filterName: string = '';
  filterEspacio: string = '';
  size: string = '20';
  page: string = '0';
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

  async onPageChange(event:any){
    console.log('Cambio de pag')
    // this.currentPage = event.pageIndex;
    // await this.fetchItems(this.currentPage);
  }


  async fetchItems() {
    await this.spinner.show();
    this.reservaService.getReservas(this.filterName, this.filterEspacio, this.page, this.size)
      .subscribe({
        next: (reservas: PageResponse<Reserva>) => {
          console.log(reservas)
          this.reservas = reservas;
          this.totalElements = this.reservas.totalElements;
          this.dataSource = new MatTableDataSource(reservas.content);
          this.dataSource.sort = this.sort;
          this.spinner.hide()
        },
        error: (e: any) => {
          console.log(e)
          this.spinner.hide()
        }
      })
  }

  delete(reserva: Reserva) {
    const dialogRef = this.openDialog('0ms', '0ms', "Eliminar reserva", "Está seguro que desea eliminar la reserva?")
  
    dialogRef.afterClosed().subscribe(async result => {
      if (result == "Si") {
        await this.spinner.show();
        this.reservaService.deleteReserva(reserva.id).subscribe({
          complete: () => {
            this.snackBar.open('Se ha borrado la reserva correctamente.',"Cerrar");
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
  };

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string) {
    return this.dialog.open(ModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: title, message: message },
    });
  }
}

