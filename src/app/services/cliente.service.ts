import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspacioFisico } from '../interfaces/espacio-fisico';
import { PageResponse } from '../interfaces/page-response';
import { Cliente } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(page: number = 0,size:number = 10, dni: string | undefined, correo:string | undefined): Observable<PageResponse<Cliente>> {
    return this.http.get<PageResponse<Cliente>>('http://localhost:8080/clients?page='+page+'&size='+size);
  }
}

