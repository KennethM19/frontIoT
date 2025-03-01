import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  imports: [CommonModule],
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent {
  @Output() close = new EventEmitter<void>();
  selectedGender: string | null = null;

  showTable(gender: string) {
    this.selectedGender = gender;
  }

  closeModal() {
    this.close.emit();
  }
}