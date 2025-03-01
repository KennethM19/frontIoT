import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalService } from '../../service/signal/signal.service';
import { Datos } from '../../models/datos.model';

@Component({
  selector: 'app-table-signal',
  imports: [CommonModule, FormsModule],
  templateUrl: './table-signal.component.html',
  styleUrl: './table-signal.component.css',
})
export class TableSignalComponent implements OnInit {
  datos: Datos[] = [];
  public signalsMap: { [key: string]: string[] } = {
    Izquierda: [
      'Tengo sed',
      'Necesito ir al baño',
      'Tengo hambre',
      'Por favor, cambia mi posición',
      'Por favor, ajusta mi almohada',
    ],
    Derecha: [
      'Necesito ayuda urgente',
      'Estoy incómodo/a',
      'Me duele algo',
      'Ven aquí, por favor',
      'Por favor, baja la luz',
    ],
    Arriba: [
      'Quiero hablar con alguien',
      'Ponme música o televisión',
      'Quiero que alguien me lea algo',
      '¿A qué hora vendrán a verme?',
      'Por favor, dame mi teléfono',
    ],
    Abajo: [
      'Estoy bien, gracias',
      'No necesito nada ahora',
      'Tengo frío, tráeme una manta',
      'Tengo calor, por favor destápame',
      'Puedes apagar la televisión, por favor',
    ],
  };

  constructor(private signalService: SignalService) {}

  ngOnInit(): void {
    this.datos = Object.keys(this.signalsMap).map((category) => ({
      category,
      signal: this.signalsMap[category][0], 
    }));
  }

  onSignalChange(category: string, signal: string) {
    const index = this.signalsMap[category].indexOf(signal) + 1; 
    this.signalService.updateOrCreateSignal(category, index).subscribe({
      next: (response) =>
        console.log(
          `Señal actualizada: ${category} - ${signal} (Index: ${index})`,
          response
        ),
      error: (error) => console.error('Error al actualizar la señal:', error),
    });
  }
}
