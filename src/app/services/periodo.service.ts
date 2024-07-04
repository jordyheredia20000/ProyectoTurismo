import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private url: string = "http://localhost:4000/api/periodo";

  constructor(private http: HttpClient) { }

  obtenerPeriodoPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,  id );
  }

  actualizarPeriodo(periodo: any): Observable<any> {
    return this.http.put(`${this.url}/actualizar`, periodo);
  }

  eliminarPeriodoPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,  id );
  }

  listarPeriodos(): Observable<any> {
    return this.http.get(`${this.url}/listar`);
  }

  insertarPeriodo(periodo: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, periodo);
  }
}
