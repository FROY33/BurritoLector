import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { RegisterInterface } from 'src/app/models/register-interface';
import { form, required, minLength, email, FormField } from '@angular/forms/signals';
import { RegisterService } from 'src/app/services/register-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerModel = signal<RegisterInterface>({
    name: '',
    email: '',
    password: ''
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.name, { message: 'El nombre es requerido' });
    minLength(schemaPath.name, 3, { message: 'El nombre debe tener al menos 3 caracteres' });

    required(schemaPath.email, { message: 'El correo electrónico es requerido' });
    email(schemaPath.email, { message: 'El correo electrónico no es válido' });

    required(schemaPath.password, { message: 'La contraseña es requerida' });
    minLength(schemaPath.password, 8, { message: 'La contraseña debe tener al menos 8 caracteres' });
  });

  constructor(private registerService: RegisterService, private router: Router) { }

  register() {
    if (this.registerForm().invalid()) {
      this.registerForm.name().markAsTouched();
      this.registerForm.email().markAsTouched();
      this.registerForm.password().markAsTouched();
      alert('Por favor, rellene todos los campos correctamente.');
      return;
    }

    this.registerService.registrarse(this.registerModel()).subscribe({
      next: (response) => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        alert('Error al registrar usuario. Inténtelo de nuevo.');
      }
    });
  }
}

