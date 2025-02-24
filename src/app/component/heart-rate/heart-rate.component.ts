import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-heart-rate',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.css']
})
export class HeartRateComponent implements OnInit, OnDestroy {
  data: any;
  interval: any;
  apiUrl = 'https://iot-production-c059.up.railway.app/api/ultimos-ir';
  bpmValues: number[] = []; // Array para almacenar los BPM
  currentIndex = 0; // Índice actual dentro del array

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data = {
      labels: [], 
      datasets: [{
        label: 'Heart Rate',
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        fill: false,
        lineTension: 0.1,
        data: []
      }]
    };

    this.fetchData(); // Obtener datos iniciales
  }

  fetchData(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.bpmValues = response;
          this.startUpdatingChart();
        } else {
          console.warn('No hay datos disponibles.');
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }

  startUpdatingChart(): void {
    this.interval = setInterval(() => {
      if (this.currentIndex < this.bpmValues.length) {
        this.updateChartData(this.bpmValues[this.currentIndex]);
        this.currentIndex++;
      } else {
        console.warn('Se alcanzó el último dato. Deteniendo actualizaciones.');
        this.stopUpdates();
      }
    }, 2000); // Se actualiza cada 2 segundos
  }

  updateChartData(newValue: number): void {
    const maxDataPoints = 10;

    this.data.labels.push(`#${this.currentIndex + 1}`);
    this.data.datasets[0].data.push(newValue);

    if (this.data.datasets[0].data.length > maxDataPoints) {
      this.data.labels.shift();
      this.data.datasets[0].data.shift();
    }

    this.data = { ...this.data }; // Forzar actualización de la gráfica
  }

  stopUpdates(): void {
    clearInterval(this.interval);
  }

  ngOnDestroy(): void {
    this.stopUpdates();
  }
}
