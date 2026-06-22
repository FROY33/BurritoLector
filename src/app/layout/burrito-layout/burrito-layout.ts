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
    const side = document.getElementById('sidebar_body');
    const side_cont = document.getElementById('sidebar_content');

    if(side?.classList.contains('collapsed')){
      side?.classList.remove('collapsed');
      side_cont?.classList.remove('expanded');
    }else{
      side?.classList.add('collapsed');
      side_cont?.classList.add('expanded');
    }
  }
}
