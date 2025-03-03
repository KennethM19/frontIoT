import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from '../../service/firestore/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bpm-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bpm-display.component.html',
  styleUrl: './bpm-display.component.css'
})
export class BpmDisplayComponent implements OnInit, OnDestroy {
  lastBpm: number | null = null;
  private dataSubscription!: Subscription;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.listenForRealTimeUpdates();
  }

  listenForRealTimeUpdates(): void {
    this.dataSubscription = this.firestoreService.getRealTimeBPM().subscribe({
      next: (bpm) => {
        if (bpm !== null && bpm !== this.lastBpm) {
          this.lastBpm = bpm;
          console.log('Nuevo BPM detectado:', bpm);
        } else {
          console.log('No hay nuevos datos.');
        }
      },
      error: (error) => console.error('Error al obtener BPM de Firestore:', error)
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
