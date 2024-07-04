import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private url: string = "http://localhost:4000/api/permiso";

  constructor(private http: HttpClient) { }

  obtenerPermisoPorID(id: any): Observable<any> {
    return this.http.post(`${this.url}/obtener`,  id );
  }

  modificarPermiso(permiso: any): Observable<any> {
    return this.http.put(`${this.url}/modificar`, permiso);
  }

  eliminarPermiso(id: any): Observable<any> {
    return this.http.post(`${this.url}/eliminar`,  id );
  }

  listarPermisos(): Observable<any> {
    return this.http.get(`${this.url}/listar`);
  }

  insertarPermiso(permiso: any): Observable<any> {
    return this.http.post(`${this.url}/insertar`, permiso);
  }

  asignarPermiso(data:any): Observable<any> {
    return this.http.post(`${this.url}/asignar`, data);
  }

  revocarPermiso(data:any): Observable<any> {
    return this.http.post(`${this.url}/revocar`, data);
  }

  listarPermisosPorRol(idRol: any): Observable<any> {
    return this.http.post(`${this.url}/listarRol`,  idRol );
  }
}
