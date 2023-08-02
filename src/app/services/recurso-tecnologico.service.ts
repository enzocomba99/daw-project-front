import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { Injectable } from '@angular/core';
import { RecursoTecnologico } from '../interfaces/recurso-tecnologico';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class RecursoTecnologicoService {

  constructor(private http: HttpClient) { }

  getRecursosTecnologicos(page: number = 0, sort: string = 'nombre', order: SortDirection = 'asc', filter: string = '', size: string = '10'): Observable<PageResponse<RecursoTecnologico>> {
    return this.http.get<PageResponse<RecursoTecnologico>>(`http://localhost:8080/recursos?nombre=${filter}&page=${page}&size=${size}&sort=${sort},${order}`);
  }

  getRecursoTecnologicoById(recursoTecnologicoId: string): Observable<RecursoTecnologico> {
    return this.http.get<RecursoTecnologico>('http://localhost:8080/recursos/'+recursoTecnologicoId);
  }

  newRecursoTecnologico(recursoTecnologico: RecursoTecnologico): Observable<RecursoTecnologico> {
    return this.http.post<RecursoTecnologico>('http://localhost:8080/recursos', recursoTecnologico);
  }

  updateRecursoTecnologico(recursoTecnologico: RecursoTecnologico, recursoTecnologicoId: string): Observable<RecursoTecnologico> {
    return this.http.put<RecursoTecnologico>('http://localhost:8080/recursos/'+recursoTecnologicoId,recursoTecnologico);
  }

  deleteRecursoTecnologico(id: string) {
    return this.http.delete('http://localhost:8080/recursos/'+id);
  }
}

export interface MyResponse {
  message: string;
}
