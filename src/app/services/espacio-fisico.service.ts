import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspacioFisico } from '../interfaces/espacio-fisico';
import { PageResponse } from '../interfaces/page-response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspacioFisicoService {

  constructor(private http: HttpClient) { }

  getEspaciosFisicos(page: number): Observable<PageResponse<EspacioFisico[]>> {
    return this.http.get<PageResponse<EspacioFisico[]>>('http://localhost:8080/espacios?page='+page+'&size=10');
  }

  getEspacioFisicoById(id: string): Observable<EspacioFisico> {
    return this.http.get<EspacioFisico>('http://localhost:8080/espacios/'+id);
  }

  deleteEspacioFisico(id: string) {
    return this.http.delete('http://localhost:8080/espacios/'+id);
  }

  newEspacioFisico(espacioFisico: EspacioFisico): Observable<EspacioFisico> {
    return this.http.post<EspacioFisico>('http://localhost:8080/espacios',espacioFisico);
  }
}
