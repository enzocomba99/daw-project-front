import { Component, ViewChild } from '@angular/core';
import { PageResponse } from 'src/app/interfaces/page-response';
import {NgxSpinnerService} from "ngx-spinner";
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { firstValueFrom } from 'rxjs';


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
  size: number = 10;
  dataSource!: MatTableDataSource<any>;
  totalElements: number = 0;

  ngOnInit() {
    this.fetchItems();
  }  
  
  sortData() {
    this.fetchItems();
  }

  async onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    await this.fetchItems();
  }

  async fetchItems() {
    await this.spinner.show();
    try{
      const response: PageResponse<Reserva> | undefined = 
      await firstValueFrom(this.reservaService.getReservas(
        this.filterName,
        this.filterEspacio,
        this.currentPage,
        this.size,
        this.sort.active,
        this.sort.direction,
      ));
    
      if (response !== undefined) {
        this.reservas = response;
        this.totalElements = this.reservas.totalElements;
        this.dataSource = new MatTableDataSource(response.content);
        this.dataSource.sort = this.sort;
      }
    }catch(error){
      this.snackBar.open("Error en el backend","Cerrar");
      this.spinner.hide();
    }
    this.spinner.hide();
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

