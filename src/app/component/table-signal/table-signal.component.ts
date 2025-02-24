import { Component, OnInit } from '@angular/core';
import { MenuSelectionService } from '../../service/menuSelection/menu-selection.service';
import { Selection } from '../../models/selection.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-signal',
  imports: [CommonModule],
  templateUrl: './table-signal.component.html',
  styleUrl: './table-signal.component.css'
})
export class TableSignalComponent implements OnInit {
  selectedItems: Selection[] = [];

  constructor(private menuSelectionService: MenuSelectionService) {}

  ngOnInit(): void {
    this.selectedItems = this.menuSelectionService.getSelectedItems();
  }

}