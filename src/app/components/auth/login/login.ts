import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginInterface } from 'src/app/models/login-interface';
import { form, required, FormField } from '@angular/forms/signals';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginModel = signal<LoginInterface>({
    username: '',
    password: ''
  })

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El correo es requerido' });
    required(schemaPath.password, { message: 'la contraseña es requerida' });
  })

  constructor(private loginService: LoginService, private router: Router) {

  }

  login() {
    this.loginService.login(this.loginModel()).subscribe({
      next: (response) => {
        console.log(response.user.role)
        this.loginService.guardarToken(response.access_token, response.user.role);
        this.router.navigate(['/dash'])
      },
      error: (err) => {
        alert('Correo y/o contraseña incorrectas')
      },
    })
  }
}
