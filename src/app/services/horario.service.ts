import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private url: string = "http://localhost:4000/api/hor";

  constructor(private http: HttpClient) { }

  obtenerHorarioPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`, id );
  }

  actualizarHorario(horario: any): Observable<any> {
    return this.http.put(`${this.url}/actualizar`, horario);
  }

  eliminarHorarioPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,  id );
  }

  listarHorariosPorLugar(idLugarTuristico: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorLugar`,  idLugarTuristico);
  }

  obtenerUltimo(): Observable<any> {
    return this.http.post(`${this.url}/obtenerUltimo`,{});
  }

  insertarHorario(horario: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, horario);
  }
}
