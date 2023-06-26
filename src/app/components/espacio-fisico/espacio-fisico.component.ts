import { Component } from '@angular/core';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';

@Component({
  selector: 'app-espacio-fisico',
  templateUrl: './espacio-fisico.component.html',
  styleUrls: ['./espacio-fisico.component.scss']
})
export class EspacioFisicoComponent {
  constructor(private espaciosService: EspacioFisicoService) { }
  displayedColumns: string[] = ['name', 'description', 'capacity'];
  dataSource: EspacioFisico[]= [];
  totalItems: number = 0;
  pageSize: number = 10;

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems(): void {
    this.espaciosService.getItems().subscribe(
      response => {
        // Handle the response data
        response.forEach((espacioFisico) => {
          this.dataSource.push(espacioFisico)
        });
        
        console.log(this.dataSource);
        //this.dataSource = response.currentPageData;
        //this.totalItems = response.totalCount;
      },
      error => {
        // Handle errors
        console.error(error);
      }
    );
  }
}
