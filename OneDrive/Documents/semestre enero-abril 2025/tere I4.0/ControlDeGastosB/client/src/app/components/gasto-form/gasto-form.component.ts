import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Gasto } from '../../models/Gasto';
import { GastosService } from '../../services/gastos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { EmailService } from '../../services/email.service';
import { PaypalService } from '../../services/paypal.service';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css']
})
export class GastoFormComponent implements OnInit, OnChanges {

  gasto: Gasto = {
    Descripcion: '',
    Categoria: '',
    Monto: '',
    FechaTransaccion: '',
    MetodoPago: '',
    Comprobante: ''
  };

  isEditMode = false;
  gastoId: string | null = '';
  errorMessages: { [key: string]: string } = {};
  idUsuario: string | null = null;
  emailUsuario: string | null = null;

  constructor(
    private gastosService: GastosService,
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private paypalService: PaypalService
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.idUsuario = localStorage.getItem('IdUsuario');
      this.emailUsuario = localStorage.getItem('EmailUsuario');
    } else {
      console.log("localStorage no está disponible.");
    }

    this.gastoId = this.route.snapshot.paramMap.get('id');
    this.gasto.FechaTransaccion = new Date().toISOString().split('T')[0];
    if (this.gastoId) {
      this.isEditMode = true;
      this.gastosService.getGasto(this.gastoId, this.idUsuario).subscribe(
        (gasto: Gasto) => {
          this.gasto = gasto;
        },
        err => console.log(err)
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gasto.MetodoPago === 'PayPal') {
      this.paypalService.loadPaypalButton('paypal-button-container', Number(this.gasto.Monto), (comprobante: string) => {
        this.gasto.Comprobante = comprobante;
      });
    }
  }

  validateForm(): boolean {
    this.errorMessages = {};

    if (!this.gasto.Descripcion) {
      this.errorMessages['Descripcion'] = 'Agregue una descripción*';
    }
    if (!this.gasto.Categoria) {
      this.errorMessages['Categoria'] = 'Seleccione una categoría*';
    }
    if (!this.gasto.Monto || isNaN(Number(this.gasto.Monto)) || Number(this.gasto.Monto) <= 0) {
      this.errorMessages['Monto'] = 'Ingrese un monto válido (debe ser un número positivo)*';
    }
    if (!this.gasto.FechaTransaccion) {
      this.errorMessages['FechaTransaccion'] = 'Seleccione una fecha de transacción*';
    }
    if (!this.gasto.MetodoPago) {
      this.errorMessages['MetodoPago'] = 'Seleccione un método de pago*';
    }

    return Object.keys(this.errorMessages).length === 0;
  }

  saveGasto() {
    if (this.gasto.MetodoPago === 'PayPal' && !this.gasto.Comprobante) {
      this.errorMessages['Comprobante'] = 'Debe adjuntar un comprobante para PayPal*';
      return;
    }

    if (this.validateForm()) {
      console.log('IdUsuario:', this.idUsuario);
      console.log('Gasto:', this.gasto);
      const monto = Number(this.gasto.Monto);

      if (isNaN(monto) || monto <= 0) {
        this.errorMessages['Monto'] = 'Ingrese un monto válido (debe ser un número positivo)*';
        return;
      }

      this.gasto.Monto = monto.toString();

      const subject = this.isEditMode ? 'Gasto Actualizado' : 'Nuevo Gasto Registrado';
      const body = `Se ha ${this.isEditMode ? 'actualizado' : 'registrado'} un gasto:\n
        Descripción: ${this.gasto.Descripcion}\n
        Categoría: ${this.gasto.Categoria}\n
        Monto: ${this.gasto.Monto}\n
        Fecha: ${this.gasto.FechaTransaccion}\n
        Método de Pago: ${this.gasto.MetodoPago}\n
        Comprobante: ${this.gasto.Comprobante}`;

      if (this.isEditMode && this.gastoId) {
        this.gastosService.updateGasto(this.gastoId, this.idUsuario, this.gasto).subscribe(
          res => {
            console.log(res);
            this.notificationService.showNotification('Gasto actualizado correctamente');
            this.sendEmailNotification(subject, body);
            this.router.navigate(['/gastos/list']);
          },
          err => {
            console.log(err);
            this.notificationService.showNotification('Error al actualizar el gasto');
          }
        );
      } else {
        this.gastosService.saveGastos(this.idUsuario, this.gasto).subscribe(
          res => {
            console.log(res);
            this.notificationService.showNotification('Gasto guardado correctamente');
            this.sendEmailNotification(subject, body);
            this.router.navigate(['/gastos/list']);
          },
          err => {
            console.log(err);
            this.notificationService.showNotification('Error al guardar el gasto');
          }
        );
      }
    }
  }

  private sendEmailNotification(subject: string, body: string) {
    if (this.emailUsuario) {
      this.emailService.sendEmail(this.emailUsuario, subject, body).subscribe(
        res => {
          console.log('Email sent successfully:', res);
        },
        err => {
          console.log('Error sending email:', err);
        }
      );
    } else {
      console.log('No se encontró el correo electrónico del usuario.');
    }
  }

  payWithPaypal() {
    console.log('LLAMANDO A PAYPAL');
    this.paypalService.loadPaypalButton('paypal-button-container', Number(this.gasto.Monto), (comprobante: string) => {
      this.gasto.Comprobante = comprobante;
    });
  }

}
