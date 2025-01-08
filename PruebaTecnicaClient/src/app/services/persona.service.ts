import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener todas las personas
  getPersonas(headers: HttpHeaders): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/Personas/read`, { headers });
  }

  // Crear una nueva persona
  createPersona(persona: Persona, headers: HttpHeaders): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/Personas/create`, persona, { headers });
  }

  // Actualizar una persona
  updatePersona(persona: Persona, headers: HttpHeaders): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/Personas/update`, persona, { headers });
  }

  // Eliminar una persona
  deletePersona(idPersona: number, headers: HttpHeaders): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Personas/delete/${idPersona}`, { headers });
  }
}
