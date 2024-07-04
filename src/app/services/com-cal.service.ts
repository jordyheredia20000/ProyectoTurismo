import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioCalificacionService {
  private url: string = "http://localhost:4000/api/comCal";

  constructor(private http: HttpClient) { }

  obtenerComentarioCalificacionPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,  id );
  }

  actualizarComentarioCalificacion(comcal: any): Observable<any> {
    return this.http.put(`${this.url}/actualizar`, comcal);
  }

  eliminarComentarioCalificacionPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`, id );
  }
  eliminarComentarioCalificacionPorIDLugar(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminarPorLugar`, id );
  }

  listarComentariosCalificacionesPorLugar(idLugarTuristico: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorLugar`,  idLugarTuristico );
  }

  listarComentariosCalificacionesPorUsuario(idUsuario: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorUsuario`,  idUsuario );
  }

  insertarComentarioCalificacion(comcal: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, comcal);
  }
}
