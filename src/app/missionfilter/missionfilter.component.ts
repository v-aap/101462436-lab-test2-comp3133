import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  @Output() yearSelected = new EventEmitter<string>();
  
  // Creating a range of years from 2006 (first SpaceX launch) to current year
  years: string[] = [];
  selectedYear: string = '';

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }

  onYearChange(): void {
    this.yearSelected.emit(this.selectedYear);
  }

  clearFilter(): void {
    this.selectedYear = '';
    this.yearSelected.emit('');
  }
}