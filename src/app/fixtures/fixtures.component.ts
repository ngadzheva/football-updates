import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, map, of, tap } from 'rxjs';
import { FixturesData, FixturesParams } from '../types/fixtures.type';
import { COUNTRY_LEAGUE, Country } from '../types/country.type';
import { FootballService } from '../services/football.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.css'
})
export class FixturesComponent {
  teamId: number;
  $fixtures: Observable<FixturesData[]> | null = null;
  
  private localStorageKey: string = '';
  private localStorageData: FixturesData[] | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private footballService: FootballService,
    private localStorageService: LocalStorageService
  ) {
    this.teamId = this.route.snapshot.params['id'];
    this.loadFixtures();
  }

  goBack() {
    this.location.back();
  }

  private loadFixtures() {
    const data = this.router.getCurrentNavigation()?.extras.state;
  
    if (data) {
      this.loadData({ ...data, teamId: this.teamId } as FixturesParams);
    } else {
      const season = new Date().getFullYear();
  
      this.footballService.getTeamCountry(this.teamId).pipe(
        tap(country => {
          const countryKey = country as Country;
          const leagueId = COUNTRY_LEAGUE[countryKey].id;

          this.loadData({ leagueId, season, teamId: this.teamId } as FixturesParams);
        })
      );
    }
  }

  private loadData(data: FixturesParams) {
    this.localStorageKey = this.constructLocalStorageKey(data);
    this.localStorageData = this.loadFromLocalStorage(this.localStorageKey);

    if (this.localStorageData) {
      this.$fixtures = of(this.localStorageData);
    } else {
      this.$fixtures = this.loadFromFootballAPI(data);
    }
  }

  private loadFromFootballAPI(data: FixturesParams) {
    return this.footballService.getTeamFixtures(data).pipe(
      map(fixtures => fixtures.filter(fixture => new Date(fixture.fixture.date) <= new Date())),
      map(fixtures => fixtures.sort((fixture1, fixture2) => fixture1.fixture.date >= fixture2.fixture.date ? -1 : 1)),
      map(fixtures => fixtures.slice(0, 10)),
      tap(fixtures => this.localStorageService.setItem(this.localStorageKey ?? '', JSON.stringify(fixtures)))
    );
  }

  private loadFromLocalStorage(key: string): FixturesData[] | null {
    const result = this.localStorageService.getItem(key);

    return result ? JSON.parse(result) : null;
  }

  private constructLocalStorageKey({ leagueId, season, teamId }: FixturesParams) {
    return `${leagueId}-${season}-${teamId}`;
  }
}
