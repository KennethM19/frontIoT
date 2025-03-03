import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UIChart } from 'primeng/chart';
import { FirestoreService } from '../../service/firestore/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spo',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './spo.component.html',
  styleUrl: './spo.component.css',
})
export class SpoComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: UIChart;

  data: any;
  options: any;
  spoValues: number[] = [];
  private spoSubscription!: Subscription;
  private realTimeSubscription!: Subscription;
  maxDataPoints = 30;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Spo2',
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
        x: {
          display: false,
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 240,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Spo2 Monitor'
        },
      },
    };

    this.loadInitialData();
  }

  loadInitialData(): void {
    this.spoSubscription = this.firestoreService.getLast30Spo2().subscribe({
      next: (spoList) => {
        this.spoValues = spoList;
        this.updateChart(spoList);
        this.listenForRealTimeUpdates();
      },
      error: (error) => console.error('Error al obtener SPO iniciales:', error),
    });
  }

  listenForRealTimeUpdates(): void {
    this.realTimeSubscription = this.firestoreService
      .getLastSpO2()
      .subscribe({
        next: (newSpo) => {
          if (newSpo !== null && !this.spoValues.includes(newSpo)) {
            this.spoValues.push(newSpo);
            if (this.spoValues.length > this.maxDataPoints) {
              this.spoValues.shift();
            }
            this.updateChart(this.spoValues);
          }
        },
        error: (error) =>
          console.error('Error en la actualización en tiempo real:', error),
      });
  }

  updateChart(spoList: number[]): void {
    this.data.labels = spoList.map((_, index) => `#${index + 1}`);
    this.data.datasets[0].data = spoList;

    if (this.chart) {
      this.chart.refresh();
    }
  }

  ngOnDestroy(): void {
    if (this.spoSubscription) this.spoSubscription.unsubscribe();
    if (this.realTimeSubscription) this.realTimeSubscription.unsubscribe();
  }
}
