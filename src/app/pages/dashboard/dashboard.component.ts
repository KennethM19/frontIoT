import { Component } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu.component';
import { HeartRateComponent } from '../../component/heart-rate/heart-rate.component';
import { TableSignalComponent } from '../../component/table-signal/table-signal.component';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent,HeartRateComponent,TableSignalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
