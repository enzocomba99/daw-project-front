import { Component } from '@angular/core';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { PageResponse } from 'src/app/interfaces/page-response';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';
import {NgxSpinnerService} from "ngx-spinner";
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-espacio-fisico',
  templateUrl: './espacio-fisico.component.html',
  styleUrls: ['./espacio-fisico.component.scss']
})
export class EspacioFisicoComponent {
  constructor(private espaciosService: EspacioFisicoService,
    private spinner: NgxSpinnerService,
    public paginatorCustom: MatPaginatorIntl,
    private modalService: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 
      this.filterForm = new FormGroup({})
    }
  displayedColumns: string[] = ['name', 'description', 'capacity','actions'];
  espaciosFisicoPage!: PageResponse<EspacioFisico[]>;
  currentPage: number = 0;
  headerColor = 'rgb(88,88,88)';
  filterForm: FormGroup;

  ngOnInit() {
    this.fetchItems(this.currentPage);
  }  

  async fetchItems(page: number) {
    await this.spinner.show();
    this.espaciosService.getEspaciosFisicos(page).subscribe({
      next: (v) => {
        this.espaciosFisicoPage = v;
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e)
        this.spinner.hide();
      }
    });

  }

  async onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    await this.fetchItems(this.currentPage);
  }




  delete(espacioFisico: EspacioFisico) {
    const dialogRef = this.openDialog('0ms', '0ms', "Eliminar espacio físico", "Está seguro que desea eliminar el espacio físico "+espacioFisico.nombre+"?")
    
    dialogRef.afterClosed().subscribe(async result => {
      if (result == "Si") {
        await this.spinner.show();
        this.espaciosService.deleteEspacioFisico(espacioFisico.id).subscribe({
          complete: () => {
            this.snackBar.open('Se ha borrado el espacio fisico correctamente.',"Cerrar");
            this.fetchItems(this.currentPage);
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
