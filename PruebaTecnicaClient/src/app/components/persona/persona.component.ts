import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';
import { Persona } from '../../models/persona.models';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  persona: Persona = {
    idPersona: 0,
    Nombres: '',
    Apellidos: '',
    Identificacion: '',
    Email: '',
    TipoIdentificacion: '',
    Usuario: '',
    Pass: '',
    NombreCompleto: ''
  };
  editing: boolean = false;

  constructor(private personaService: PersonaService, private router: Router) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró el token en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // O el formato que requiera tu backend
    });

    this.personaService.getPersonas(headers).subscribe({
      next: (data) => {
        this.personas = data;
      },
      error: (err) => {
        console.error('Error al obtener personas:', err);
      }
    });
  }

  // Crear una nueva persona
  createPersona(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró el token en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // O el formato que requiera tu backend
    });

    this.personaService.createPersona(this.persona, headers).subscribe({
      next: () => {
        this.getPersonas();  // Actualizar la lista de personas
        this.persona = {
          idPersona: 0,
          Nombres: '',
          Apellidos: '',
          Identificacion: '',
          Email: '',
          TipoIdentificacion: '',
          Usuario: '',
          Pass: '',
          NombreCompleto: ''
        }; // Limpiar el formulario
      },
      error: (err) => {
        console.error('Error al crear persona:', err);
      }
    });
  }

  // Editar persona
  editPersona(persona: Persona): void {
    this.persona = { ...persona };
    this.editing = true;
  }

  // Actualizar persona
  updatePersona(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró el token en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // O el formato que requiera tu backend
    });

    this.personaService.updatePersona(this.persona, headers).subscribe({
      next: () => {
        this.getPersonas(); // Actualizar la lista
        this.persona = {
          idPersona: 0,
          Nombres: '',
          Apellidos: '',
          Identificacion: '',
          Email: '',
          TipoIdentificacion: '',
          Usuario: '',
          Pass: '',
          NombreCompleto: ''
        }; // Limpiar el formulario
        this.editing = false;
      },
      error: (err) => {
        console.error('Error al actualizar persona:', err);
      }
    });
  }

  // Eliminar persona
  deletePersona(idPersona: number): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró el token en el localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // O el formato que requiera tu backend
    });
    this.personaService.deletePersona(idPersona, headers).subscribe({
      next: () => {
        this.getPersonas(); // Actualizar la lista
      },
      error: (err) => {
        console.error('Error al eliminar persona:', err);
      }
    });
  }
}
