import { Injectable } from '@angular/core';
import { Selection } from '../../models/selection.model';

@Injectable({
  providedIn: 'root'
})
export class MenuSelectionService {

  private selectedItems: Selection[] = [
    { category: 'Derecha', signal: 'Señal 1' },
    { category: 'Izquierda', signal: 'Señal 1' },
    { category: 'Arriba', signal: 'Señal 1' },
    { category: 'Abajo', signal: 'Señal 1' }
  ];
  constructor() { }

  updateSelection(category: string, signal: string) {
    // Busca la categoría y actualiza la señal
    const index = this.selectedItems.findIndex(item => item.category === category);
    if (index !== -1) {
      this.selectedItems[index].signal = signal;
    }
  }

  getSelectedItems(): Selection[] {
    return this.selectedItems;
  }

}
