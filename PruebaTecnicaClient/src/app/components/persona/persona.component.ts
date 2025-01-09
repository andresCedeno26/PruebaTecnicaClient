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
  showModal: boolean = false;
  errorMessage: string = '';

  constructor(private personaService: PersonaService, private router: Router) { }

  openForm(persona: any = null) {
    this.persona = persona ? { ...persona } : {};
    this.editing = !!persona;
    this.showModal = true;
  }

  closeForm() {
    this.errorMessage = ''
    this.showModal = false;
  }

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
      Authorization: `Bearer ${token}` 
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
      Authorization: `Bearer ${token}` 
    });

    this.personaService.createPersona(this.persona, headers).subscribe({
      next: () => {
        this.getPersonas(); 
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
        }; 
        this.closeForm();
      },
      error: (err) => {
        this.errorMessage = err;
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
      Authorization: `Bearer ${token}` 
    });

    this.personaService.updatePersona(this.persona, headers).subscribe({
      next: () => {
        this.getPersonas(); 
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
        }; 
        this.editing = false;
        this.closeForm();
      },
      error: (err) => {
        this.errorMessage = err.error.message;

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
      Authorization: `Bearer ${token}` 
    });
    this.personaService.deletePersona(idPersona, headers).subscribe({
      next: () => {
        this.getPersonas(); 
      },
      error: (err) => {
        console.error('Error al eliminar persona:', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
