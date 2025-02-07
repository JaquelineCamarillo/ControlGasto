import { Injectable } from '@angular/core';

declare var paypal: any;  

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  constructor() {}

  loadPaypalButton(containerId: string, amount: number, callback: (comprobante: string) => void) {
    const comprobante = 'ID_TRANSACCION_PAYPAL';
    if (amount <= 0) {
      console.error('El monto debe ser mayor que cero');
      alert('El monto debe ser mayor que cero');
      return;
    }

    if (typeof paypal !== 'undefined') {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: 'MXN',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            const comprobanteGenerado = this.generateComprobante(details);
            callback(comprobanteGenerado);
          });
        },
      }).render('#' + containerId); 
    } else {
      console.error('El objeto PayPal no está cargado.');
    }
  }
    
  generateComprobante(details: any): string {
    return `Comprobante de Pago PayPal:
      ID de Transacción: ${details.id}
      Pagado por: ${details.payer.name.given_name} ${details.payer.name.surname}
      Monto: ${details.purchase_units[0].amount.value} ${details.purchase_units[0].amount.currency_code}
      Fecha: ${new Date().toISOString()}`;
  }
}
