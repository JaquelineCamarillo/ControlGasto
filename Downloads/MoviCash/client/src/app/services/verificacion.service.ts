import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {
  private apiUrl = 'https://tu-backend.com/api/verificar-codigo'; // Cambiar la URL por la del backend

  constructor(private http: HttpClient) { }

  verificarCodigo(codigo: string): Observable<any> {
    return this.http.post(this.apiUrl, { codigo });
  }
}