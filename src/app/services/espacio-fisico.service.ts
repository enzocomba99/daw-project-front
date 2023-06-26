import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspacioFisico } from '../interfaces/espacio-fisico';
import { PageResponse } from '../interfaces/page-response';

@Injectable({
  providedIn: 'root'
})
export class EspacioFisicoService {

  constructor(private http: HttpClient) { }

  getEspaciosFisicos(): Observable<PageResponse<EspacioFisico[]>> {
    return this.http.get<PageResponse<EspacioFisico[]>>('http://localhost:8080/espacios?page=0&size=10');
  }
}
