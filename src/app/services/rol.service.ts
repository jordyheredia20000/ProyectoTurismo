import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url: string = "http://localhost:4000/api/rol";

  constructor(private http: HttpClient) { }

  obtenerRolPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,  id );
  }

  modificarRol(rol: any): Observable<any> {
    return this.http.put(`${this.url}/modificar`, rol);
  }

  eliminarRol(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,  id );
  }

  listarRoles(): Observable<any> {
    return this.http.get(`${this.url}/listar`);
  }

  listarUltimoRol(): Observable<any> {
    return this.http.get(`${this.url}/listarUltimo`);
  }

  insertarRol(rol: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, rol);
  }

  listarRolesPorPermiso(idPermiso: any): Observable<any> {
    return this.http.post(`${this.url}/listarPorPermiso`,  idPermiso );
  }
}
