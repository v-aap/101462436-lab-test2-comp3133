import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../services/spacex.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  selectedMission: Mission | null = null;

  constructor(private spacexService: SpacexService) { }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.spacexService.getAllMissions().subscribe(
      (data) => {
        this.missions = data;
      },
      (error) => {
        console.error('Error fetching missions:', error);
      }
    );
  }

  selectMission(mission: Mission): void {
    this.selectedMission = mission;
  }
}