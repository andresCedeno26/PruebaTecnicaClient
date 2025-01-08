import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        const token = response.jwt;
        localStorage.setItem('token', token);
        this.router.navigate(['/personas']);
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      },
    });
  }
}
