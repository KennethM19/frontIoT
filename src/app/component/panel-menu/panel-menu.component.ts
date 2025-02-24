import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { MenuSelectionService } from '../../service/menuSelection/menu-selection.service';
import { HttpClient } from '@angular/common/http';
import { Datos } from '../../models/datos.model';

@Component({
  selector: 'app-panel-menu',
  imports: [PanelMenu],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.css',
})
export class PanelMenuComponent implements OnInit {
  items!: MenuItem[];
  datos: Datos[] = [];

  constructor(private http: HttpClient, private menuSelectionService: MenuSelectionService) {}

  ngOnInit(): void {
    // Inicializa los datos con 'Señal 1' por defecto
    this.datos = [
      { category: 'Derecha', signal: 'Señal 1' },
      { category: 'Izquierda', signal: 'Señal 1' },
      { category: 'Arriba', signal: 'Señal 1' },
      { category: 'Abajo', signal: 'Señal 1' }
    ];

    // Define los items del menú
    this.items = [
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          { label: 'Derecha', items: this.createSignalItems('Derecha') },
          { label: 'Izquierda', items: this.createSignalItems('Izquierda') },
          { label: 'Arriba', items: this.createSignalItems('Arriba') },
          { label: 'Abajo', items: this.createSignalItems('Abajo') },
        ]
      }
    ];
  }

  /**
   * Crea las opciones de señal para cada categoría.
   */
  createSignalItems(category: string): MenuItem[] {
    return ['Señal 1', 'Señal 2', 'Señal 3'].map((signal, index) => ({
      label: signal,
      command: () => this.saveSelection(category, signal, index + 1)
    }));
  }

  /**
   * Actualiza la señal seleccionada y envía el dato a la API.
   */
  updateSignal(category: string, signal: string, index: number): void {
    // Actualiza la señal seleccionada
    const item = this.datos.find(d => d.category === category);
    if (item) {
      item.signal = signal;
      this.sendDataToAPI(category, index); // Envía solo la actualización
    }
  }


  sendDataToAPI(category: string, index: number): void {
    const payload = {
      Movimiento: category.toLowerCase(), // Convertimos a minúsculas para coincidir con la API
      index: index
    };
  
    const apiUrl = 'https://iot-production-c059.up.railway.app/api/actualizar-movimiento';
  
    this.http.post(apiUrl, payload).subscribe({
      next: (response) => console.log('Datos enviados con éxito:', response),
      error: (error) => console.error('Error al enviar los datos:', error)
    });
  }

  saveSelection(category: string, signal: string, index: number) {
    this.menuSelectionService.updateSelection(category, signal);
    console.log(`Guardado: ${category} - ${signal} (Index: ${index})`);
    this.sendDataToAPI(category, index);
  }
}
