import { Component, Renderer2} from '@angular/core';
import { Router, RouterOutlet, RouterLink } from "@angular/router";
import { LoginService } from 'src/app/services/login-service';


@Component({
  selector: 'app-burrito-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './burrito-layout.html',
  styleUrl: './burrito-layout.css',
})
export class BurritoLayout {

  constructor(private loginService: LoginService, private router: Router, private renderer: Renderer2) {}
  cerrarSesion() {
    this.loginService.cerrarSesion();
    this.router.navigate(['/auth/login']);
  }

  toggleSidebar() {
    const body = document.body;
    // La plantilla HexaDash usa la clase 'collapsed' en el body
    if (body.classList.contains('collapsed')) {
      this.renderer.removeClass(body, 'collapsed');
    } else {
      this.renderer.addClass(body, 'collapsed');
    }
  }
}
