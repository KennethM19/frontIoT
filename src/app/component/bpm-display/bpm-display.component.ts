import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bpm-display',
  imports: [CommonModule, NgClass],
  templateUrl: './bpm-display.component.html',
  styleUrl: './bpm-display.component.css'
})
export class BpmDisplayComponent implements OnInit {
  lastBpm: number | null = null;
  apiUrl = 'https://iot-production-c059.up.railway.app/api/ultimos-bpm';
  interval: any;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLastBpm();
  }

  fetchLastBpm(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const newBpm = data[data.length - 1];

          if (newBpm !== this.lastBpm) {
            this.lastBpm = newBpm;
            console.log('Nuevo dato detectado, reiniciando consultas.');
            this.startPolling();
          } else {
            console.log('Mismo valor, deteniendo consultas.');
            clearInterval(this.interval);
          }
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }

  startPolling(): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.fetchLastBpm(), 5000);
  }
}
