/*import { Component } from '@angular/core';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})
export class FinanzasComponent {
  simboloBusqueda: string = ''; // Variable para el símbolo de búsqueda
  stockData: any=null;
  error: string | null = null;

  constructor(private finanzasService: FinanzasService) {}

  buscar() {
    if (this.simboloBusqueda) {
      this.finanzasService.getStockQuote(this.simboloBusqueda).subscribe(
        data => {
          this.stockData = data;
          this.error = null; // Resetea el mensaje de error si la búsqueda es exitosa
        },
        error => {
          this.error = 'Error al obtener datos de la acción. Intente con otro símbolo.';
          this.stockData = null;
        }
      );
    }
  }
}
*/
//finanzas.component.ts
import { Component } from '@angular/core';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})
export class FinanzasComponent {
  simboloBusqueda: string = '';  // Variable para el símbolo de búsqueda
  stockData: any = null;         // Datos de la acción obtenidos
  error: string | null = null;   // Mensaje de error, si existe
  isLoading: boolean = false;    // Indicador de carga

  constructor(private finanzasService: FinanzasService) {}

  buscar() {
    if (this.simboloBusqueda.trim()) {  // Verifica que el símbolo no esté vacío o solo contenga espacios
      this.isLoading = true;            // Activa el indicador de carga
      this.finanzasService.getStockQuote(this.simboloBusqueda).subscribe(
        data => {
          this.stockData = data;
          this.error = null;            // Resetea el mensaje de error si la búsqueda es exitosa
          this.isLoading = false;       // Desactiva el indicador de carga
        },
        error => {
          this.error = 'Error al obtener datos de la acción. Intente con otro símbolo.';
          this.stockData = null;
          this.isLoading = false;       // Desactiva el indicador de carga
        }
      );
    } else {
      this.error = 'Por favor, ingrese un símbolo de acción válido.';  // Mensaje si el campo está vacío
      this.stockData = null;
    }
  }
}
