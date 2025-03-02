import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-spo-display',
  imports: [CommonModule, NgClass],
  templateUrl: './spo-display.component.html',
  styleUrl: './spo-display.component.css'
})
export class SpoDisplayComponent implements OnInit {

  lastSpo: number | null = null;
  apiUrl = 'https://iot-production-c059.up.railway.app/api/ultimos-spo2';
  interval: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLastSpo();
  }

  fetchLastSpo(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const newSpo = data[data.length - 1];

          if (newSpo !== this.lastSpo) {
            this.lastSpo = newSpo;
            console.log('Nuevo dato detectado, reiniciando consultas.');
            this.startPolling();
          } else {
            console.log('Mismo valor, deteniendo consultas.');
            clearInterval(this.interval);
          }
        }
      },
      error: (error) => console.error('Error al obtener SPO2:', error)
    });
  }

  startPolling(): void {
    clearInterval(this.interval); 
    this.interval = setInterval(() => this.fetchLastSpo(), 5000);
  }
}
