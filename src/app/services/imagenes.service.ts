import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private url: string = "http://localhost:4000/api/img";

  constructor(private http: HttpClient) { }

  obtenerImagenPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,  id );
  }

  actualizarImagen(imagen: any): Observable<any> {
    return this.http.put(`${this.url}/actualizar`, imagen);
  }

  eliminarImagenPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,  id );
  }

  listarImagenesPorLugar(idLugarTuristico: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorLugar`,  idLugarTuristico );
  }

  insertarImagen(imagen: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, imagen);
  }
}
