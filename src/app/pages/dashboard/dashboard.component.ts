import { Component } from '@angular/core';
import { HeartRateComponent } from '../../component/heart-rate/heart-rate.component';
import { TableSignalComponent } from '../../component/table-signal/table-signal.component';
import { BpmDisplayComponent } from '../../component/bpm-display/bpm-display.component';
import { SpoDisplayComponent } from '../../component/spo-display/spo-display.component';
import { SpoComponent } from "../../component/spo/spo.component";
import { InfoModalComponent } from '../../component/info-modal/info-modal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [HeartRateComponent, TableSignalComponent, BpmDisplayComponent, SpoDisplayComponent, SpoComponent, InfoModalComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isModalOpen = false;

    constructor(private authService: AuthService, private router: Router){}

  openModal() {
    this.isModalOpen = true;
    console.log('open modal', this.isModalOpen);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
