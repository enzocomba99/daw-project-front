import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { Injectable } from '@angular/core';
import { RecursoTecnologico } from '../interfaces/recurso-tecnologico';

@Injectable({
  providedIn: 'root'
})
export class RecursoTecnologicoService {

  constructor(private http: HttpClient) { }

  getRecursosTecnologicos(): Observable<PageResponse<RecursoTecnologico>> {
    let params = new HttpParams();
    params = params.append('page', 0);
    params = params.append('size', 200);
    return this.http.get<PageResponse<RecursoTecnologico>>('http://localhost:8080/recursos', { params });
  }

  deleteRecursoTecnologico(id: string) {
    return this.http.delete('http://localhost:8080/recursos/'+id);
  }
}
