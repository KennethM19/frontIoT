import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UIChart } from 'primeng/chart';
import { FirestoreService } from '../../service/firestore/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heart-rate',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.css'],
})
export class HeartRateComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: UIChart;

  data: any;
  options: any;
  bpmValues: number[] = [];
  private bpmSubscription!: Subscription;
  private realTimeSubscription!: Subscription;
  maxDataPoints = 30;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Heart Rate (BPM)',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: '#4CAF50',
          fill: false,
          tension: 0.3,
          data: [],
        },
      ],
    };

    this.options = {
      scales: {
        x: { display: false },
        y: { suggestedMin: 60, suggestedMax: 120 },
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Heart-Rate Monitor' },
      },
    };

    this.loadInitialData();
  }

  loadInitialData(): void {
    this.bpmSubscription = this.firestoreService.getLast30BPMs().subscribe({
      next: (bpmList) => {
        this.bpmValues = bpmList;
        this.updateChart(bpmList);
        this.listenForRealTimeUpdates();
      },
      error: (error) => console.error('Error al obtener BPM iniciales:', error),
    });
  }

  listenForRealTimeUpdates(): void {
    this.realTimeSubscription = this.firestoreService
      .getRealTimeBPM()
      .subscribe({
        next: (newBpm) => {
          if (newBpm !== null && !this.bpmValues.includes(newBpm)) {
            this.bpmValues.push(newBpm);
            if (this.bpmValues.length > this.maxDataPoints) {
              this.bpmValues.shift();
            }
            this.updateChart(this.bpmValues);
          }
        },
        error: (error) =>
          console.error('Error en la actualización en tiempo real:', error),
      });
  }

  updateChart(bpmList: number[]): void {
    this.data.labels = bpmList.map((_, index) => `#${index + 1}`);
    this.data.datasets[0].data = bpmList;

    if (this.chart) {
      this.chart.refresh();
    }
  }

  ngOnDestroy(): void {
    if (this.bpmSubscription) this.bpmSubscription.unsubscribe();
    if (this.realTimeSubscription) this.realTimeSubscription.unsubscribe();
  }
}
