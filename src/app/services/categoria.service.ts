import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = "http://localhost:4000/api/cat";

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  obtenerCategoriaPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/oc`, id );
  }

  modificarCategoria(categoria: any): Observable<any> {
    return this.http.put(`${this.url}/mc`, categoria);
  }

  eliminarCategoriaPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/ec`,  id);
  }

  listarCategoriasLugar(idLugarTuristico: any): Observable<any> {
    return this.http.post(`${this.url}/lcl`, idLugarTuristico);
  }

  insertarCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.url}/ic`, categoria);
  }
}
