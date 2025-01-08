import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit() {
    // Lógica de redirección
    if (this.authService.isLoggedIn()) {
      // Si el usuario está autenticado, redirige a la página principal
      this.router.navigate(['/personas']);
    } else {
      // Si el usuario no está autenticado, redirige al login
      this.router.navigate(['/login']);
    }
  }

  title = 'PruebaTecnicaClient';
}
