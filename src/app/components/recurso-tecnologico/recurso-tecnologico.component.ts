import { Component } from '@angular/core';
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

@Component({
  selector: 'app-recurso-tecnologico',
  templateUrl: './recurso-tecnologico.component.html',
  styleUrls: ['./recurso-tecnologico.component.scss']
})
export class RecursoTecnologicoComponent {

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

    displayedColumns: string[] = ['name', 'description'];
    currentPage: number = 0;
    recursosTecnologicos!: PageResponse<RecursoTecnologico[]>; 
    headerColor = 'rgb(88,88,88)';
    filterForm: FormGroup;

    ngOnInit(){
      this.fetchItems(this.currentPage);
    }

    async fetchItems(page: number){
      await this.spinner.show();
      this.recursoTecnologicoService.getRecursosTecnologicos(page).subscribe({
        next: (recursosTecnologicos) => {
          this.recursosTecnologicos = recursosTecnologicos;
          this.spinner.hide();
        },
        error: (e) => {
          console.error(e)
          this.spinner.hide();
        }
      })
    }

    async onPageChange(event:any){
      this.currentPage = event.pageIndex;
      await this.fetchItems(this.currentPage);
    }

    delete(recursosTecnologicos: RecursoTecnologico) {
    };

}
