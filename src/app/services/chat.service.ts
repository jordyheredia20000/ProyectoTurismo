import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string = "http://localhost:4000/api/chat";

  constructor(private http: HttpClient) { }

  chatear(mensaje:any): Observable<any> {
    return this.http.post(`${this.url}/enviar`, mensaje );
  }

}
