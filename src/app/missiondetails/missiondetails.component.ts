import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent {
  @Input() mission: Mission | null = null;
}