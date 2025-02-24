import { Component } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu.component';
import { HeartRateComponent } from '../../component/heart-rate/heart-rate.component';
import { TableSignalComponent } from '../../component/table-signal/table-signal.component';
import { BpmDisplayComponent } from '../../component/bpm-display/bpm-display.component';
import { SpoDisplayComponent } from '../../component/spo-display/spo-display.component';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent,HeartRateComponent,TableSignalComponent,BpmDisplayComponent,SpoDisplayComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
