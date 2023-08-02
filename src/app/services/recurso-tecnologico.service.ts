import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { Injectable } from '@angular/core';
import { RecursoTecnologico } from '../interfaces/recurso-tecnologico';

@Injectable({
  providedIn: 'root'
})
export class RecursoTecnologicoService {

  constructor(private http: HttpClient) { }

  getRecursosTecnologicos(page: number): Observable<PageResponse<RecursoTecnologico[]>> {
    return this.http.get<PageResponse<RecursoTecnologico[]>>(`http://localhost:8080/recursos?page=${page}&size=20`);
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
