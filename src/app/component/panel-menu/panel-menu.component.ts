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

  private signalsMap: { [key: string]: string[] } = {
    'Izquierda': [
      'Tengo sed',
      'Necesito ir al baño',
      'Tengo hambre',
      'Por favor, cambia mi posición',
      'Por favor, ajusta mi almohada'
    ],
    'Derecha': [
      'Necesito ayuda urgente',
      'Estoy incómodo/a',
      'Me duele algo',
      'Ven aquí, por favor',
      'Por favor, baja la luz'
    ],
    'Arriba': [
      'Quiero hablar con alguien',
      'Ponme música o televisión',
      'Quiero que alguien me lea algo',
      '¿A qué hora vendrán a verme?',
      'Por favor, dame mi teléfono'
    ],
    'Abajo': [
      'Estoy bien, gracias',
      'No necesito nada ahora',
      'Tengo frío, tráeme una manta',
      'Tengo calor, por favor destápame',
      'Puedes apagar la televisión, por favor'
    ]
  };

  constructor(private http: HttpClient, private menuSelectionService: MenuSelectionService) {}

  ngOnInit(): void {
    // Inicializa los datos con la primera señal de cada movimiento por defecto
    this.datos = Object.keys(this.signalsMap).map(category => ({
      category,
      signal: this.signalsMap[category][0] // Primera señal como predeterminada
    }));

    // Define los items del menú
    this.items = [
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: Object.keys(this.signalsMap).map(category => ({
          label: category,
          items: this.createSignalItems(category)
        }))
      }
    ];
  }

  createSignalItems(category: string): MenuItem[] {
    return this.signalsMap[category].map((signal, index) => ({
      label: signal,
      command: () => this.saveSelection(category, signal, index + 1)
    }));
  }

  updateSignal(category: string, signal: string, index: number): void {
    const item = this.datos.find(d => d.category === category);
    if (item) {
      item.signal = signal;
      this.sendDataToAPI(category, index);
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