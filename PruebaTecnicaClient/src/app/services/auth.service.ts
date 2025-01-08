import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    var login = { Usuario: username, Pass: password };
    return this.http.post(`${this.apiUrl}/Login/auth`, login, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
