import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { RegisterInterface } from 'src/app/models/register-interface';
import { form, required, minLength, email, FormField, submit } from '@angular/forms/signals';
import { RegisterService } from 'src/app/services/register-service';
import { firstValueFrom } from 'rxjs';

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

  showPassword = signal(false);
  togglePassword() {
    this.showPassword.update(v => !v);
  }
  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.name, { message: 'El nombre es requerido' });
    minLength(schemaPath.name, 3, { message: 'El nombre debe tener al menos 3 caracteres' });

    required(schemaPath.email, { message: 'El correo electrónico es requerido' });
    email(schemaPath.email, { message: 'El correo electrónico no es válido' });

    required(schemaPath.password, { message: 'La contraseña es requerida' });
    minLength(schemaPath.password, 8, { message: 'La contraseña debe tener al menos 8 caracteres' });
  });

  registerError = signal<string | null>(null);

  constructor(private registerService: RegisterService, private router: Router) { }

  register() {
    this.registerError.set(null);
    submit(this.registerForm, async () => {
      try {
        await firstValueFrom(this.registerService.registrarse(this.registerModel()));
        alert('Usuario registrado con éxito');
        this.router.navigate(['/auth/login']);
      } catch (err) {
        this.registerError.set('Error al registrar usuario. Inténtelo de nuevo.');
      }
    });
  }
}

