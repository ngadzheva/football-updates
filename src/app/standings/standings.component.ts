import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of, tap } from 'rxjs';
import { FootballService } from '../services/football.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LeagueParams } from '../types/league.type';
import { StandingsLeague } from '../types/standings.type';
import { FixturesParams } from '../types/fixtures.type';
import { COUNTRY_LEAGUE, Country } from '../types/country.type';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.css'
})
export class StandingsComponent implements OnChanges {
  @Input() country?: Country;
  $leagueStandings: Observable<StandingsLeague> | null = null;

  constructor (
    private router: Router,
    private footbalService: FootballService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnChanges(): void {
    if (this.country) {
      this.loadStandings(this.country);
    }
  }

  displayTeamGameResults(leagueId: number, season: number, teamId: number) {
    const data: Partial<FixturesParams> = { leagueId, season };

    this.router.navigate(['/team', teamId], { state: data });
  }

  private loadStandings(country: Country) {
    const season = new Date().getFullYear();
    const { name, id: leagueId } = COUNTRY_LEAGUE[country];
    const data: Partial<LeagueParams> = { name, country, season };
    
    const localStorageKey = this.constructLocalStorageKey(data); 
    const localStorageData = this.loadFromLocalStorage(localStorageKey);

    if (localStorageData) {
      this.$leagueStandings = of(localStorageData);
    } else {
      this.$leagueStandings = this.footbalService.getLeagueStandings({ leagueId, season }).pipe(
        tap(standings => this.localStorageService.setItem(localStorageKey, JSON.stringify(standings)))
      );
    }
  }

  private loadFromLocalStorage(key: string): StandingsLeague | null {
    const result = this.localStorageService.getItem(key);

    return result ? JSON.parse(result) : null;
  }

  private constructLocalStorageKey({ name, country, season }: Partial<LeagueParams>) {
    return `${name}-${country}-${season}`;
  }
}
