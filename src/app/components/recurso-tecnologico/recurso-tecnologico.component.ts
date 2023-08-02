import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageResponse } from 'src/app/interfaces/page-response';
import { RecursoTecnologico } from 'src/app/interfaces/recurso-tecnologico';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';
import { FormGroup } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import {MatSort, Sort} from '@angular/material/sort';

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
    private modalService: NgbModal,
    private router: Router,
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

    ngOnInit(){
      this.fetchItems(this.currentPage);
    }

    sortData() {
      this.fetchItems(this.currentPage);
    }

    async fetchItems(page: number){
      await this.spinner.show();
      this.recursoTecnologicoService.getRecursosTecnologicos(
          page, 
          this.sort?.active,
          this.sort?.direction,
          this.filterName,
        ).subscribe({
        next: (recursosTecnologicos: PageResponse<RecursoTecnologico>) => {
          this.recursosTecnologicos = recursosTecnologicos;
          this.spinner.hide();
        },
        error: (e: any) => {
          console.error(e)
          this.spinner.hide();
        }
      })
    }

    async onPageChange(event:any){
      this.currentPage = event.pageIndex;
      await this.fetchItems(this.currentPage);
    }

    delete(recursoTecnologico: RecursoTecnologico) {
      const dialogRef = this.openDialog('0ms', '0ms', "Eliminar  recurso tecnologico", "Está seguro que desea eliminar el  recurso tecnologico "+recursoTecnologico.nombre+"?")
    
      dialogRef.afterClosed().subscribe(async result => {
        if (result == "Si") {
          await this.spinner.show();
          this.recursoTecnologicoService.deleteRecursoTecnologico(recursoTecnologico.id).subscribe({
            complete: () => {
              this.snackBar.open('Se ha borrado el recurso tecnologico correctamente.',"Cerrar");
              this.fetchItems(0);
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
