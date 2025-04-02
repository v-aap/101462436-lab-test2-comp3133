import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexService } from './services/spacex.service';
import { Mission } from './models/mission';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="app-container">
      <header>
        <h1>SpaceX Missions Explorer</h1>
      </header>
      
      <main>
        <div *ngIf="loading" class="loading">
          <p>Loading SpaceX mission data...</p>
        </div>
        
        <div *ngIf="!loading">
          <div class="filter-container">
            <label for="yearFilter">Filter by Launch Year:</label>
            <select id="yearFilter" (change)="filterByYear($event)">
              <option value="">All Years</option>
              <option *ngFor="let year of availableYears" [value]="year">{{ year }}</option>
            </select>
          </div>
          
          <div class="missions-grid">
            <div *ngFor="let mission of missions" class="mission-card" (click)="selectMission(mission)">
              <div class="mission-header">
                <img *ngIf="mission.links?.mission_patch_small" [src]="mission.links.mission_patch_small" alt="Mission patch" class="mission-patch">
                <div>
                  <h2>{{ mission.mission_name }}</h2>
                  <p class="launch-year">{{ mission.launch_year }}</p>
                </div>
              </div>
              
              <p class="mission-details">{{ mission.details }}</p>
              
              <div class="mission-info">
                <p><strong>Flight Number:</strong> {{ mission.flight_number }}</p>
                <p><strong>Rocket:</strong> {{ mission.rocket.rocket_name }} ({{ mission.rocket.rocket_type }})</p>
              </div>
              
              <div class="mission-links">
                <a *ngIf="mission.links.article_link" [href]="mission.links.article_link" target="_blank" class="link-button">Article</a>
                <a *ngIf="mission.links.wikipedia" [href]="mission.links.wikipedia" target="_blank" class="link-button">Wikipedia</a>
                <a *ngIf="mission.links.video_link" [href]="mission.links.video_link" target="_blank" class="link-button">Video</a>
                <button class="link-button details-button" (click)="selectMission(mission)">View Details</button>
              </div>
            </div>
          </div>
        </div>
        
        <div *ngIf="selectedMission" class="mission-details-container">
          <div class="details-header">
            <h2>Mission Details: {{ selectedMission.mission_name }}</h2>
            <button class="close-button" (click)="closeDetails()">×</button>
          </div>
          
          <div class="details-content">
            <div class="details-section">
              <h3>Mission Overview</h3>
              <p><strong>Flight Number:</strong> {{ selectedMission.flight_number }}</p>
              <p><strong>Launch Year:</strong> {{ selectedMission.launch_year }}</p>
              <p *ngIf="selectedMission.details">{{ selectedMission.details }}</p>
            </div>
            
            <div class="details-section">
              <h3>Rocket Information</h3>
              <p><strong>Name:</strong> {{ selectedMission.rocket.rocket_name }}</p>
              <p><strong>Type:</strong> {{ selectedMission.rocket.rocket_type }}</p>
            </div>
            
            <div class="details-section">
              <h3>Links</h3>
              <div class="details-links">
                <a *ngIf="selectedMission.links.article_link" [href]="selectedMission.links.article_link" target="_blank" class="link-button">Read Article</a>
                <a *ngIf="selectedMission.links.wikipedia" [href]="selectedMission.links.wikipedia" target="_blank" class="link-button">Wikipedia</a>
                <a *ngIf="selectedMission.links.video_link" [href]="selectedMission.links.video_link" target="_blank" class="link-button">Watch Video</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer>
        <p>© {{ getCurrentYear() }} COMP 3133 - Lab Test 2</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  missions: Mission[] = [];
  selectedMission: Mission | null = null;
  availableYears: string[] = [];

  constructor(private spacexService: SpacexService) { }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.spacexService.getAllMissions().subscribe({
      next: (data) => {
        this.missions = data;
        this.extractYears();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching missions:', error);
        this.loading = false;
      }
    });
  }

  extractYears(): void {
    // Get unique years from missions
    const yearsSet = new Set<string>();
    this.missions.forEach(mission => {
      if (mission.launch_year) {
        yearsSet.add(mission.launch_year);
      }
    });
    this.availableYears = Array.from(yearsSet).sort();
  }

  filterByYear(event: any): void {
    const year = event.target.value;
    
    if (year) {
      this.spacexService.getMissionsByYear(year).subscribe({
        next: (data) => {
          this.missions = data;
        },
        error: (error) => {
          console.error('Error filtering missions:', error);
        }
      });
    } else {
      this.loadMissions();
    }
  }

  selectMission(mission: Mission): void {
    this.selectedMission = mission;
  }

  closeDetails(): void {
    this.selectedMission = null;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}