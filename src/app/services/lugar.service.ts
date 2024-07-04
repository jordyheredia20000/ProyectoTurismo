import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarTuristicoService {
  private url: string = "http://localhost:4000/api/lug";

  constructor(private http: HttpClient) { }

  obtenerLugarTuristicoPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`, id);
  }

  modificarLugarTuristico(lugarTuristico: any): Observable<any> {
    return this.http.put(`${this.url}/modificar`, lugarTuristico);
  }

  listarLugaresTuristicosPorCategoria(idCategoria: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorCategoria`,  idCategoria );
  }

  buscarLugar(idCategoria: any): Observable<any> {
    return this.http.post(`${this.url}/buscar`,  idCategoria );
  }

  asociarCategoriaALugarTuristico(data:any): Observable<any> {
    return this.http.post(`${this.url}/asociarCategoria`, data);
  }

  desasociarCategoriaDeLugarTuristico(data:any): Observable<any> {
    return this.http.post(`${this.url}/desasociarCategoria`, data);
  }

  eliminarLugarTuristico(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`, id );
  }

  listarLugaresTuristicos(): Observable<any> {
    return this.http.get(`${this.url}/listar`);
  }

  insertarLugarTuristico(lugarTuristico: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, lugarTuristico);
  }
}
