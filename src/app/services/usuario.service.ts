import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url:string = "http://localhost:4000/api/usr";

  constructor(private http:HttpClient) { }

  login(usu:any):Observable<any>{
    return this.http.post(this.url,usu);
  }

  getUsuario(id:any){
    return this.http.post<any>(this.url+"/oui",id);
  }

  crearUsuario(usu:any){
    return this.http.post<any>(this.url+"/iu",usu);
  }

  modificarUsuario(usu:any){
    return this.http.put<any>(this.url+"/mu",usu);
  }

  modificarUsuarioSinContraseña(usu:any){
    return this.http.put<any>(this.url+"/musc",usu);
  }

  eliminarUsuario(usu:any){
    return this.http.post<any>(this.url+"/eu",usu);
  }

  listarUsuarios(){
    return this.http.get<any>(this.url+"/lu");
  }

  listarUsuariosPorRol(rol:any){
    return this.http.post<any>(this.url+"/listarRol",rol);
  }

}
