import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspacioFisico } from '../interfaces/espacio-fisico';

@Injectable({
  providedIn: 'root'
})
export class EspacioFisicoService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<EspacioFisico[]> {
    return this.http.get<any>('http://localhost:8080/espacios');
  }
}
