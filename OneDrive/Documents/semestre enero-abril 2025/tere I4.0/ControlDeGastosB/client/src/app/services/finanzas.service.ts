// En src/app/services/finanzas.service.ts
/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  private apiKey = 'csp3ogpr01qnvmpuo4vgcsp3ogpr01qnvmpuo500';  // Reemplaza con tu clave de API de Finnhub
  private apiUrl = 'https://finnhub.io/api/v1';

  constructor(private http: HttpClient) {}

  // Método para obtener cotizaciones de una acción
  getStockQuote(symbol: string): Observable<any> {
    const url = `${this.apiUrl}/quote?symbol=${symbol}&token=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}*/
// finanzas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  private apiKey = 'csp3ogpr01qnvmpuo4vgcsp3ogpr01qnvmpuo500';
  private apiUrl = 'https://finnhub.io/api/v1';

  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quote?symbol=${symbol}&token=${this.apiKey}`);
  }
}
