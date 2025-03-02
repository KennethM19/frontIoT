import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bpm-display',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './bpm-display.component.html',
  styleUrl: './bpm-display.component.css'
})
export class BpmDisplayComponent implements OnInit, OnDestroy {
  lastBpm: number | null = null;
  apiUrl = 'http://localhost:3000/mostrarnumeros';
  interval: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling(): void {
    this.interval = setInterval(() => {
      this.fetchLastBpm();
    }, 5000);
  }

  fetchLastBpm(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const newBpm = data[data.length - 1];

          if (newBpm !== this.lastBpm) {
            this.lastBpm = newBpm;
            console.log('Nuevo dato detectado:', newBpm);
          } else {
            console.log('No hay nuevos datos.');
          }
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
