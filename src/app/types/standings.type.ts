import { BaseResponse } from "./base.type";
import { Country, League, Team } from "./common.type";

export type CountryLeague = League & Country;

export interface StandingsLeague extends CountryLeague {
    season: number;
    standings: Standing[][];
}

interface Standing {
    rank: number;
    team: Pick<Team, 'id' | 'name' | 'logo'>;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string;
    all: Game;
    home: Game;
    away: Game;
    update: string;
}

interface Game {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
}

interface Goals {
    for: number;
    against: number;
}

export interface StandingsData {
    league: StandingsLeague;
}

export interface StandingsParams {
    leagueId: number;
    season: number;
}

export interface StandingsResponse extends BaseResponse {
    parameters: StandingsParams;
    response: StandingsData[];
}