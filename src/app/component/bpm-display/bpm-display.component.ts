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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchLastBpm();
    setInterval(() => this.fetchLastBpm(), 5000); 
  }

  fetchLastBpm(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.lastBpm = data[data.length - 1];
        } else {
          this.lastBpm = 0.00;
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }

}
