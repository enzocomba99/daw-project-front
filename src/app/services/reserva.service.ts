import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page-response';
import { Injectable } from '@angular/core';
import { RecursoTecnologico } from '../interfaces/recurso-tecnologico';
import { SortDirection } from '@angular/material/sort';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

 /*  getReservas(page: number = 0, sort: string = 'nombre', order: SortDirection = 'asc', filter: string = '', size: string = '10'): Observable<PageResponse<RecursoTecnologico>> {
    return this.http.get<PageResponse<RecursoTecnologico>>(`http://localhost:8080/reservas?nombre=${filter}&page=${page}&size=${size}&sort=${sort},${order}`);
  } */

  getReservaById(id: string): Observable<Reserva> {
    return this.http.get<Reserva>('http://localhost:8080/reservas/'+id);
  }

  newReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>('http://localhost:8080/reservas', reserva);
  }

  editReserva(id:string, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>('http://localhost:8080/reservas/'+id, reserva);
  }
}

