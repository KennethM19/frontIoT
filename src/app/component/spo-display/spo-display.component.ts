import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spo-display',
  imports: [CommonModule],
  templateUrl: './spo-display.component.html',
  styleUrl: './spo-display.component.css'
})
export class SpoDisplayComponent implements OnInit {

  lastSpo: number | null = null;

  apiUrl = 'https://iot-production-c059.up.railway.app/api/primeros-bpm';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLastBpm();
    setInterval(() => this.fetchLastBpm(), 5000); 
  }

  fetchLastBpm(): void {
    this.http.get<number[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.lastSpo = data[data.length - 1]; 
        } else {
          this.lastSpo = 0.00;
        }
      },
      error: (error) => console.error('Error al obtener BPM:', error)
    });
  }
}
