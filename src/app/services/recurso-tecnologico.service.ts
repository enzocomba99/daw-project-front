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

  getRecursosTecnologicos(): Observable<RecursoTecnologico[]> {
    return this.http.get<RecursoTecnologico[]>('http://localhost:8080/recursos');
  }

  deleteRecursoTecnologico(id: string) {
    return this.http.delete('http://localhost:8080/recursos/'+id);
  }
}
