import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private url: string = "http://localhost:4000/api/tarifa";

  constructor(private http: HttpClient) { }

  obtenerTarifaPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,id);
  }

  actualizarTarifa(tarifa: any): Observable<any> {
    return this.http.put(`${this.url}/actualizar`, tarifa);
  }

  eliminarTarifaPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,id);
  }

  listarTarifasPorLugar(idLugar: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorLugar`,idLugar);
  }
  listarTarifasPorPeriodo(idLugar: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorPeriodo`,idLugar);
  }

  insertarTarifa(tarifa: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, tarifa);
  }
}
