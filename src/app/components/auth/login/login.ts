import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginInterface} from 'src/app/models/login-interface';
import { form, required, FormField, submit, email } from '@angular/forms/signals';
import { LoginService } from 'src/app/services/login-service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);

 showPassword = signal(false);
 loginError= signal<string| null >(null);

 loginModel = signal<LoginInterface> ({email: '', password:''})
 
 loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'El email es requerido' });
    email(path.email, { message: 'Email inválido' });
    required(path.password, { message: 'La contraseña es requerida' });
  });
  
 togglePassword() {
    this.showPassword.update(value => !value);
  }
  
login() {
    this.loginError.set(null);
    submit(this.loginForm, async () => {
      try {
        await firstValueFrom(this.loginService.login(this.loginModel()));
        const role = this.loginService.recuperarRol();
        this.router.navigate([
        role === 'admin' ? '/burritoadministrador/dash' : '/burritolector/galeria'
      ]);
    } catch (err) {
      this.loginError.set('Credenciales inválidas');
    }
  });
  }
}

