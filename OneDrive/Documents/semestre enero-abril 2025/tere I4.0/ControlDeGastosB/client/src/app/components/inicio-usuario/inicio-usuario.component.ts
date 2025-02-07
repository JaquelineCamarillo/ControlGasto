import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PresupuestosService } from '../../services/presupuestos.service';
import { Router } from '@angular/router';
import { FacebookService } from '../../services/facebook.service';
import { Renderer2 } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {
  presupuestos: any = [];
  idUsuario: string | null = null;
  isChatbotLoaded: boolean = false;
  newsArticles = [];
  
  stockData: any;  // Para almacenar los datos de la acción
  error: string | null = null;    

  constructor(
    private presupuestosService: PresupuestosService,
    private router: Router,
    private facebookService: FacebookService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private newsService: NewsService,
    
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.idUsuario = localStorage.getItem('IdUsuario');
      
      // Si el usuario no está autenticado, intentar autenticarse con Facebook
      if (!this.idUsuario) {
        this.facebookService.loginu()
          .then((authResponse) => {
            // Guarda el ID de usuario de Facebook en localStorage
            this.idUsuario = authResponse.userID;
            localStorage.setItem('IdUsuario', this.idUsuario);
            this.loadPresupuestos();
          })
          .catch(error => {
            console.error('Usuario no autenticado con Facebook:', error);
            this.router.navigate(['/login']);
          });
      } else {
        this.loadPresupuestos();
      }
      this.loadFinancialNews();
    } else {
      console.warn('No se puede acceder a localStorage en el lado del servidor.');
      this.router.navigate(['/login']);
    }
  }

  loadPresupuestos() {
    if (this.idUsuario) {
      this.presupuestosService.getPresupuestos(this.idUsuario).subscribe(
        (resp: any) => {
          this.presupuestos = resp;
        },
        err => console.log(err)
      );
    }
  }

  loadFinancialNews() {
    this.newsService.getFinancialNews().subscribe(
      (data) => {
        this.newsArticles = data.articles.slice(0,10);
      },
      (error) => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }
  

  loadCliengoChatbot() {
    if (!this.isChatbotLoaded && isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.src =  'https://s.cliengo.com/weboptimizer/67a55d84b6e5416db2c0aeef/67a55d84b6e5416db2c0aef2.js?platform=onboarding_modular',
      script.async = true;
      this.renderer.appendChild(document.body, script);
      this.isChatbotLoaded = true;  // Evita cargar el script nuevamente
    }
  }
}

/*<
!-- Código de instalación Cliengo para Monedero Inteligente -->
<script type="text/javascript">
  (function () {
    var ldk = document.createElement('script');
    ldk.type = 'text/javascript';
    ldk.async = true;
    ldk.src = 'https://s.cliengo.com/weboptimizer/67a55d84b6e5416db2c0aeef/67a55d84b6e5416db2c0aef2.js?platform=onboarding_modular';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ldk, s);
  })();
</script>
*/