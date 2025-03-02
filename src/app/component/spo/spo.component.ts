import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { UIChart } from 'primeng/chart';

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
  interval: any;
  apiUrl = 'http://localhost:3000/mostrarnumeros';
  spo2Values: number[] = [];
  currentIndex: number = 0;
  maxDataPoints = 20;

  constructor(private http: HttpClient) {}

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
          text: 'Spo2 Monitor',
          fontSize: 100,
        },
      },
    };

    this.fetchData();
  }

  fetchData(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (response) => {
        console.log('Datos obtenidos de la API:', response);
        if (response.length > 0) {
          this.spo2Values = response;
          this.currentIndex = this.spo2Values.length;
          this.loadInitialData();
          this.startUpdatingChart();
        } else {
          console.warn('No hay datos disponibles.');
        }
      },
      error: (error) => console.error('Error al obtener SPO:', error),
    });
  }

  loadInitialData(): void {
    const startIndex = Math.max(0, this.spo2Values.length - this.maxDataPoints);
    const initialData = this.spo2Values.slice(startIndex);

    this.data.labels = initialData.map(
      (_, index) => `#${startIndex + index + 1}`
    );
    this.data.datasets[0].data = initialData;

    if (this.chart) {
      this.chart.refresh();
    }
  }

  startUpdatingChart(): void {
    this.interval = setInterval(() => {
      const newValue = this.getNextBpm();
      if (newValue !== null) {
        this.updateChartData(newValue);
      } else {
        console.warn(
          'Se alcanzó el final de los datos, deteniendo actualización.'
        );
        this.stopUpdates();
      }
    }, 2000);
  }

  getNextBpm(): number | null {
    if (this.currentIndex >= this.spo2Values.length) {
      return null;
    }
    return this.spo2Values[this.currentIndex++];
  }

  updateChartData(newValue: number): void {
    this.data.labels.push(`#${this.currentIndex}`);
    this.data.datasets[0].data.push(newValue);
    if (this.data.datasets[0].data.length > this.maxDataPoints) {
      this.data.labels.shift();
      this.data.datasets[0].data.shift();
    }

    console.log('Datos actuales en la gráfica:', this.data.datasets[0].data);

    if (this.chart) {
      this.chart.refresh();
    }
  }

  stopUpdates(): void {
    clearInterval(this.interval);
    console.log('Actualización de la gráfica detenida.');
  }

  ngOnDestroy(): void {
    this.stopUpdates();
  }
}
