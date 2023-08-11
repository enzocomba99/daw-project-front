import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspacioFisico } from '../interfaces/espacio-fisico';
import { PageResponse } from '../interfaces/page-response';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class EspacioFisicoService {

  constructor(private http: HttpClient) { }

  getEspaciosFisicos(page: number = 0,size:number = 10, name: string | undefined, capacity: number | undefined, sort: string, order: SortDirection): Observable<PageResponse<EspacioFisico>> {
    let filters = '';
    if(name){
      filters = '&nombre='+name;
    }
    if(capacity && capacity>=0){
      filters = filters + '&capacidad='+capacity;
    }
    return this.http.get<PageResponse<EspacioFisico>>('http://localhost:8080/espacios?page='+page+'&size='+size+filters+'&sort='+sort+'&order='+order);
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
  updateEspacioFisico(espacioFisico: EspacioFisico, espacioFisicoId: string): Observable<EspacioFisico> {
    return this.http.put<EspacioFisico>('http://localhost:8080/espacios/'+espacioFisicoId,espacioFisico);
  }
}