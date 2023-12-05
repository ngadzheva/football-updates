import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeagueParams, LeagueResponse } from '../types/league.type';
import { StandingsParams, StandingsResponse } from '../types/standings.type';
import { FixturesParams, FixturesResponse } from '../types/fixtures.type';
import { map } from 'rxjs';
import { TeamResponse } from '../types/team.type';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private url = 'https://v3.football.api-sports.io';
  private key = 'a1d707ff3ef02667c1d0d420d844d692';
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
		  "x-rapidapi-key": this.key
    });
   }

  getCurrentLeague({ name, country, season }: Partial<LeagueParams>) {
    return this.http.get<LeagueResponse>(
      `${this.url}/leagues?name=${name}&country=${country}&season=${season}&current=true`,
      { headers: this.httpHeaders }
    ).pipe(map(leaguesResponse => leaguesResponse.response[0]));
  }

  getLeagueStandings({ leagueId, season }: StandingsParams) {
    return this.http.get<StandingsResponse>(
      `${this.url}/standings?league=${leagueId}&season=${season}`,
      { headers: this.httpHeaders }
    ).pipe(
      map(standingsResponse => standingsResponse.response[0]),
      map(standingsData => standingsData.league)
    );
  }

  getTeamFixtures({ leagueId, season, teamId }: FixturesParams) {
    return this.http.get<FixturesResponse>(
      `${this.url}/fixtures?league=${leagueId}&season=${season}&team=${teamId}`,
      { headers: this.httpHeaders }
    ).pipe(map(fixturesResponse => fixturesResponse.response));
  }

  getTeamCountry(teamId: number) {
    return this.http.get<TeamResponse>(
      `${this.url}/teams?team=${teamId}`,
      { headers: this.httpHeaders }
    ).pipe(
      map(teamResponse => teamResponse.response),
      map(teamData => teamData.team.country)
    );
  }
}
