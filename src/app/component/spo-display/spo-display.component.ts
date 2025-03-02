import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { FirestoreService } from '../../service/firestore/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spo-display',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './spo-display.component.html',
  styleUrl: './spo-display.component.css'
})
export class SpoDisplayComponent implements OnInit, OnDestroy {
  lastSpo: number | null = null;
  private dataSubscription!: Subscription;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.listenForRealTimeUpdates();
  }

  listenForRealTimeUpdates(): void {
    this.dataSubscription = this.firestoreService.getLastSpO2().subscribe({
      next: (spo2) => {
        if (spo2 !== null && spo2 !== this.lastSpo) {
          this.lastSpo = spo2;
          console.log('Nuevo SpO2 detectado:', spo2);
        } else {
          console.log('No hay nuevos datos.');
        }
      },
      error: (error) => console.error('Error al obtener SpO2 de Firestore:', error)
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
