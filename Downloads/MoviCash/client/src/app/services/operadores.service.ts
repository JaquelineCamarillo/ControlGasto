import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Operador {
  _id: string;
  RFC: string;
  NombrePersonal: string;
  ApPaterno: string;
  ApMaterno: string;
  Sexo: string;
  FechaNacimiento: Date;
  CorreoElectronico: string;
  Password: string;
  Rol: string;
  FechaCreacion: Date;
  Direccion: {
    NumeroInterior: string;
    NumeroExterior: string;
    Calle: string;
    Colonia: string;
    Ciudad: string;
  };
  Telefono: { Lada: string; Numero: string }[];
  Estado: string;
  TokenVerificacion: string;
  EstadoVerificacion: boolean;
  FechaUltimaModificacion: Date;
}

@Injectable({
  providedIn: 'root',
})
export class OperadoresService {
  private apiUrl = 'http://localhost:5000/api/operadores';

  constructor(private http: HttpClient) {}

  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.apiUrl);
  }

  crearOperador(operador: Operador): Observable<Operador> {
    return this.http.post<Operador>(this.apiUrl, operador);
  }

  actualizarOperador(id: string, operador: Operador): Observable<Operador> {
    return this.http.put<Operador>(`${this.apiUrl}/${id}`, operador);
  }

  eliminarOperador(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarOperadores(termino: string): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this.apiUrl}/buscar?q=${termino}`);
  }
}