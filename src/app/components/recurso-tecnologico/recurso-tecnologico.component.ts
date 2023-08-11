import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageResponse } from 'src/app/interfaces/page-response';
import { RecursoTecnologico } from 'src/app/interfaces/recurso-tecnologico';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';
import { FormGroup } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-recurso-tecnologico',
  templateUrl: './recurso-tecnologico.component.html',
  styleUrls: ['./recurso-tecnologico.component.scss']
})
export class RecursoTecnologicoComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  constructor(
    private recursoTecnologicoService: RecursoTecnologicoService,
    private spinner: NgxSpinnerService,
    public paginatorCustom: MatPaginatorIntl,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ){
      this.filterForm = new FormGroup({})
    }

    displayedColumns: string[] = ['nombre', 'descripcion', 'actions'];
    currentPage: number = 0;
    recursosTecnologicos!: PageResponse<RecursoTecnologico>; 
    headerColor = 'rgb(88,88,88)';
    filterForm: FormGroup;
    filterName: string = '';
    dataSource!: MatTableDataSource<any>;
    totalElements: number = 0;

    ngOnInit(){
      this.fetchItems();
    }

    sortData() {
      this.fetchItems();
    }

    async fetchItems(){
      await this.spinner.show();
      try{
        const response: PageResponse<RecursoTecnologico> | undefined = 
        await firstValueFrom(this.recursoTecnologicoService.getRecursosTecnologicos(
          this.currentPage, 
          this.sort.active,
          this.sort.direction,
          this.filterName,
        ));
        if (response !== undefined) {
          this.recursosTecnologicos = response;
          this.totalElements = this.recursosTecnologicos.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
          this.dataSource.sort = this.sort;
        }

      }catch(error){
        this.snackBar.open("Error en el backend","Cerrar");
        this.spinner.hide();
      }
      this.spinner.hide();
    }

    async onPageChange(event:any){
      this.currentPage = event.pageIndex;
      await this.fetchItems();
    }

    delete(recursoTecnologico: RecursoTecnologico) {
      const dialogRef = this.openDialog('0ms', '0ms', "Eliminar  recurso tecnologico", "Está seguro que desea eliminar el  recurso tecnologico "+recursoTecnologico.nombre+"?")
    
      dialogRef.afterClosed().subscribe(async result => {
        if (result == "Si") {
          await this.spinner.show();
          this.recursoTecnologicoService.deleteRecursoTecnologico(recursoTecnologico.id).subscribe({
            complete: () => {
              this.snackBar.open('Se ha borrado el recurso tecnologico correctamente.',"Cerrar");
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
