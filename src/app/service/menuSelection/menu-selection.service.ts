import { Injectable, OnInit } from '@angular/core';
import { Selection } from '../../models/selection.model';

@Injectable({
  providedIn: 'root'
})
export class MenuSelectionService implements OnInit{

  private selectedItems: Selection[] = [
    { category: 'Derecha', signal: 'Señal' },
    { category: 'Izquierda', signal: 'Señal' },
    { category: 'Arriba', signal: 'Señal' },
    { category: 'Abajo', signal: 'Señal' }
  ];
  constructor() { }

  ngOnInit(): void {
      
  }

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
