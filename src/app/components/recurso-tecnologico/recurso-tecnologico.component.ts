import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageResponse } from 'src/app/interfaces/page-response';
import { RecursoTecnologico } from 'src/app/interfaces/recurso-tecnologico';
import { RecursoTecnologicoService } from 'src/app/services/recurso-tecnologico.service';

@Component({
  selector: 'app-recurso-tecnologico',
  templateUrl: './recurso-tecnologico.component.html',
  styleUrls: ['./recurso-tecnologico.component.scss']
})
export class RecursoTecnologicoComponent {

  constructor(
    private recursoTecnologicoService: RecursoTecnologicoService,
    private spinner: NgxSpinnerService,
    ){}
    displayedColumns: string[] = ['name', 'description'];
    currentPage: number = 0;
    recursosTecnologicos!: PageResponse<RecursoTecnologico[]>; 
    headerColor = 'rgb(88,88,88)';

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
