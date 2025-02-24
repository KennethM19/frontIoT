import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bpm-display',
  imports: [CommonModule],
  templateUrl: './bpm-display.component.html',
  styleUrl: './bpm-display.component.css'
})
export class BpmDisplayComponent implements OnInit {
  lastBpm: number | null = null;

  apiUrl = 'https://iot-production-c059.up.railway.app/api/primeros-bpm';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchLastBpm();
    setInterval(() => this.fetchLastBpm(), 5000); 
  }

  fetchLastBpm(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.lastBpm = data[data.length - 1]; // Último valor del array
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }

}
