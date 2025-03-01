import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [DrawerModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  visible: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.visible = false;
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
    this.visible = false;
  }

  goSignals() {
    this.router.navigate(['/señales']);
    this.visible = false;
  }
}
