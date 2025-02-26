import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-login',
  templateUrl: './pantalla-login.component.html',
  styleUrl: './pantalla-login.component.css'
})
export class PantallaLoginComponent {

  constructor() {}

  ngOnInit(): void{
    //Este codigo ahora solo se ejecutara en el navegador
    if (typeof window !='undefined'){
      //inicialización, si es necesario
    }
  }
  ngAfterViewInit(): void { 
    //Asegurarse de que solo se ejecute en el navegador
    if (typeof window !='undefined') {
      setTimeout(() => {
        const animationContainer = document.querySelector('.animationContainer') as HTMLElement;
        const pantallaFondo = document.querySelector('.PantallaFondo') as HTMLElement;
        const loginContainer = document.querySelector('.contenedorLogin') as HTMLElement;

        if (animationContainer) {
          animationContainer.style.display = 'none';
        }
        if (pantallaFondo) {
          pantallaFondo.style.opacity = '1';
          pantallaFondo.style.visibility = 'visible';
        }
        if (loginContainer) { 
          loginContainer.style.opacity = '1';
          loginContainer.style.visibility = 'visible';
        }
      },5000);
    }
  }
}
