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

  getReservas(filtroNombre: string = '', filtroEspacio: string = '', page: string = '0', size: string = '20'): Observable<PageResponse<Reserva>> {
    console.log(`http://localhost:8080/reservas?cliente=${filtroNombre}&espacio=${filtroEspacio}&page=${page}&size=${size}`)
    return this.http.get<PageResponse<Reserva>>(`http://localhost:8080/reservas?cliente=${filtroNombre}&espacio=${filtroEspacio}&page=${page}&size=${size}`);
  }

  newReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>('http://localhost:8080/reservas', reserva);
  }
}

