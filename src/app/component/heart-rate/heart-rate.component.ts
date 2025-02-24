import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-heart-rate',
  imports: [ChartModule],
  templateUrl: './heart-rate.component.html',
  styleUrl: './heart-rate.component.css'
})
export class HeartRateComponent implements OnInit {
  data: any;

  ngOnInit(): void {
      this.data = {
        labels: ['','','',''],
        datasets: [{
          label: 'Heart Rate',
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          fill: false,
          lineTension: 0.1,
          data: [10,20,50,10]
        }]
      };
  }

}
