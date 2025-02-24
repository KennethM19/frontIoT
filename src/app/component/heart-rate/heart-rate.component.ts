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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data = {
      labels: [], // Se llenarán con índices de los datos
      datasets: [{
        label: 'Heart Rate',
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        fill: false,
        lineTension: 0.1,
        data: [] // Se llenará con los datos de la API
      }]
    };

    this.fetchData(); // Obtener datos iniciales
    this.interval = setInterval(() => this.fetchData(), 2000); // Actualizar cada 2 segundos
  }

  fetchData(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.updateChartData(response);
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }

  updateChartData(newValues: number[]): void {
    const maxDataPoints = 10; // Máximo de valores en la gráfica

    // Asignamos los nuevos valores directamente desde la API
    this.data.labels = newValues.map((_, index) => `#${index + 1}`); // Etiquetas con índices
    this.data.datasets[0].data = [...newValues]; // Actualizar con todos los valores recibidos

    // Si hay más datos de los permitidos, recortar los más antiguos
    if (this.data.datasets[0].data.length > maxDataPoints) {
      this.data.labels = this.data.labels.slice(-maxDataPoints);
      this.data.datasets[0].data = this.data.datasets[0].data.slice(-maxDataPoints);
    }

    this.data = { ...this.data }; // Forzar actualización de la gráfica en PrimeNG
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); // Detener las actualizaciones cuando se destruya el componente
  }
}
