import { Component } from '@angular/core';
import { VerificacionService } from '../../services/verificacion.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent {
  codigoVerificacion: string = '';

  constructor(private verificacionService: VerificacionService) { } // Inyecta el servicio

  verificarCodigo() {
    if (this.codigoVerificacion.length === 6) {
      this.verificacionService.verificarCodigo(this.codigoVerificacion).subscribe(
        (response) => {
          alert('Código verificado correctamente');
          // Aquí puedes redirigir al usuario o realizar otras acciones
        },
        (error) => {
          alert('Error al verificar el código');
        }
      );
    } else {
      alert('El código debe tener 6 dígitos');
    }
  }
}