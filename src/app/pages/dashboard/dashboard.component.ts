import { Component } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu.component';
import { HeartRateComponent } from '../../component/heart-rate/heart-rate.component';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent,HeartRateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
