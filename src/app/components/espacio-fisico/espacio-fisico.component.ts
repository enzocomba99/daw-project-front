import { Component } from '@angular/core';
import { EspacioFisico } from 'src/app/interfaces/espacio-fisico';
import { PageResponse } from 'src/app/interfaces/page-response';
import { EspacioFisicoService } from 'src/app/services/espacio-fisico.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-espacio-fisico',
  templateUrl: './espacio-fisico.component.html',
  styleUrls: ['./espacio-fisico.component.scss']
})
export class EspacioFisicoComponent {
  constructor(private espaciosService: EspacioFisicoService, private spinner: NgxSpinnerService) { }
  displayedColumns: string[] = ['name', 'description', 'capacity'];
  espaciosFisicoPage!: PageResponse<EspacioFisico[]>;

  async ngOnInit() {
    await this.spinner.show();
    await this.fetchItems();
    await this.spinner.hide();
  }  


  async fetchItems() {
    this.espaciosService.getEspaciosFisicos().subscribe({
      next: (v) => {
        this.espaciosFisicoPage = v;
      },
      error: (e) => console.error(e)
    });
  }
}
