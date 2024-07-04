import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private url: string = "http://localhost:4000/api/fav";

  constructor(private http: HttpClient) { }

  obtenerFavoritoPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,  id );
  }

  crearFavorito(favorito: any): Observable<any> {
    return this.http.post(`${this.url}/crear`, favorito);
  }

  eliminarFavoritoPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,  id );
  }

  eliminarFavoritoPorIDLugar(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminarPorLugar`,  id );
  }

  listarFavoritosPorUsuario(idUsuario: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorUsusario`, idUsuario );
  }
}
